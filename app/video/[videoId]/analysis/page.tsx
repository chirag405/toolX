"use client";

import { createOrGetVideo } from "@/actions/createOrGetVideo";
import AiAgentChat from "@/components/AiAgentChat";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";

import TitleGenerations from "@/components/TitleGenerations";
import Transcription from "@/components/Transcription";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const { user } = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      console.log("🎯 Fetching video with videoId:", videoId);
      console.log("🎯 User ID:", user.id);

      // Analyse the video (add video to db here)
      const response = await createOrGetVideo(videoId as string, user.id);
      if (!response.success) {
        console.error("❌ Error creating or getting video:", response.error);
        // toast.error("Error creating or getting video", {
        //   description: response.error,
        //   duration: 10000,
        // });
      } else {
        console.log("🎯 Video fetched successfully:", response.data);
        setVideo(response.data!);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  const VideoTranscriptionStatus =
    video === undefined ? (
      <Alert variant="default" className="items-center">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse mr-2" />
        <AlertTitle className="text-sm text-muted-foreground mb-0">Loading...</AlertTitle>
      </Alert>
    ) : !video ? (
      <Alert variant="default" className="items-center bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2" />
        <AlertDescription className="text-sm text-amber-700 dark:text-amber-400">
          This is your first time analyzing this video. <br />
          <span className="font-semibold">
            (1 Analysis token is being used!)
          </span>
        </AlertDescription>
      </Alert>
    ) : (
      <Alert variant="default" className="items-center bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
        <AlertDescription className="text-sm text-green-700 dark:text-green-400">
          Analysis exists for this video - no additional tokens needed in future
          calls! <br />
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-background lg:border-r border-border p-6">
          {/* Analysis Section */}
          <div className="flex flex-col gap-4 p-4 border border-border rounded-lg">
            {/* <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Analyse Video"
            /> */}

            {/* Video Transcription status */}
            {VideoTranscriptionStatus}
          </div>

          {/* Youtube video details */}
          <YoutubeVideoDetails videoId={videoId} />

          {/* Thumbnail Generation */}
          <ThumbnailGeneration videoId={videoId} />

          {/* Title Generation */}
          <TitleGenerations videoId={videoId} />

          {/* Transcription */}
          <Transcription videoId={videoId} />
        </div>

        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          {/* Ai Agent Chat Section */}
          <AiAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
