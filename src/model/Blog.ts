import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const addBlogToDb = async (data: Prisma.blogCreateInput) => {
  const blogData = await prisma.blog.create({
    data,
  });
  return blogData;
};

export const getAllBlogsFromDb = async (
  include?: Prisma.blogFindUniqueArgs["include"]
) => {
  const blogs = await prisma.blog.findMany({
    include: include,
  });
  return blogs;
};

export const updateBlogInDb = async (
  id: string,
  data: Prisma.blogUpdateInput
) => {
  const updatedBlog = await prisma.blog.update({
    where: { id },
    data,
  });
  return updatedBlog;
};

export const deleteBlogInDb = async (
  condition: Prisma.blogWhereUniqueInput
) => {
  const deletedBlog = await prisma.blog.delete({
    where: condition,
  });
  return deletedBlog;
};

export const getBlogFromDb = async (
  condition: Prisma.blogWhereUniqueInput,
  include?: Prisma.blogFindUniqueArgs["include"]
) => {
  const blog = await prisma.blog.findUnique({
    where: condition,
    include: include,
  });
  return blog;
};
