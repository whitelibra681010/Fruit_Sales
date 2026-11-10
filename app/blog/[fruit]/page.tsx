import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const fruitStories = {
  mango: {
    name: "愛文芒果",
    english: "MANGO",
    place: "屏東・枋山",
    season: "六月 — 八月",
    price: "NT$4,380",
    image: "/images/mango.jpg",
    headline: "一顆被夏天養大的果實。",
    intro: "從屏東的紅土地出發，將日光、海風與果園裡等待熟成的耐心，收進金黃色的果肉裡。",
    story: "愛文芒果的香氣飽滿、果肉細緻，成熟時帶著蜂蜜與熱帶花香。果農透過疏果與套袋，讓每顆果實都能擁有剛好的陽光與養分。",
    guide: "果皮由青轉黃紅、蒂頭散發香氣，按壓時有微微彈性，就是最適合享用的時刻。",
  },
  lychee: {
    name: "玉荷包荔枝",
    english: "LYCHEE",
    place: "高雄・大樹",
    season: "五月 — 七月",
    price: "NT$2,980",
    image: "/images/lychee.jpg",
    headline: "剝開薄薄果皮，就是一口清甜。",
    intro: "玉荷包荔枝有著鮮紅外殼與晶瑩果肉，甜味明亮，尾韻帶著淡淡花香。",
    story: "大樹的溫暖氣候讓荔枝慢慢累積糖度，果農在短短產季裡細心照料，只為守住剛採下時最迷人的水分與香氣。",
    guide: "荔枝適合冷藏後享用，入口更清爽；收到後保持乾燥冷藏，能延長最佳風味。",
  },
  pineapple: {
    name: "金鑽鳳梨",
    english: "PINEAPPLE",
    place: "高雄・燕巢",
    season: "四月 — 八月",
    price: "NT$1,180",
    image: "/images/pineapple.jpg",
    headline: "酸甜之間，是南方土地的光。",
    intro: "金鑽鳳梨果肉細嫩、纖維少，甜味之後留下一點清爽果酸。",
    story: "燕巢的土壤與溫暖日照，讓鳳梨長出明亮的香氣。成熟採收後不必等待太久，就是最適合分享的夏日水果。",
    guide: "切開後冷藏更好吃，也可以切塊冷凍，做成冰沙或搭配氣泡水。",
  },
  apple: {
    name: "高山蘋果",
    english: "APPLE",
    place: "梨山・和平",
    season: "八月 — 十一月",
    price: "NT$2,180",
    image: "/images/apple.jpg",
    headline: "山上的日夜溫差，養出清脆。",
    intro: "高山蘋果帶著清新的酸香與爽脆口感，是一口就能聽見聲音的水果。",
    story: "梨山的冷涼夜晚讓果實慢慢成熟，白天的陽光則累積糖度，形成乾淨、俐落又耐吃的風味。",
    guide: "整顆冷藏保存最能維持脆度，切開後搭配檸檬汁可減少氧化。",
  },
  banana: {
    name: "屏東香蕉",
    english: "BANANA",
    place: "屏東・南州",
    season: "全年",
    price: "NT$980",
    image: "/images/banana.jpg",
    headline: "柔軟甜香，是日常最好的底色。",
    intro: "屏東香蕉香氣溫柔、口感滑順，是早餐、點心與果昔都適合的日常水果。",
    story: "南州的溫暖陽光讓香蕉穩定生長，從青果採收後再慢慢後熟，將甜味留在最剛好的時刻。",
    guide: "青香蕉放在室溫下等待熟成，出現褐色斑點後甜味更飽滿；熟成後可冷藏延緩速度。",
  },
  grapes: {
    name: "彰化葡萄",
    english: "GRAPES",
    place: "彰化・大村",
    season: "七月 — 九月",
    price: "NT$2,580",
    image: "/images/grapes.jpg",
    headline: "一顆一顆，收進夏天的紫色。",
    intro: "彰化葡萄果粒飽滿多汁，甜味集中，咬下時有清新的果皮香。",
    story: "大村果園以細緻管理換來整齊果串，從開花到套袋，每個階段都在照顧果實的完整與風味。",
    guide: "食用前再清洗，冷藏保存能讓果粒維持脆度與香氣。",
  },
  orange: {
    name: "東山柳橙",
    english: "ORANGE",
    place: "台南・東山",
    season: "十一月 — 二月",
    price: "NT$1,180",
    image: "/images/orange.jpg",
    headline: "剝開之後，整個房間都亮了。",
    intro: "東山柳橙酸甜平衡、汁水豐富，帶著冬日陽光般的清新香氣。",
    story: "台南東山的坡地與日照，讓柳橙累積飽滿汁水。果皮香氣明亮，果肉則保留溫柔的甜。",
    guide: "常溫適合短期保存，想要更清爽的口感可以冷藏後食用。",
  },
  papaya: {
    name: "高雄木瓜",
    english: "PAPAYA",
    place: "高雄・六龜",
    season: "全年",
    price: "NT$1,580",
    image: "/images/papaya.jpg",
    headline: "柔軟橙色果肉，像一段慢慢醒來的夏天。",
    intro: "高雄木瓜香甜柔軟，果肉細緻多汁，是台灣餐桌上熟悉又溫暖的味道。",
    story: "六龜的溫暖環境讓木瓜全年生長，果農依照成熟度分批採收，讓果肉抵達餐桌時保持最好的狀態。",
    guide: "果皮轉黃、輕按略有彈性時最好吃；切開後去籽冷藏，風味更清爽。",
  },
  strawberry: {
    name: "大湖草莓",
    english: "STRAWBERRY",
    place: "苗栗・大湖",
    season: "十二月 — 四月",
    price: "NT$5,980",
    image: "/images/strawberry.jpg",
    headline: "冬天裡最鮮紅的一點甜。",
    intro: "大湖草莓香氣細緻、果汁豐富，酸甜之間有著清楚的季節感。",
    story: "苗栗的冷涼氣候讓草莓慢慢成熟，低溫拉長了果實累積香氣的時間，也讓每一顆都保有漂亮的色澤。",
    guide: "食用前再清洗並擦乾，冷藏時避免重疊，能保留果實的鮮度。",
  },
  watermelon: {
    name: "花蓮西瓜",
    english: "WATERMELON",
    place: "花蓮・壽豐",
    season: "五月 — 九月",
    price: "NT$780",
    image: "/images/watermelon.jpg",
    headline: "切開它，夏天就有了聲音。",
    intro: "花蓮西瓜清甜多汁，冰涼入口，是午後最直接的解暑方式。",
    story: "壽豐的開闊土地與充足日照，讓西瓜在藤上慢慢累積甜度。每一刀切下，都有清脆的夏日氣息。",
    guide: "整顆先冷藏再切開，切面用保鮮膜覆蓋，冷藏後盡快享用最清甜。",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(fruitStories).map((fruit) => ({ fruit }));
}

export default async function FruitBlogPage({ params }: { params: Promise<{ fruit: string }> }) {
  const { fruit } = await params;
  const story = fruitStories[fruit as keyof typeof fruitStories];
  if (!story) notFound();

  const articles = [
    { label: "01 / ORIGIN", title: `${story.name}從哪裡來？`, text: story.story },
    { label: "02 / GUIDE", title: `怎麼挑到最好的${story.name}？`, text: story.guide },
    { label: "03 / AT THE TABLE", title: `${story.name}的夏日餐桌`, text: `${story.name}適合直接享用，也能搭配早餐、甜點或冰飲，讓產地風味自然成為日常的一部分。` },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f1e9] text-[#203b35]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 md:px-10 lg:px-16">
        <header className="border-b border-[#203b35]/20">
          <nav className="flex items-center justify-between py-5 sm:py-7" aria-label="主要導覽">
            <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.18em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e86d52] text-white">果</span>果然台灣</Link>
            <Link href="/" className="text-xs font-bold tracking-[0.14em] text-[#61756d] transition hover:text-[#e86d52]">← 回到首頁</Link>
          </nav>
        </header>

        <section className="grid gap-10 border-b border-[#203b35]/20 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-bold tracking-[0.28em] text-[#e86d52]">THE FRUIT JOURNAL / {fruit.toUpperCase()}</p>
            <h1 className="max-w-2xl font-serif text-6xl leading-[0.92] tracking-[-0.07em] sm:text-8xl lg:text-[8.8rem]">{story.name}</h1>
            <p className="mt-8 max-w-md border-l border-[#e86d52] pl-5 text-sm leading-7 text-[#61756d] sm:text-base">{story.intro}</p>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full border border-[#e86d52]/60 sm:-right-8 sm:-top-8 sm:h-40 sm:w-40" />
            <div className="glass-panel relative overflow-hidden p-2 shadow-[18px_18px_0_#e8b58c] sm:p-3">
              <div className="aspect-[1.18] overflow-hidden bg-[#d9e2c9]"><div role="img" aria-label={story.name} className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${story.image})` }} /></div>
              <div className="flex items-center justify-between px-2 pb-1 pt-4 text-[10px] font-bold tracking-[0.2em] text-[#61756d] sm:px-4"><span>FIG. / {story.english}</span><span>{story.place}</span></div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[#203b35]/20 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div><p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#e86d52]">A SHORT STORY</p><h2 className="font-serif text-4xl leading-tight tracking-[-0.05em] sm:text-6xl">{story.headline}</h2></div>
          <div className="space-y-6 text-base leading-8 text-[#61756d] sm:text-lg sm:leading-9"><p>{story.story}</p><p>{story.guide}</p></div>
        </section>

        <section className="border-b border-[#203b35]/20 py-16 sm:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">THREE FRUIT STORIES</p><h2 className="font-serif text-4xl tracking-[-0.05em] sm:text-6xl">關於{story.name}的三篇筆記</h2></div>
            <span className="text-xs font-bold tracking-widest text-[#61756d]">READ / TASTE / SHARE</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {articles.map((article) => <article key={article.label} className="glass-panel flex min-h-[320px] flex-col p-6 sm:p-8"><p className="text-xs font-bold tracking-widest text-[#e86d52]">{article.label}</p><h3 className="mt-16 font-serif text-3xl leading-tight tracking-[-0.04em]">{article.title}</h3><p className="mt-auto border-t border-[#203b35]/20 pt-5 text-sm leading-7 text-[#61756d]">{article.text}</p></article>)}
          </div>
        </section>

        <section className="py-16 sm:py-24"><div className="glass-panel flex flex-col gap-8 p-7 sm:p-10 md:flex-row md:items-center md:justify-between"><div><p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">IN SEASON</p><h2 className="font-serif text-4xl tracking-[-0.05em] sm:text-5xl">{story.season}</h2><p className="mt-4 text-sm leading-7 text-[#61756d]">{story.name}・1 盒（20 kg）・{story.price}</p></div><Link href="/" className="inline-flex shrink-0 items-center justify-center border border-[#203b35] px-6 py-4 text-sm font-bold transition hover:bg-[#203b35] hover:text-[#f4f1e9]">回到水果列表 ↗</Link></div></section>

        <footer className="flex flex-col justify-between gap-5 border-t border-[#203b35]/20 py-8 text-xs font-bold tracking-wider text-[#61756d] sm:flex-row"><span>© 2025 果然台灣</span><span>{story.name}風土誌 / MADE WITH GOOD SOIL</span><Link href="/" className="text-[#e86d52]">回到首頁 ↑</Link></footer>
      </div>
    </main>
  );
}
