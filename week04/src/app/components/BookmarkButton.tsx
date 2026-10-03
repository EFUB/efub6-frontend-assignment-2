"use client";

import { useState } from "react";
import { Button } from "./styled";

export default function BookmarkButton({ title }: { title: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleClick = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      $active={bookmarked}
      aria-pressed={bookmarked}
      aria-label={`${title} 북마크`}
    >
      {bookmarked ? "🔖 북마크 중" : "북마크"}
    </Button>
  );
}
