"use client";

import { Message, useChat } from "@ai-sdk/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ReactMarkdown from "react-markdown";

import { BotIcon, ImageIcon, LetterText, PenIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { stat } from "fs";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: Record<string, unknown>;
}

interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";
  return `🔧 Tool Used: ${part.toolInvocation.toolName}`;
};

function AiAgentChat({ videoId }: { videoId: string }) {
  // Scrolling to Bottom Logic
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, append, status } =
    useChat({
      maxSteps: 5,
      body: {
        videoId,
      },
    });

  //   const isScriptGenerationEnabled = useSchematicFlag(
  //     FeatureFlag.SCRIPT_GENERATION
  //   );
  //   const isImageGenerationEnabled = useSchematicFlag(
  //     FeatureFlag.IMAGE_GENERATION
  //   );
  //   const isTitleGenerationEnabled = useSchematicFlag(
  //     FeatureFlag.TITLE_GENERATIONS
  //   );
  //   const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.ANALYSE_VIDEO);

  useEffect(() => {
    console.log("Messages updated:", messages);
    if (bottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let toastId;
    console.log("Status changed:", status);

    switch (status) {
      case "submitted":
        toastId = toast("Agent is thinking...", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "streaming":
        toastId = toast("Agent is replying...", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "error":
        console.log("Error status:", status);
        toastId = toast("Whoops! Something went wrong, please try again.", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "ready":
        toast.dismiss(toastId);

        break;
    }
  }, [status]);

  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log("Generating script with ID:", randomId);

    const userMessage: Message = {
      id: `generate-script-${randomId}`,
      role: "user",
      content:
        "Generate a step-by-step shooting script for this video that I can use on my own channel to produce a video that is similar to this one, dont do any other steps such as generating a image, just generate the script only!",
    };
    append(userMessage);
  };

  const generateImage = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log("Generating image with ID:", randomId);

    const userMessage: Message = {
      id: `generate-image-${randomId}`,
      role: "user",
      content: "Generate a thumbnail for this video",
    };
    append(userMessage);
  };

  const generateTitle = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    console.log("Generating title with ID:", randomId);

    const userMessage: Message = {
      id: `generate-title-${randomId}`,
      role: "user",
      content: "Generate a title for this video",
    };
    append(userMessage);
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="hidden lg:block px-4 pb-3 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">AI Agent</h2>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        ref={messagesContainerRef}
      >
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  Welcome to AI Agent Chat
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ask any question about your video!
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                } rounded-2xl px-4 py-3`}
              >
                {m.parts && m.role === "assistant" ? (
                  // AI message
                  <div className="space-y-3">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div key={i} className="prose prose-sm max-w-none text-muted-foreground">
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      ) : part.type === "tool-invocation" ? (
                        <div
                          key={i}
                          className="bg-muted/50 rounded-lg p-2 space-y-2 text-foreground"
                        >
                          <div className="font-medium text-xs">
                            {formatToolInvocation(part as ToolPart)}
                          </div>
                          {(part as ToolPart).toolInvocation.result && (
                            <pre className="text-xs bg-background/70 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(
                                (part as ToolPart).toolInvocation.result,
                                null,
                                2
                              )}
                            </pre>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  // User message
                  <div className="prose prose-sm max-w-none text-primary-foreground">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input form */}
      <div className="border-t border-border p-4 bg-background">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              className="flex-1"
              type="text"
              placeholder={
                // !isVideoAnalysisEnabled
                //   ? "Upgrade to ask anything about your video..."
                //   :
                "Ask anything about your video..."
              }
              value={input}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              disabled={
                status === "streaming" || status === "submitted"
                // ||
                // !isVideoAnalysisEnabled
              }
            >
              {status === "streaming"
                ? "AI is replying..."
                : status === "submitted"
                  ? "AI is thinking..."
                  : "Send"}
            </Button>
          </form>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2"
              onClick={generateScript}
              type="button"
              //   disabled={!isScriptGenerationEnabled}
            >
              <LetterText className="w-4 h-4" />
              {/* {isScriptGenerationEnabled ?  */}(<span>Generate Script</span>
              ){/* : ( */}
              {/* <span>Upgrade to generate a script</span> */}
              {/* ) */}
              {/* } */}
            </Button>

            <Button
              variant="secondary"
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2"
              onClick={generateTitle}
              type="button"
              //   disabled={!isTitleGenerationEnabled}
            >
              <PenIcon className="w-4 h-4" />
              Generate Title
            </Button>

            <Button
              variant="secondary"
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2"
              onClick={generateImage}
              type="button"
              //   disabled={!isImageGenerationEnabled}
            >
              <ImageIcon className="w-4 h-4" />
              Generate Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;
