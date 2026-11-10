"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LotteryModal from "./components/LotteryModal";
import NicknameWelcome from "./components/NicknameWelcome";

const BONUS_KEY = "fruit-lottery-bonus-attempts";
const SUBSCRIBED_EMAILS_KEY = "fruit-newsletter-subscribed-emails";

const fruits = [
  { name: "愛文芒果", detail: "屏東・枋山 · 1盒（20 kg）NT$4,380", season: "JUN — AUG", image: "/images/mango.jpg" },
  { name: "玉荷包荔枝", detail: "高雄・大樹 · 1盒（20 kg）NT$2,980", season: "MAY — JUL", image: "/images/lychee.jpg" },
  { name: "金鑽鳳梨", detail: "高雄・燕巢 · 1盒（20 kg）NT$1,180", season: "APR — AUG", image: "/images/pineapple.jpg" },
];

const moreFruits = [
  { name: "蘋果", detail: "梨山・和平 · 1盒（20 kg）NT$2,180", season: "AUG — NOV", image: "/images/apple.jpg" },
  { name: "香蕉", detail: "屏東・南州 · 暫時缺貨 · 1盒（20 kg）NT$980", season: "ALL YEAR", image: "/images/banana.jpg", soldOut: true },
  { name: "葡萄", detail: "彰化・大村 · 暫時缺貨 · 1盒（20 kg）NT$2,580", season: "JUL — SEP", image: "/images/grapes.jpg", soldOut: true },
  { name: "柳橙", detail: "台南・東山 · 1盒（20 kg）NT$1,180", season: "NOV — FEB", image: "/images/orange.jpg" },
  { name: "木瓜", detail: "高雄・六龜 · 1盒（20 kg）NT$1,580", season: "ALL YEAR", image: "/images/papaya.jpg" },
  { name: "草莓", detail: "苗栗・大湖 · 1盒（20 kg）NT$5,980", season: "DEC — APR", image: "/images/strawberry.jpg" },
  { name: "西瓜", detail: "花蓮・壽豐 · 1盒（20 kg）NT$780", season: "MAY — SEP", image: "/images/watermelon.jpg" },
];

fruits.push(...moreFruits);

const places = [
  ["01", "南方日光", "芒果、鳳梨與一整個夏天。"],
  ["02", "山線之間", "水梨、葡萄，沿著坡地慢慢成熟。"],
  ["03", "東岸風土", "文旦、金柑，收進太平洋的風。"],
];

