import bcrypt from "bcryptjs";

/**
 * Hashes a given string using bcrypt.
 *
 * @param {string} string - The string to hash.
 * @returns {Promise<string | null>} - The hashed string, or null if an error occurs.
 */
export const hashString = async (string: string) => {
  try {
    const hashedString = await bcrypt.hash(string, 10);
    return hashedString;
  } catch (error) {
    console.log("Error in hashing", error);
    return null;
  }
};

/**
 * Verifies if a given string matches a hashed string.
 *
 * @param {string} string - The plain string to compare.
 * @param {string} hashedString - The hashed string to compare against.
 * @returns {Promise<boolean | null>} - true if the string matches, false if not, or null if an error occurs.
 */
export const verifyHashedString = async (
  string: string,
  hashedString: string
) => {
  try {
    const isPasswordValid = await bcrypt.compare(string, hashedString);
    return isPasswordValid;
  } catch (error) {
    console.log("Error in verifying hashing", error);
    return null;
  }
};
