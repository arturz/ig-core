import LikeButton from "../../../types/post/LikeButton";
import Post from "../../../types/post/Post";

export default async (post: Post): Promise<LikeButton> => {
  const LikeButton = await post.$("section > span");
  if (LikeButton === null) throw `This post has no like button`;

  return LikeButton;
};
