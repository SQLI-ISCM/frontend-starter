import {
  handler as messagesHandler,
  namespace as messagesNs,
} from "./handlers/messages";
import {
  handler as collectionHandler,
  namespace as collectionNs,
} from "./handlers/collection";

type NsCMSConverterType = Record<
  string,
  (locale: string) => Promise<Record<string, any>>
>;

const namespaceCMSHandlers: NsCMSConverterType = {
  [messagesNs]: messagesHandler,
  [collectionNs]: collectionHandler,
};

export async function GET(
  request: Request,
  { params }: { params: { params: Array<string> } },
) {
  let [lng, ns] = params.params;
  if (!lng || !ns) {
    console.error("Err: Missing lng or ns");
    return Response.json({ errors: "Missing lng or ns" });
  }

  // correct language format if supported
  if (Object.keys(namespaceCMSHandlers).indexOf(ns) === -1) {
    console.error("No backend support for namespace: " + ns);
    return Response.json({ error: "No backend support for namespace: " + ns });
  }

  //
  try {
    const data = await namespaceCMSHandlers[ns](lng);
    return Response.json(data);
  } catch (e) {
    console.error(e instanceof Error ? e?.message : e);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
