import LikeButton from "../../types/post/LikeButton";

export default async (LikeButton: LikeButton) => {
  if ((await LikeButton.$('*[aria-label="Unlike" i]')) !== null) return true;

  if ((await LikeButton.$('*[aria-label="Like" i]')) !== null) return false;

  throw `Cannot check if post was liked by you`;
};
