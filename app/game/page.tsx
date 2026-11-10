"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LotteryModal from "../components/LotteryModal";

const GAME_DURATION = 20;
const DROP_INTERVAL = 2;
const BONUS_KEY = "fruit-lottery-bonus-attempts";

const fruits = [
  { name: "愛文芒果", image: "/images/mango.jpg", emoji: "🥭" },
  { name: "玉荷包荔枝", image: "/images/lychee.jpg", emoji: "🍒" },
  { name: "金鑽鳳梨", image: "/images/pineapple.jpg", emoji: "🍍" },
  { name: "蘋果", image: "/images/apple.jpg", emoji: "🍎" },
  { name: "香蕉", image: "/images/banana.jpg", emoji: "🍌" },
  { name: "葡萄", image: "/images/grapes.jpg", emoji: "🍇" },
  { name: "柳橙", image: "/images/orange.jpg", emoji: "🍊" },
  { name: "木瓜", image: "/images/papaya.jpg", emoji: "🥭" },
  { name: "草莓", image: "/images/strawberry.jpg", emoji: "🍓" },
  { name: "西瓜", image: "/images/watermelon.jpg", emoji: "🍉" },
];

type FallingFruit = (typeof fruits)[number] & { id: number; left: number };
type GameStatus = "ready" | "playing" | "won" | "lost";

