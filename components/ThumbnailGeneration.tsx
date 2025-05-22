"use client";

import { useUser } from "@clerk/nextjs";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ThumbnailGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();

  const images = useQuery(api.images.getImages, {
    videoId,
    userId: user?.id ?? "",
  });

  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 border border-border shadow-sm flex flex-col">
      <div className="min-w-52">
        {/* <Usage
          featureFlag={FeatureFlag.IMAGE_GENERATION}
          title="Thumbnail Generation"
        /> */}
      </div>

      {/* Simple horizontal scroll for images */}
      <div className={`flex overflow-x-auto gap-4 ${images?.length && "mt-4"}`}>
        {images?.map(
          (image) =>
            image.url && (
              <div
                key={image._id}
                className="flex-none w-[200px] h-[110px] rounded-lg overflow-x-auto"
              >
                <Image
                  src={image.url}
                  alt="Generated Image"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            )
        )}
      </div>

      {/* No images generated yet */}
      {!images?.length && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-border">
          <p className="text-muted-foreground">No thumbnails have been generated yet</p>
          <p className="text-sm text-muted-foreground/80 mt-1">
            Generate thumbnails to see them appear here
          </p>
        </div>
      )}
    </div>
  );
}

export default ThumbnailGeneration;
