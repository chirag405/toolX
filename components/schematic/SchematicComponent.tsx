import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import SchematicEmbed from "./SchematicEmbed";

async function SchematicComponent({ componentId }: { componentId: string }) {
  if (!componentId) return null;

  const accessToken = await getTemporaryAccessToken();

  if (!accessToken) throw new Error("Missing access token");

  return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
}
