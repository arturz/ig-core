import OpenLikesDialogButton from "../../../types/likesDialog/OpenLikesDialogButton";
import LikesBox from "../../../types/post/LikesBox";

export default async (likesBox: LikesBox): Promise<OpenLikesDialogButton> => {
  const openLikesButton = await likesBox.$("button");
  if (openLikesButton === null)
    throw `There is no button that shows poeople who liked this post`;

  return openLikesButton;
};
