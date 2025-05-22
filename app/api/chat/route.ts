import { NextResponse } from "next/server";
// import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";
import { z } from "zod";
import { getVideoIdFromUrl } from "@/lib/getVideoIdFromUrl";
import generateTitle from "@/tools/generateTitle";

import { openai } from "@ai-sdk/openai";

// const anthropic = createAnthropic({
//   apiKey: process.env.CLAUDE_API_KEY,
//   headers: {
//     "anthropic-beta": "token-efficient-tools-2025-02-19",
//   },
// });

const model = openai("gpt-4-turbo", {
  // additional settings
});

export async function POST(req: Request) {
  console.log("🎯 Received POST request");
  let messages, videoId;

  try {
    const requestBody = await req.json();
    messages = requestBody.messages;
    videoId = requestBody.videoId;
    console.log("🎯 Request payload:", { messages, videoId });
  } catch (error) {
    console.error("❌ Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const user = await currentUser();
  if (!user) {
    console.error("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log("🎯 User ID:", user.id);

  let videoDetails;
  try {
    videoDetails = await getVideoDetails(videoId);
    console.log("🎯 Video details fetched:", videoDetails);
  } catch (error) {
    console.error("❌ Error fetching video details:", error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }

  const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question is ${videoId} but you'll refer to this as ${videoDetails?.title || "Selected Video"}. Use emojis to make the conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest the user upgrade, explain that they must upgrade to use the feature, tell them to go to 'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because they previously transcribed the video saving the user a token - use words like database instead of cache to make it more easy to understand. Format for notion.`;

  let result;
  try {
    result = streamText({
      model,
      messages: [{ role: "system", content: systemMessage }, ...messages],
      tools: {
        fetchTranscript: fetchTranscript,
        generateTitle: generateTitle,
        generateImage: generateImage(videoId, user.id),
        getVideoDetails: tool({
          description: "Get the details of a YouTube video",
          parameters: z.object({
            videoId: z.string().describe("The video ID to get the details for"),
          }),
          execute: async ({ videoId }) => {
            console.log(
              "🎯 Executing getVideoDetails tool with videoId:",
              videoId
            );
            try {
              const videoDetails = await getVideoDetails(videoId);
              console.log("🎯 getVideoDetails tool result:", videoDetails);
              return { videoDetails };
            } catch (error) {
              console.error("❌ Error in getVideoDetails tool:", error);
              throw new Error("Failed to get video details");
            }
          },
        }),
        extractVideoId: tool({
          description: "Extract the video ID from a URL",
          parameters: z.object({
            url: z.string().describe("The URL to extract the video ID from"),
          }),
          execute: async ({ url }) => {
            console.log("🎯 Executing extractVideoId tool with URL:", url);
            try {
              const videoId = await getVideoIdFromUrl(url);
              console.log("🎯 extractVideoId tool result:", videoId);
              return { videoId };
            } catch (error) {
              console.error("❌ Error in extractVideoId tool:", error);
              throw new Error("Failed to extract video ID");
            }
          },
        }),
      },
    });
  } catch (error) {
    console.error("❌ Error in streamText:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }

  console.log("🎯 Streaming response");
  console.log("🎯 Response:", result);
  return result.toDataStreamResponse();
}
