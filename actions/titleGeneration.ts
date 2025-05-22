"use server";

import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/getConvexClient";

import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();

export async function titleGeneration(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  console.log("🎯 Starting title generation process");
  console.log("🎯 Input videoId:", videoId);
  console.log("🎯 Input videoSummary:", videoSummary);
  console.log("🎯 Input considerations:", considerations);

  const user = await currentUser();

  if (!user?.id) {
    console.error("❌ User not found");
    throw new Error("User not found");
  }

  console.log("🎯 User ID:", user.id);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    console.log("🎯 Video summary:", videoSummary);
    console.log("🎯 Generating title for video for videoId:", videoId);
    console.log("🎯 Considerations:", considerations);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful YouTube video creator assistant that creates high quality SEO friendly concise video titles.",
        },
        {
          role: "user",
          content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("🎯 OpenAI response received");

    const title =
      response.choices[0]?.message?.content || "Unable to generate title";

    if (!title) {
      console.error("❌ Failed to generate title (System error)");
      return {
        error: "Failed to generate title (System error)",
      };
    }

    console.log("🎯 Generated title:", title);

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    console.log("🎯 Title saved to database");

    return title;
  } catch (error) {
    console.error("❌ Error generating title:", error);
    throw new Error("Failed to generate title");
  }
}
