import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const addBlogToDb = async (data: Prisma.blogCreateInput) => {
  const blogData = await prisma.blog.create({
    data,
  });
  return blogData;
};

export const getBlogsFromDb = async (
  filter?: Prisma.blogWhereInput,
  include?: Prisma.blogFindUniqueArgs["include"],
  pagination?: { skip?: number; take?: number }
) => {
  const blogs = await prisma.blog.findMany({
    where: filter,
    include: include,
    skip: pagination?.skip,
    take: pagination?.take,
  });
  return blogs;
};

export const updateBlogInDb = async (
  condition: Prisma.blogWhereUniqueInput,
  data: Prisma.blogUpdateInput
) => {
  const updatedBlog = await prisma.blog.update({
    where: condition,
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

export const getBlogsCount = async (filter?: Prisma.blogWhereInput) => {
  const count = await prisma.blog.count({
    where: filter,
  });
  return count;
};
