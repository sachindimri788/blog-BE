import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import {
  addBlogToDb,
  deleteBlogInDb,
  getBlogsFromDb,
  getBlogFromDb,
  updateBlogInDb,
  getBlogsCount,
  addManyBlogsToDb,
} from "../model/Blog";
import { blogResponseMessage } from "../utils/responseMessage";
import { paginationPayload } from "../utils/helper";

// Adds a new blog to the database.
export const addBlog = async (req: Request, res: Response) => {
  const { title, summary, active, likes } = req.body;
  const blogData = await addBlogToDb({ title, summary, active, likes });
  if (!blogData) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_ADD_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_ADDED_BLOG,
    data: blogData,
  });
};

// Add many blogs to the database.
export const addManyBlogs = async (req: Request, res: Response) => {
  const blogData = await addManyBlogsToDb(req.body);
  if (!blogData) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_ADD_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_ADDED_BLOG,
    data: blogData,
  });
};

// Updates an existing blog in the database.
export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, summary, active, likes } = req.body;
  const blogData = await updateBlogInDb(
    { id },
    { title, summary, active, likes }
  );
  if (!blogData) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_UPDATE_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_UPDATED_BLOG,
    data: blogData,
  });
};

// deletes a blog
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blogData = await deleteBlogInDb({ id });
  if (!blogData) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_DELETE_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_DELETED_BLOG,
    data: blogData,
  });
};

// Retrieves a single blog by its ID, including its comments.
export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const where: { id: string; active?: boolean } = { id };
  if (req.originalUrl.startsWith("/api/v1/user/blog")) {
    where.active = true;
  }
  const blog = await getBlogFromDb(where, { comments: true });

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOG,
    data: blog || {},
  });
};

// Retrieves all blogs from the database, including their comments.
export const getAllBlogs = async (req: Request, res: Response) => {
  const { pageNumber, pageSize, searchString } = req.query;
  const pagination = paginationPayload(Number(pageNumber), Number(pageSize));

  const filter: Prisma.blogWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              contains: String(searchString),
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            summary: {
              contains: String(searchString),
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
        ],
      }
    : {};

  const blogs = await getBlogsFromDb(filter, { comments: true }, pagination);
  const totalBlogs = await getBlogsCount(filter);

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOGS,
    data: blogs || [],
    _meta: {
      total_record: totalBlogs,
    },
  });
};

// Retrieves all active blogs from the database, including their comments.
export const getActiveBlogs = async (req: Request, res: Response) => {
  const { pageNumber, pageSize, searchString } = req.query;
  const pagination = paginationPayload(Number(pageNumber), Number(pageSize));

  const filter: Prisma.blogWhereInput = {
    active: true,
    ...(searchString && {
      OR: [
        {
          title: {
            contains: String(searchString),
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
        {
          summary: {
            contains: String(searchString),
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ],
    }),
  };

  const blogs = await getBlogsFromDb(filter, { comments: true }, pagination);
  const totalBlogs = await getBlogsCount(filter);

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOGS,
    data: blogs || [],
    _meta: {
      total_record: totalBlogs,
    },
  });
};

// comments on a blog
export const addLikeCommentOnBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment, like } = req.body;
  const blogData = await updateBlogInDb(
    { id },
    {
      likes: { increment: like === true ? 1 : 0 },
      ...(comment && { comments: { create: { comment } } }),
    },
    { comments: true }
  );
  if (!blogData) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_LIKE_COMMENT_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_LIKE_COMMENTED_BLOG,
    data: blogData,
  });
};
