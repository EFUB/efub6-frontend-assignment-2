"use client";

import { useState } from "react";

export default function InterestButton() {
  const [interested, setInterested] = useState(false);
  return (
    <div className="interest-control">
      <button className={`button interest-button${interested ? " selected" : ""}`} type="button" aria-pressed={interested} onClick={() => setInterested((previous) => !previous)}>
        {interested ? "♥ 관심 표시됨" : "♡ 관심 표시하기"}
      </button>
      <p aria-live="polite">{interested ? "관심 표시했습니다." : "관심 있는 스터디라면 눌러주세요."}</p>
      <small>관심 표시는 이 페이지를 떠나거나 새로고침하면 초기화됩니다.</small>
    </div>
  );
}
