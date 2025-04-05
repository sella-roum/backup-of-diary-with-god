import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSContentId,
} from "microcms-js-sdk";
import type { Tag } from "./tag";

export type Blog = {
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  tags?: (MicroCMSContentId & Tag)[];
  id?: string;
} & MicroCMSListContent;

export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};
