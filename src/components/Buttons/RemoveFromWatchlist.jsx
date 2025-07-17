import React from "react";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import "./ButtonStyles.css";

function RemoveFromWatchlist() {
  return (
    <div className="btn">
      <BookmarkRemoveIcon />
      <span>Remove from Watchlist</span>
    </div>
  );
}

export default RemoveFromWatchlist;
