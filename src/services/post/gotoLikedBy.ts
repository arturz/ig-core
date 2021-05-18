import Post from "../../types/post/Post";

export const getLinkToLikedBy = async (post: Post) => {
  const el = await post.$('a[href*="liked_by"]');
  if (el === null) throw `Can't get link to liked_by`;

  return el;
};

export default async (post: Post) => {
  const link = await getLinkToLikedBy(post);
  await link.click();
};
