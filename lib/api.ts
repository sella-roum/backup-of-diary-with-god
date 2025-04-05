import { client } from "@/lib/microcms";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Blog, BlogResponse } from "@/types/blog";
import type { Tag, TagResponse } from "@/types/tag";

// ブログ記事一覧を取得
export const getAllBlogs = async (
  queries?: MicroCMSQueries
): Promise<BlogResponse> => {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: queries,
    });
    return data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return { contents: [], totalCount: 0, limit: 0, offset: 0 };
  }
};

// スラッグを使用して個別記事を取得
export const getBlogBySlug = async (
  id: string,
  queries?: MicroCMSQueries
): Promise<Blog | null> => {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `id[equals]${id}`,
        limit: 1,
        ...queries,
      },
    });
    if (data.contents.length === 0) {
      return null;
    }
    return data.contents[0];
  } catch (error) {
    console.error(`Error fetching blog by id (${id}):`, error);
    return null;
  }
};

// IDを使用して個別記事を取得
export const getBlogById = async (
  id: string,
  queries?: MicroCMSQueries
): Promise<Blog | null> => {
  try {
    const data = await client.get<Blog>({
      endpoint: "blogs",
      contentId: id,
      queries: queries,
    });
    return data;
  } catch (error) {
    console.error(`Error fetching blog by ID (${id}):`, error);
    return null;
  }
};

// タグ一覧を取得
export const getAllTags = async (
  queries?: MicroCMSQueries
): Promise<TagResponse> => {
  try {
    const data = await client.getList<Tag>({
      endpoint: "tags",
      queries: { limit: 100, ...queries },
    });
    return data;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return { contents: [], totalCount: 0, limit: 0, offset: 0 };
  }
};

// スラッグを使用して個別タグを取得
export const getTagBySlug = async (
  id: string,
  queries?: MicroCMSQueries
): Promise<Tag | null> => {
  try {
    const data = await client.getList<Tag>({
      endpoint: "tags",
      queries: {
        filters: `id[equals]${id}`,
        limit: 1,
        ...queries,
      },
    });
    if (data.contents.length === 0) {
      return null;
    }
    return data.contents[0];
  } catch (error) {
    console.error(`Error fetching tag by id (${id}):`, error);
    return null;
  }
};

// タグIDに基づいて記事を取得
export const getBlogsByTagId = async (
  tagId: string,
  queries?: MicroCMSQueries
): Promise<BlogResponse> => {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${tagId}`,
        ...queries,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching blogs by tag ID (${tagId}):`, error);
    return { contents: [], totalCount: 0, limit: 0, offset: 0 };
  }
};
