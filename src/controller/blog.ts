import { Request, Response } from "express";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import {
  addBlogToDb,
  deleteBlogInDb,
  getBlogsFromDb,
  getBlogFromDb,
  updateBlogInDb,
} from "../model/Blog";
import { blogResponseMessage } from "../utils/responseMessage";

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
  const blog = await getBlogFromDb({ id }, { comments: true });
  if (!blog) {
    return createErrorResponse({
      res,
      message: blogResponseMessage.FAILED_TO_FETCH_BLOG,
    });
  }

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOG,
    data: blog,
  });
};

// Retrieves all blogs from the database, including their comments.
export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await getBlogsFromDb({}, { comments: true });

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOGS,
    data: blogs,
  });
};

export const getActiveBlogs = async (req: Request, res: Response) => {
  const blogs = await getBlogsFromDb({ active: true }, { comments: true });

  return createSuccessResponse({
    res,
    message: blogResponseMessage.SUCCESSFULLY_FETCHED_BLOGS,
    data: blogs,
  });
};
