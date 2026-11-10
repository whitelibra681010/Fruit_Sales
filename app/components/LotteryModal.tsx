"use client";

import { useEffect, useState } from "react";

const DAILY_KEY = "fruit-lottery-last-play";
const WEEK_KEY = "fruit-lottery-week-win";
const BONUS_KEY = "fruit-lottery-bonus-attempts";
const DAILY_LIMIT = 5;

function getTodayKey() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function getMondayKey() {
  const today = new Date();
  const day = today.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;
  today.setDate(today.getDate() - daysFromMonday);
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function createCouponCode() {
  return `FRUIT90-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function LotteryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [attemptsToday, setAttemptsToday] = useState(0);
  const [bonusAttempts, setBonusAttempts] = useState(0);
  const [weeklyWin, setWeeklyWin] = useState("");
  const [result, setResult] = useState<"idle" | "win" | "lose">("idle");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isOpen]);

  function playLottery() {
    if (attemptsToday >= DAILY_LIMIT && bonusAttempts <= 0) return;
    const nextAttempt = attemptsToday + 1;
    localStorage.setItem(DAILY_KEY, `${getTodayKey()}:${nextAttempt}`);
    setAttemptsToday(nextAttempt);
    if (bonusAttempts > 0) {
      const nextBonus = bonusAttempts - 1;
      localStorage.setItem(BONUS_KEY, String(nextBonus));
      setBonusAttempts(nextBonus);
    }
    setIsCopied(false);

    if (weeklyWin || Math.random() >= 0.1) {
      setResult("lose");
      return;
    }

    const coupon = createCouponCode();
    localStorage.setItem(WEEK_KEY, `${getMondayKey()}:${coupon}`);
    setWeeklyWin(coupon);
    setResult("win");
  }

  async function copyCoupon() {
    if (!weeklyWin) return;
    await navigator.clipboard.writeText(weeklyWin);
    setIsCopied(true);
  }

  function openModal() {
    const savedDay = localStorage.getItem(DAILY_KEY);
    const savedWeek = localStorage.getItem(WEEK_KEY);
    setBonusAttempts(Number(localStorage.getItem(BONUS_KEY) ?? 0));
    const [savedDate, savedCount] = savedDay?.split(":") ?? [];
    setAttemptsToday(savedDate === getTodayKey() ? Number(savedCount) || 0 : 0);
    setWeeklyWin(savedWeek?.startsWith(`${getMondayKey()}:`) ? savedWeek.split(":")[1] : "");
    setResult("idle");
    setIsCopied(false);
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#e86d52] px-5 py-3 text-xs font-bold tracking-wider text-white shadow-[5px_5px_0_#203b35] transition hover:-translate-y-1 hover:bg-[#d9573f]" aria-label="開啟每日幸運抽獎">
        <span className="text-base">🎁</span>
        每日幸運抽獎
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_#f7c86d_0,_transparent_34%),radial-gradient(circle_at_bottom_right,_#e86d52_0,_transparent_35%),#203b35]/90 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <span className="pointer-events-none absolute left-[12%] top-[16%] animate-bounce text-4xl">🍊</span>
          <span className="pointer-events-none absolute bottom-[15%] right-[12%] animate-pulse text-4xl">🍓</span>
          <span className="pointer-events-none absolute right-[18%] top-[12%] animate-spin text-3xl">✨</span>
          <section role="dialog" aria-modal="true" aria-labelledby="lottery-title" className="glass-panel relative w-full max-w-md border-[#fff]/70 bg-[#f4f1e9]/95 p-7 shadow-[10px_10px_0_#e8b58c] sm:p-9">
            <button type="button" onClick={() => setIsOpen(false)} aria-label="關閉抽獎視窗" className="absolute right-5 top-4 text-2xl leading-none text-[#61756d] transition hover:text-[#e86d52]">×</button>
            <p className="text-xs font-bold tracking-[0.25em] text-[#e86d52]">FRUIT LUCKY DRAW</p>
            <h2 id="lottery-title" className="mt-4 font-serif text-4xl tracking-[-0.05em]">每日幸運抽獎</h2>
            <p className="mt-4 text-sm leading-7 text-[#61756d]">每天有 5 次機會，每次有 10% 機會獲得 9 折優惠券。每週最多中獎一次，週一重新計算。</p>

            {result === "win" || weeklyWin ? (
              <div className="mt-7 border border-[#e86d52]/40 bg-[#fff8ed] p-5">
                <p className="text-sm font-bold text-[#e86d52]">恭喜中獎！本週 9 折優惠券</p>
                <div className="mt-4 flex items-center gap-2 border-b border-[#203b35] pb-3">
                  <code className="min-w-0 flex-1 text-sm font-bold tracking-widest text-[#203b35]">{weeklyWin}</code>
                  <button type="button" onClick={copyCoupon} className="text-xs font-bold text-[#e86d52]">{isCopied ? "已複製" : "複製"}</button>
                </div>
                <p className="mt-3 text-xs leading-5 text-[#61756d]">結帳時貼上優惠碼，即享 9 折優惠。</p>
              </div>
            ) : result === "lose" ? (
              <div className="mt-7 border border-[#203b35]/15 bg-white/30 p-5"><p className="text-sm font-bold">這次差一點點！</p><p className="mt-2 text-xs leading-5 text-[#61756d]">明天再來試試手氣，祝你下次抽中 9 折券。</p></div>
            ) : null}

            <button type="button" onClick={playLottery} disabled={attemptsToday >= DAILY_LIMIT && bonusAttempts <= 0} className="mt-7 w-full border border-[#203b35] px-5 py-4 text-sm font-bold transition hover:bg-[#203b35] hover:text-[#f4f1e9] disabled:cursor-not-allowed disabled:border-[#61756d]/30 disabled:text-[#61756d]">
              {attemptsToday >= DAILY_LIMIT && bonusAttempts <= 0 ? "今日抽獎次數已用完，明天再來" : bonusAttempts > 0 ? `使用遊戲資格抽獎 ↗（額外 ${bonusAttempts} 次）` : `開始抽獎 ↗（剩餘 ${DAILY_LIMIT - attemptsToday} 次）`}
            </button>
            <p className="mt-4 text-center text-[11px] tracking-wider text-[#61756d]">按 ESC 或點擊背景即可關閉</p>
          </section>
        </div>
      )}
    </>
  );
}