function StockNotice({ fruitName }: { fruitName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  function saveNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(`stock-notice-${fruitName}`, email);
    setIsSaved(true);
  }

  return (
    <div className="relative max-sm:contents">
      <button
        type="button"
        aria-label={`${fruitName} 到貨通知`}
        title="到貨通知"
        onClick={() => { setIsOpen(!isOpen); setIsSaved(false); }}
        className="grid h-9 w-9 place-items-center border border-[#e86d52] text-[#e86d52] transition hover:bg-[#e86d52] hover:text-white"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
      </button>
      {isOpen && <form onSubmit={saveNotice} className="relative z-30 basis-full border border-[#203b35]/20 bg-[#f4f1e9] p-4 shadow-[8px_8px_0_#e8b58c] max-sm:static max-sm:col-span-2 max-sm:mt-3 max-sm:w-full">
        <button type="button" aria-label="關閉到貨通知" title="關閉" onClick={() => { setIsOpen(false); setIsSaved(false); }} className="absolute right-3 top-2 text-xl leading-none text-[#61756d] transition hover:text-[#e86d52]">×</button>
        <p className="text-xs font-bold tracking-wide text-[#203b35]">{fruitName} 到貨通知</p>
        <p className="mt-1 text-[11px] leading-5 text-[#61756d]">留下 Email，到貨時通知你。</p>
        {isSaved ? <p className="mt-4 text-xs font-bold text-[#e86d52]">已登記，謝謝你。</p> : <div className="mt-3 flex border-b border-[#203b35] pb-2"><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="你的 Email" aria-label={`${fruitName} 通知 Email`} className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9a9c8f]" /><button type="submit" className="text-xs font-bold text-[#e86d52]">送出</button></div>}
      </form>}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "duplicate">("idle");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    let subscribedEmails: string[] = [];
    try {
      const savedEmails = JSON.parse(localStorage.getItem(SUBSCRIBED_EMAILS_KEY) ?? "[]");
      subscribedEmails = Array.isArray(savedEmails) ? savedEmails : [];
    } catch {
      subscribedEmails = [];
    }

    if (subscribedEmails.includes(normalizedEmail)) {
      setSubscriptionStatus("duplicate");
      return;
    }

    localStorage.setItem(SUBSCRIBED_EMAILS_KEY, JSON.stringify([...subscribedEmails, normalizedEmail]));
    const currentBonus = Number(localStorage.getItem(BONUS_KEY) ?? 0);
    localStorage.setItem(BONUS_KEY, String(currentBonus + 1));
    setSubscriptionStatus("success");
  }

  useEffect(() => {
    const seasonal = document.getElementById("seasonal");
    if (!seasonal) return;
    const handleCardClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;
      const card = target.closest("article");
      if (card) {
        const image = card.querySelector<HTMLElement>('[role="img"]');
        const fruitSlug = image?.style.backgroundImage.match(/\/images\/([^.)]+)/)?.[1] ?? "mango";
        router.push(`/blog/${fruitSlug}`);
      }
    };
    seasonal.addEventListener("click", handleCardClick);
    return () => seasonal.removeEventListener("click", handleCardClick);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#203b35]">
      <LotteryModal />
      <NicknameWelcome onSubmitted={setNickname} />
      <style>{`#seasonal article{position:relative;cursor:pointer}#seasonal article::after{content:"☝️";position:absolute;top:1rem;right:1rem;z-index:20;font-size:1.8rem;opacity:0;pointer-events:none;transform:translateY(6px) rotate(-8deg) scale(.8);filter:drop-shadow(2px 3px 0 rgb(24 60 53 / .18));transition:opacity 180ms ease}#seasonal article:hover::after,#seasonal article:focus-within::after{opacity:1;animation:cute-finger-bounce 700ms ease-in-out infinite}@keyframes cute-finger-bounce{0%,100%{transform:translateY(3px) rotate(-8deg) scale(.95)}50%{transform:translateY(-5px) rotate(5deg) scale(1.08)}}`}</style>
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 md:px-10 lg:px-16">
        <header className="border-b border-[#203b35]/20">
          <nav className="flex items-center justify-between py-4 sm:py-6" aria-label="主要導覽">
            <a href="#top" className="flex items-center gap-3 text-sm font-bold tracking-[0.18em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e86d52] text-sm text-white">果</span>果然台灣</a>
            <div className="hidden gap-9 text-xs font-bold tracking-[0.12em] text-[#61756d] md:flex"><a className="hover:text-[#e86d52]" href="#seasonal">當季水果</a><a className="hover:text-[#e86d52]" href="#origin">產地筆記</a><a className="hover:text-[#e86d52]" href="#journal">訂閱風土誌</a><Link className="hover:text-[#e86d52]" href="/game">接水果遊戲</Link></div>
            <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-5">
              {nickname && <span className="max-w-[8rem] truncate whitespace-nowrap border border-[#e86d52]/35 bg-[#fff8ed]/70 px-3 py-2 text-xs font-bold text-[#203b35] sm:max-w-[12rem]" title={`嗨，${nickname}`}>嗨，{nickname}</span>}
              <a href="#journal" className="shrink-0 whitespace-nowrap border-b border-[#e86d52] pb-1 text-xs font-bold tracking-[0.12em] text-[#e86d52]">加入果友 ↗</a>
            </div>
          </nav>
        </header>

        <section id="top" className="grid min-h-0 items-center gap-12 border-b border-[#203b35]/20 py-14 sm:py-20 md:grid-cols-[1fr_0.8fr] lg:min-h-[650px] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="mb-8 text-xs font-bold tracking-[0.28em] text-[#e86d52]">A TASTE OF TAIWAN / 2025</p>
            <h1 className="max-w-3xl font-serif text-6xl leading-[0.95] tracking-[-0.06em] sm:text-8xl lg:text-[9.2rem]">果實<br /><em className="font-serif font-normal text-[#e86d52]">正熟。</em></h1>
            <p className="mt-10 max-w-md border-l border-[#e86d52] pl-5 text-sm leading-7 text-[#61756d] sm:text-base">一座島嶼，四季有不同的甜。從果園、山坡到海風，我們記錄台灣水果最剛好的時刻。</p>
            <a href="#seasonal" className="mt-10 inline-flex items-center gap-8 border-b border-[#203b35] pb-3 text-sm font-bold">往下走，去認識一顆水果 <span className="text-xl font-normal">↓</span></a>
          </div>
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="parallax-orbit absolute -right-4 -top-8 h-32 w-32 rounded-full border border-[#e86d52]/60 sm:-right-10 sm:-top-12 sm:h-44 sm:w-44" />
            <div className="relative aspect-[0.78] overflow-hidden bg-[#d2dcbf] shadow-[18px_18px_0_#e8b58c]">
              <div className="parallax-hero absolute inset-0 bg-cover bg-center grayscale-[15%]" role="img" aria-label="台灣芒果特寫" style={{ backgroundImage: "url(/images/mango.jpg)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#203b35]/45 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 text-xs font-bold tracking-[0.2em] text-white">FIG. 01 / MANGO</span>
            </div>
            <p className="mt-6 text-right font-serif text-sm italic text-[#61756d]">日光把甜留在果肉裡。</p>
          </div>
        </section>

        <section id="seasonal" className="border-b border-[#203b35]/20 py-16 sm:py-24">
          <div className="mb-10 flex flex-col items-start gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">THE SEASONAL EDIT</p><h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">環境友善的果園</h2></div><span className="text-xs font-bold tracking-widest text-[#61756d]">10 FRUITS / 2025 SUMMER</span></div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">{fruits.map((fruit, index) => <article key={fruit.name} className="group"><div className="relative aspect-[0.9] overflow-hidden bg-[#d9e2c9] sm:aspect-[0.82]">{fruit.image === "/images/mango.jpg" ? <Link href="/blog" aria-label="閱讀愛文芒果介紹" className="block h-full w-full"><div role="img" aria-label={fruit.name} className="h-full w-full bg-cover bg-center grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" style={{ backgroundImage: `url(${fruit.image})` }} /></Link> : <div role="img" aria-label={fruit.name} className="h-full w-full bg-cover bg-center grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" style={{ backgroundImage: `url(${fruit.image})` }} />}<span className="absolute left-4 top-4 text-xs font-bold tracking-widest text-white drop-shadow">{String(index + 1).padStart(2, "0")}</span></div><div className="flex items-start justify-between gap-3 border-b border-[#203b35]/25 py-5 max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_auto]"><div className="min-w-0 flex-1"><h3 className="font-serif text-xl sm:text-2xl">{fruit.name}</h3><p className="mt-2 text-xs font-bold tracking-widest text-[#61756d]">{fruit.detail}</p></div><div className="flex shrink-0 flex-wrap items-start justify-end gap-3 max-sm:contents"><span className="pt-1 text-[10px] font-bold tracking-widest text-[#e86d52]">{fruit.season}</span>{fruit.soldOut ? <StockNotice fruitName={fruit.name} /> : <button type="button" aria-label={`將${fruit.name}加入購物車`} title="加入購物車" className="grid h-9 w-9 place-items-center border border-[#203b35]/30 text-[#203b35] transition hover:border-[#e86d52] hover:bg-[#e86d52] hover:text-white"><svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6.1M10 20h.01M17 20h.01" /></svg></button>}</div></div></article>)}</div>
        </section>

        <section id="origin" className="grid gap-12 border-b border-[#203b35]/20 py-20 sm:py-28 md:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
          <div><p className="mb-5 text-xs font-bold tracking-[0.25em] text-[#e86d52]">NOTES FROM THE LAND</p><h2 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-7xl">水果是<br /><em className="font-serif font-normal">地方的語言。</em></h2></div>
          <div><p className="max-w-lg text-lg leading-9 text-[#61756d]">同一種水果，換一塊土地，就有不同的脾氣。這些風味來自土壤、氣候，也來自每天照顧果樹的人。</p><div className="mt-10">{places.map(([number, title, text]) => <a href="#journal" key={number} className="group flex items-center gap-6 border-t border-[#203b35]/25 py-5 transition hover:pl-3"><span className="text-xs font-bold text-[#e86d52]">{number}</span><div className="flex-1"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-1 text-sm text-[#61756d]">{text}</p></div><span className="text-xl transition group-hover:translate-x-2">→</span></a>)}</div></div>
        </section>

        <section id="journal" className="grid gap-10 py-20 sm:py-28 md:grid-cols-[1fr_0.8fr] md:items-end"><div><p className="mb-5 text-xs font-bold tracking-[0.25em] text-[#e86d52]">THE FRUIT JOURNAL</p><h2 className="max-w-xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-7xl">把季節，<br /><em className="font-serif font-normal">寄到你手上。</em></h2></div><form onSubmit={handleSubscribe} className="border-t border-[#203b35] pt-5"><label htmlFor="email" className="text-sm leading-7 text-[#61756d]">每月一封信，分享當令水果與產地故事。</label><div className="mt-6 flex border-b border-[#203b35] pb-3"><input id="email" required type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSubscriptionStatus("idle"); }} placeholder="你的 Email" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9a9c8f]" /><button className="text-sm font-bold text-[#e86d52]" type="submit">訂閱 ↗</button></div>{subscriptionStatus === "success" && <p className="mt-4 text-sm font-bold text-[#e86d52]" role="status">感謝您的訂閱 ~ 已送您一張抽獎券！</p>}{subscriptionStatus === "duplicate" && <p className="mt-4 text-sm font-bold text-[#e86d52]" role="status">您已訂閱過囉！</p>}</form></section>

        <footer className="flex flex-col justify-between gap-6 border-t border-[#203b35]/20 py-8 text-xs font-bold tracking-wider text-[#61756d] sm:flex-row"><span>© 2025 果然台灣</span><span>台灣水果風土誌 / MADE WITH GOOD SOIL</span><a href="#top" className="text-[#e86d52]">回到頂端 ↑</a></footer>
      </div>
    </main>
  );
}
