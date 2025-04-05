import { pagination } from "./constant";

// Converts a given time string to UTC format.
export const convertToUTC = (time: string) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
};

// function generate a random string
export const generateRandomString = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  const timestamp = Date.now();
  return `${randomNumber}-${timestamp}`;
};

// this function takes pageNumber and pageSize as input and returns an object with skip and take properties
export const paginationPayload = (
  pageNumber: number,
  pageSize: number
): { skip: number; take: number } => {
  const page = Number(pageNumber) || pagination.PAGE_NUMBER;
  const size = Number(pageSize) || pagination.PAGE_SIZE;
  if (page < 1) {
    throw new Error("Page number must be greater than 0");
  }
  if (size < 1) {
    throw new Error("Page size must be greater than 0");
  }
  return {
    skip: (page - 1) * size,
    take: size,
  };
};
