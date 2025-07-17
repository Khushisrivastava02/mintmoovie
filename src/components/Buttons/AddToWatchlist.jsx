import React from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import "./ButtonStyles.css";

function AddToWatchlist() {
  return (
    <div className="btn">
      <BookmarkAddIcon />
      <span>Add to Watchlist</span>
    </div>
  );
}

export default AddToWatchlist;
