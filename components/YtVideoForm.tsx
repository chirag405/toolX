import AnalyseButton from "./AnalyseButton";
import { analyseYoutubeVideo } from "@/actions/AnalyseYoutubeActions";
import { Input } from "@/components/ui/input";

function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        className="flex flex-col sm:flex-row gap-2 items-center"
        action={analyseYoutubeVideo}
      >
        <Input
          name="url"
          type="text"
          placeholder="Enter YouTube URL"
          className="flex-1 w-full"
        />
        <AnalyseButton />
      </form>
    </div>
  );
}

export default YoutubeVideoForm;
