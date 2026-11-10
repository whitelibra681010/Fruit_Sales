"use client";

import { useEffect, useState, type FormEvent } from "react";

type NicknameWelcomeProps = {
  onSubmitted: (nickname: string) => void;
};

export default function NicknameWelcome({ onSubmitted }: NicknameWelcomeProps) {
  const [nickname, setNickname] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (!isSubmitted) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSubmitted]);

  function submitNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedNickname = nickname.trim();
    if (trimmedNickname) {
      setIsSubmitted(true);
      onSubmitted(trimmedNickname);
    }
  }

  if (isSubmitted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_right,_#f7c86d_0,_transparent_35%),radial-gradient(circle_at_bottom_left,_#e86d52_0,_transparent_35%),#203b35]/90 p-4 backdrop-blur-md">
      <span className="pointer-events-none absolute left-[12%] top-[18%] animate-bounce text-4xl">🍊</span>
      <span className="pointer-events-none absolute bottom-[18%] right-[12%] animate-pulse text-4xl">🍓</span>
      <span className="pointer-events-none absolute right-[18%] top-[12%] animate-spin text-3xl">✨</span>
      <form onSubmit={submitNickname} className="glass-panel relative w-full max-w-md bg-[#f4f1e9]/95 p-8 text-center shadow-[10px_10px_0_#e8b58c] sm:p-10">
        <p className="text-xs font-bold tracking-[0.25em] text-[#e86d52]">WELCOME TO FRUITFUL TAIWAN</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.05em] sm:text-5xl">先告訴我你的暱稱</h1>
        <p className="mt-4 text-sm leading-7 text-[#61756d]">讓我們用你的名字，開始今天的水果旅程。</p>
        <label htmlFor="nickname" className="sr-only">你的暱稱</label>
        <input id="nickname" autoFocus required maxLength={20} value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="輸入暱稱" className="mt-7 w-full border-b border-[#203b35] bg-transparent px-2 py-3 text-center text-base outline-none placeholder:text-[#9a9c8f] focus:border-[#e86d52]" />
        <button type="submit" className="mt-7 w-full bg-[#e86d52] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#d9573f]">進入官網 ↗</button>
      </form>
    </div>
  );
}
