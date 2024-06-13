import { client } from "@/gql";
import { findKeyValuePairs } from "@/libs/findKeyValuePairs";

export const namespace = "collection";

export const handler = async (locale: string) => {
  // query
  const json = await client.getCollectionPage({
    locale,
  });

  // simple mapping
  return findKeyValuePairs(json);
};
