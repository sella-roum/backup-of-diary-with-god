import type { MicroCMSListContent } from "microcms-js-sdk";

export type Tag = {
  name: string;
  id?: string;
} & MicroCMSListContent;

export type TagResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Tag[];
};
