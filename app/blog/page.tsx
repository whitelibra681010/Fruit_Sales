import Link from "next/link";

const notes = [
  { label: "產地", value: "屏東・枋山", detail: "南方日光充足，海風讓果實慢慢累積甜味。" },
  { label: "季節", value: "六月 — 八月", detail: "盛夏最迷人的一段時間，熟成香氣飽滿。" },
  { label: "口感", value: "細緻・多汁", detail: "果肉柔軟，帶有蜂蜜、熱帶花香與微酸。" },
];

const articles = [
  {
    number: "01",
    category: "ORIGIN STORY",
    title: "枋山的日光，為什麼特別甜？",
    excerpt: "從紅土地、海風到長時間的日照，愛文芒果的風味其實是一張產地地圖。",
    body: "屏東枋山位在台灣南端，溫暖的氣候讓芒果有足夠時間累積香氣。果農替果實套袋、疏果，只留下最健康的一顆，讓每一口都帶著南方日光的厚度。",
  },
  {
    number: "02",
    category: "MANGO GUIDE",
    title: "買回家後，怎麼等它到最好吃？",
    excerpt: "看顏色、聞香氣、摸彈性，三個小動作就能判斷芒果的熟成時機。",
    body: "剛收到的芒果可以放在室溫下等待。果皮由青轉黃紅、蒂頭散發香氣，按壓時有微微彈性，就是最適合享用的時刻；熟成後再冷藏，風味會更清爽。",
  },
  {
    number: "03",
    category: "AT THE TABLE",
    title: "一顆芒果的三種夏日吃法",
    excerpt: "切片、冰沙、芒果糯米飯，讓成熟果肉在餐桌上有不同表情。",
    body: "最簡單的是冰涼切片，保留完整香氣；加入冰塊與牛奶就成了濃郁冰沙；想要更有層次，可以搭配椰奶糯米飯，讓酸甜與米香一起慢慢展開。",
  },
];

export default function MangoBlogPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f1e9] text-[#203b35]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 md:px-10 lg:px-16">
        <header className="border-b border-[#203b35]/20">
          <nav className="flex items-center justify-between py-5 sm:py-7" aria-label="主要導覽">
            <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.18em]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e86d52] text-white">果</span>
              果然台灣
            </Link>
            <Link href="/" className="text-xs font-bold tracking-[0.14em] text-[#61756d] transition hover:text-[#e86d52]">
              ← 回到首頁
            </Link>
          </nav>
        </header>

        <section className="grid gap-10 border-b border-[#203b35]/20 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-bold tracking-[0.28em] text-[#e86d52]">THE FRUIT JOURNAL / 01</p>
            <h1 className="max-w-2xl font-serif text-6xl leading-[0.92] tracking-[-0.07em] sm:text-8xl lg:text-[8.8rem]">
              愛文
              <br />
              <em className="font-normal text-[#e86d52]">芒果。</em>
            </h1>
            <p className="mt-8 max-w-md border-l border-[#e86d52] pl-5 text-sm leading-7 text-[#61756d] sm:text-base">
              一顆被夏天養大的果實。從屏東的紅土地出發，將日光、海風與果園裡等待熟成的耐心，收進金黃色的果肉裡。
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full border border-[#e86d52]/60 sm:-right-8 sm:-top-8 sm:h-40 sm:w-40" />
            <div className="glass-panel relative overflow-hidden p-2 shadow-[18px_18px_0_#e8b58c] sm:p-3">
              <div className="aspect-[1.18] overflow-hidden bg-[#d9e2c9]">
                <div
                  className="h-full w-full bg-cover bg-center transition duration-700 hover:scale-105"
                  role="img"
                  aria-label="成熟的愛文芒果"
                  style={{ backgroundImage: "url(/images/mango.jpg)" }}
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-4 text-[10px] font-bold tracking-[0.2em] text-[#61756d] sm:px-4">
                <span>FIG. 01 / MANGO</span>
                <span>屏東・枋山</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[#203b35]/20 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#e86d52]">A SHORT STORY</p>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.05em] sm:text-6xl">甜味，來自等待。</h2>
          </div>
          <div className="max-w-2xl space-y-6 text-base leading-8 text-[#61756d] sm:text-lg sm:leading-9">
            <p>愛文芒果不是一夜之間變得香甜。花開之後，果農得細心疏果、套袋，讓每一顆果實都能擁有剛好的陽光與養分。</p>
            <p>當果皮從青綠轉成溫暖的橙紅，指尖輕輕按下去有一點彈性，空氣裡開始出現像蜂蜜一樣的香氣——這就是它準備好的訊號。</p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">MANGO NOTES</p>
              <h2 className="font-serif text-4xl tracking-[-0.05em] sm:text-6xl">一顆果實的三個側面</h2>
            </div>
            <span className="text-xs font-bold tracking-widest text-[#61756d]">TASTE / PLACE / TIME</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {notes.map((note, index) => (
              <article key={note.label} className="glass-panel min-h-56 p-6 transition duration-300 hover:-translate-y-1 sm:p-8">
                <div className="mb-12 flex items-center justify-between text-xs font-bold tracking-widest text-[#e86d52]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{note.label}</span>
                </div>
                <h3 className="font-serif text-3xl">{note.value}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61756d]">{note.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#203b35]/20 py-16 sm:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">THREE MANGO STORIES</p>
              <h2 className="font-serif text-4xl tracking-[-0.05em] sm:text-6xl">關於愛文的三篇筆記</h2>
            </div>
            <span className="text-xs font-bold tracking-widest text-[#61756d]">READ / TASTE / SHARE</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.number} className="glass-panel flex min-h-[390px] flex-col p-6 transition duration-300 hover:-translate-y-1 sm:p-8">
                <div className="flex items-center justify-between text-xs font-bold tracking-widest text-[#e86d52]">
                  <span>{article.number}</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="mt-16 font-serif text-3xl leading-tight tracking-[-0.04em]">{article.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#61756d]">{article.excerpt}</p>
                <div className="mt-auto border-t border-[#203b35]/20 pt-5">
                  <p className="text-sm leading-7 text-[#61756d]">{article.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#203b35]/20 py-14 sm:py-20">
          <div className="glass-panel flex flex-col gap-8 p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#e86d52]">READY FOR SUMMER?</p>
              <h2 className="font-serif text-4xl tracking-[-0.05em] sm:text-5xl">把一整個夏天帶回家。</h2>
              <p className="mt-4 text-sm leading-7 text-[#61756d]">愛文芒果 1 盒（20 kg）・NT$4,380</p>
            </div>
            <Link href="/#seasonal" className="inline-flex shrink-0 items-center justify-center border border-[#203b35] px-6 py-4 text-sm font-bold transition hover:bg-[#203b35] hover:text-[#f4f1e9]">
              查看當季水果 ↗
            </Link>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-5 border-t border-[#203b35]/20 py-8 text-xs font-bold tracking-wider text-[#61756d] sm:flex-row">
          <span>© 2025 果然台灣</span>
          <span>愛文芒果風土誌 / MADE WITH GOOD SOIL</span>
          <a href="#top" className="text-[#e86d52]">回到頂端 ↑</a>
        </footer>
      </div>
    </main>
  );
}
