"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function TitleGenerations({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles = useQuery(api.titles.list, { videoId, userId: user?.id ?? "" });

  //   const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
  //     FeatureFlag.TITLE_GENERATIONS
  //   );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 border border-border shadow-sm">
      <div className="min-w-52">
        {/* <Usage featureFlag={FeatureFlag.TITLE_GENERATIONS} title="Titles" /> */}
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group relative p-4 rounded-lg border border-muted bg-muted/50 hover:border-primary/20 hover:bg-primary/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-foreground leading-relaxed">
                {title.title}
              </p>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(title.title)}
                title="Copy to clipboard"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Copy className="w-4 h-4 text-primary" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* No titles generated yet */}
      {!titles?.length && (
        //   !!isTitleGenerationEnabled &&
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-border">
          <p className="text-muted-foreground">No titles have been generated yet</p>
          <p className="text-sm text-muted-foreground/80 mt-1">
            Generate titles to see them appear here
          </p>
        </div>
      )}
    </div>
  );
}

export default TitleGenerations;
