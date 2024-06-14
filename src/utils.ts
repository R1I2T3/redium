import { nanoid } from "nanoid";

export const createSlug = (title: string) => {
  const standardTitle = title
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/[^a-zA-Z0-9 ]/g, "");
  const slug = standardTitle + nanoid(10);
  return slug;
};
