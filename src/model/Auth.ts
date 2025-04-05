import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const addRefreshToken = async (data: Prisma.refreshTokenCreateInput) => {
  const refreshTokenData = await prisma.refreshToken.create({
    data,
  });
  return refreshTokenData;
};

export const getRefreshTokens = async (
  condition: Prisma.refreshTokenWhereInput
) => {
  const refreshTokenData = await prisma.refreshToken.findMany({
    where: condition,
  });
  return refreshTokenData;
};

export const deleteRefreshToken = async (
  condition: Prisma.refreshTokenWhereUniqueInput
) => {
  const deletedRefreshToken = await prisma.refreshToken.delete({
    where: condition,
  });
  return deletedRefreshToken;
};
