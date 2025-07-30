import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "12pvdw77",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
