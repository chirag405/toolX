import Form from "next/form";
import AnalyseButton from "./AnalyseButton";
import { analyseYoutubeVideo } from "@/actions/AnalyseYoutubeActions";

function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form
        className="flex flex-col sm:flex-row gap-2 items-center"
        action={analyseYoutubeVideo}
      >
        <input
          name="url"
          type="text"
          placeholder="Enter YouTube URL"
          className="input input-bordered input-primary w-full flex-1"
        />
        <AnalyseButton />
      </Form>
    </div>
  );
}

export default YoutubeVideoForm;
