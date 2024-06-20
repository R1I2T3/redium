import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CommentSelectType } from "../db/schema";

export const themeAtom = atomWithStorage("theme", "cupcake");

export const commentsAtom = atom<CommentSelectType[] | []>([]);
