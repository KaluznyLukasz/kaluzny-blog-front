import { WORDS_PER_MINUTE } from "../ArticleContent.constants";

export const getReadingMinutes = (content: string) => {
  const words = content.split(/\s+/).filter((word) => word.length > 0);

  return Math.ceil(words.length / WORDS_PER_MINUTE);
};
