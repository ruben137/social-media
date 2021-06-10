import React from 'react';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
  const Likes = ({likes,logUser}) => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like.from === logUser?.result?.userName
      ) ? (
        <>
          <FavoriteIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${
                likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize="small" />
          &nbsp;{likes.length}{" "}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  export default Likes