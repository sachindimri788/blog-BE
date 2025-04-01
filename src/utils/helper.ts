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
