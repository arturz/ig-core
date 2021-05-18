import LikesBox from "../../../types/post/LikesBox";
import Post from "../../../types/post/Post";

const getLikesBox = async (post: Post) =>
  await post.$("section:nth-of-type(2) > * > *:last-of-type");

export default async (post: Post): Promise<LikesBox> => {
  const likesBox = await getLikesBox(post);
  if (likesBox === null) throw `This post has no element with amount of likes`;

  return likesBox;
};