export default function FruitCatchGame() {
  const [status, setStatus] = useState<GameStatus>("ready");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [playerLeft, setPlayerLeft] = useState(50);
  const [fallingFruit, setFallingFruit] = useState<FallingFruit | null>(null);
  const playerLeftRef = useRef(50);
  const activeFruitRef = useRef<FallingFruit | null>(null);
  const fruitIdRef = useRef(0);
  const scoreRef = useRef(0);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const movePlayer = useCallback((direction: number) => {
    setPlayerLeft((current) => {
      const next = Math.max(10, Math.min(90, current + direction));
      playerLeftRef.current = next;
      return next;
    });
  }, []);

  const finishGame = useCallback(() => {
    setStatus(scoreRef.current >= 10 ? "won" : "lost");
    setFallingFruit(null);
    activeFruitRef.current = null;
  }, []);

  const resolveFruit = useCallback((fruitId: number) => {
    const fruit = activeFruitRef.current;
    if (!fruit || fruit.id !== fruitId) return;

    if (Math.abs(playerLeftRef.current - fruit.left) <= 14) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    activeFruitRef.current = null;
    setFallingFruit(null);
  }, []);

  const spawnFruit = useCallback(() => {
    const fruit = fruits[fruitIdRef.current % fruits.length];
    const nextFruit: FallingFruit = {
      ...fruit,
      id: fruitIdRef.current,
      left: 12 + Math.random() * 76,
    };
    fruitIdRef.current += 1;
    activeFruitRef.current = nextFruit;
    setFallingFruit(nextFruit);
    finishTimerRef.current = setTimeout(() => resolveFruit(nextFruit.id), 1800);
  }, [resolveFruit]);

  const startGame = useCallback(() => {
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    scoreRef.current = 0;
    fruitIdRef.current = 0;
    playerLeftRef.current = 50;
    setScore(0);
    setPlayerLeft(50);
    setTimeLeft(GAME_DURATION);
    setStatus("playing");
    spawnFruit();
  }, [spawnFruit]);

  useEffect(() => {
    if (status !== "playing") return;

    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") movePlayer(-8);
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") movePlayer(8);
    };
    window.addEventListener("keydown", keyboardHandler);

    const clock = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(clock);
          finishGame();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    const dropper = window.setInterval(spawnFruit, DROP_INTERVAL * 1000);

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
      window.clearInterval(clock);
      window.clearInterval(dropper);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, [finishGame, movePlayer, spawnFruit, status]);

  useEffect(() => {
    if (status === "won") {
      const currentBonus = Number(localStorage.getItem(BONUS_KEY) ?? 0);
      localStorage.setItem(BONUS_KEY, String(currentBonus + 1));
    }
  }, [status]);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#203b35]">
      <LotteryModal />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
        <header className="flex items-center justify-between border-b border-[#203b35]/20 py-5">
          <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.18em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e86d52] text-white">果</span>果然台灣</Link>
          <Link href="/" className="text-xs font-bold tracking-wider text-[#e86d52]">回到官網 ↗</Link>
        </header>

        <section className="py-10 sm:py-16">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">FRUIT CATCH</p>
              <h1 className="font-serif text-5xl tracking-[-0.05em] sm:text-7xl">接住從天而降的水果</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#61756d]">左右移動果籃，接住每一顆水果。遊戲 20 秒，每 2 秒掉下一顆，共 10 顆。</p>
            </div>
            <div className="flex gap-3 text-center">
              <div className="border border-[#203b35]/20 bg-white/30 px-5 py-3"><p className="text-[10px] font-bold tracking-widest text-[#61756d]">SCORE</p><p className="mt-1 text-2xl font-bold text-[#e86d52]">{score}<span className="text-sm text-[#61756d]"> / 10</span></p></div>
              <div className="border border-[#203b35]/20 bg-white/30 px-5 py-3"><p className="text-[10px] font-bold tracking-widest text-[#61756d]">TIME</p><p className="mt-1 text-2xl font-bold">{timeLeft}<span className="text-sm text-[#61756d]"> sec</span></p></div>
            </div>
          </div>

          <div className="relative h-[min(66vh,620px)] min-h-[440px] overflow-hidden border border-[#203b35]/25 bg-[linear-gradient(180deg,#d9e2c9_0%,#b7d0b4_62%,#8eae87_100%)] shadow-[10px_10px_0_#e8b58c]" onPointerMove={(event) => { if (status !== "playing") return; const bounds = event.currentTarget.getBoundingClientRect(); const next = Math.max(10, Math.min(90, ((event.clientX - bounds.left) / bounds.width) * 100)); playerLeftRef.current = next; setPlayerLeft(next); }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5 text-xs font-bold tracking-widest text-[#203b35]/60"><span>ORCHARD SKY</span><span>ARROW KEYS / A D</span></div>
            <div className="pointer-events-none absolute -left-10 top-20 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
            <div className="pointer-events-none absolute right-10 top-28 h-40 w-40 rounded-full bg-[#f7c86d]/25 blur-3xl" />

            {fallingFruit && status === "playing" && <div key={fallingFruit.id} className="absolute top-[-4rem] z-10 -translate-x-1/2 animate-[fruit-fall_1.8s_linear_forwards] text-center" style={{ left: `${fallingFruit.left}%` }}><div className="grid h-16 w-16 place-items-center rounded-full border-4 border-white/70 bg-[#fff8ed]/80 p-1 text-4xl shadow-lg">{fallingFruit.emoji}</div><span className="mt-1 block text-[10px] font-bold text-[#203b35]/70">{fallingFruit.name}</span></div>}

            <div className="absolute bottom-8 -translate-x-1/2 text-center transition-[left] duration-100" style={{ left: `${playerLeft}%` }}><div className="text-5xl drop-shadow-md">🧺</div><p className="mt-1 text-[10px] font-bold tracking-widest text-[#203b35]/70">YOUR BASKET</p></div>

            {status !== "playing" && <div className="absolute inset-0 grid place-items-center bg-[#203b35]/30 p-4 backdrop-blur-[2px]"><section className="w-full max-w-md border border-white/70 bg-[#f4f1e9]/95 p-8 text-center shadow-[8px_8px_0_#e8b58c]"><p className="text-xs font-bold tracking-[0.25em] text-[#e86d52]">{status === "ready" ? "READY?" : status === "won" ? "YOU DID IT!" : "GOOD TRY!"}</p><h2 className="mt-4 font-serif text-4xl">{status === "ready" ? "準備接水果" : status === "won" ? "太厲害了！取得抽獎資格" : "再試一次吧！"}</h2><p className="mt-4 text-sm leading-7 text-[#61756d]">{status === "ready" ? "達到 10 分以上，就能獲得幸運抽獎 1 次。" : status === "won" ? `你接到了 ${score} 顆水果，已新增 1 次抽獎資格。` : `你接到了 ${score} 顆水果，需要 10 分才能獲得抽獎資格。`}</p><button type="button" onClick={startGame} className="mt-7 w-full bg-[#e86d52] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#d9573f]">{status === "ready" ? "開始遊戲 ↗" : "再玩一次 ↗"}</button>{status === "won" && <p className="mt-4 text-xs font-bold text-[#e86d52]">請點右下角「每日幸運抽獎」使用資格</p>}</section></div>}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4"><p className="text-xs leading-5 text-[#61756d]">電腦：使用 ← → 或 A / D　手機：在遊戲區左右拖曳</p>{status === "playing" && <p className="text-xs font-bold text-[#e86d52]">接到水果就得 1 分！</p>}</div>
        </section>
      </div>
      <style jsx global>{`@keyframes fruit-fall{from{transform:translate(-50%,0) rotate(-8deg)}to{transform:translate(-50%,calc(min(66vh,620px) - 7rem)) rotate(18deg)}}`}</style>
    </main>
  );
}
