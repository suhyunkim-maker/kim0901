<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>GitHub Profile Preview</title>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Noto+Sans+KR:wght@400;600;700&display=swap" rel="stylesheet"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0d1117;
    color: #c9d1d9;
    font-family: 'Noto Sans KR', sans-serif;
    min-height: 100vh;
  }
  .github-page {
    max-width: 860px;
    margin: 0 auto;
    background: #0d1117;
  }

  /* ── HEADER ── */
  .header-wave {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 200px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 8px;
  }
  .header-wave::before {
    content: '';
    position: absolute; bottom: -1px; left: 0; right: 0;
    height: 60px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z' fill='%230d1117'/%3E%3C/svg%3E") no-repeat bottom;
    background-size: cover;
  }
  .header-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
    text-shadow: 0 2px 12px rgba(0,0,0,0.4);
    font-family: 'Fira Code', monospace;
  }
  .header-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.85);
    letter-spacing: 3px;
    font-weight: 400;
  }

  /* ── CONTENT ── */
  .content {
    padding: 32px 40px 0;
    text-align: center;
  }

  /* ── TYPING AREA ── */
  .typing-wrap {
    margin: 24px 0;
  }
  .typing-text {
    font-family: 'Fira Code', monospace;
    font-size: 1.15rem;
    font-weight: 600;
    color: #6C63FF;
    display: inline-block;
    border-right: 2px solid #6C63FF;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3.5s steps(40) infinite, blink .75s step-end infinite;
  }
  @keyframes blink { 50% { border-color: transparent; } }

  /* JS typing handled below */

  /* ── SECTION TITLES ── */
  h2 {
    font-size: 1.25rem;
    color: #e6edf3;
    margin: 36px 0 16px;
    text-align: left;
    border-bottom: 1px solid #21262d;
    padding-bottom: 8px;
  }

  /* ── CODE BLOCK ── */
  .code-block {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 10px;
    padding: 20px 24px;
    text-align: left;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 2;
    color: #c9d1d9;
    overflow-x: auto;
  }
  .code-block .k  { color: #ff7b72; }
  .code-block .s  { color: #a5d6ff; }
  .code-block .v  { color: #ffa657; }
  .code-block .p  { color: #79c0ff; }
  .code-block .c  { color: #8b949e; }

  /* ── BADGES ── */
  .badge-group { text-align: left; margin-bottom: 10px; }
  .badge-label { font-size: 0.8rem; color: #8b949e; font-weight: 600; margin-bottom: 6px; }
  .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    color: #fff;
    letter-spacing: 0.3px;
  }
  .badge-python   { background: #3776AB; }
  .badge-pandas   { background: #150458; }
  .badge-gemini   { background: #4285F4; }
  .badge-flask    { background: #333; }
  .badge-pg       { background: #336791; }
  .badge-supabase { background: #3ECF8E; color: #000; }
  .badge-git      { background: #F05032; }
  .badge-github   { background: #333; }
  .badge-notion   { background: #000; border: 1px solid #444; }

  /* ── PROJECT CARD ── */
  .project-card {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 24px;
    text-align: left;
  }
  .project-card h3 { color: #e6edf3; font-size: 1.05rem; margin-bottom: 8px; }
  .project-card p  { color: #8b949e; font-size: 0.88rem; line-height: 1.7; }
  .project-badges  { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0; }
  .pb { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; color: #fff; }
  .pb-flask    { background: #333; }
  .pb-gemini   { background: #4285F4; }
  .pb-supa     { background: #3ECF8E; color: #000; }
  .pb-team     { background: #FF6B6B; }
  .project-checks { color: #3fb950; font-size: 0.85rem; margin-top: 10px; }

  /* ── STATS CARDS ── */
  .stats-row {
    display: flex; gap: 16px; flex-wrap: wrap;
    margin-top: 8px;
  }
  .stat-card {
    flex: 1; min-width: 240px;
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 10px;
    padding: 20px;
  }
  .stat-card .title { font-size: 0.8rem; color: #8b949e; margin-bottom: 12px; }
  .stat-row-inner { display: flex; justify-content: space-between; align-items: center; margin: 6px 0; }
  .stat-row-inner .label { font-size: 0.82rem; color: #c9d1d9; }
  .stat-row-inner .val   { font-size: 0.82rem; color: #58a6ff; font-family: 'Fira Code', monospace; font-weight: 600; }
  .lang-bar { height: 8px; border-radius: 4px; margin: 8px 0 4px; display: flex; overflow: hidden; }
  .lang-bar div { height: 100%; }

  /* ── FOOTER WAVE ── */
  .footer-wave {
    width: 100%;
    height: 120px;
    margin-top: 48px;
    background: linear-gradient(135deg, #e94560 0%, #533483 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%);
    position: relative;
    overflow: hidden;
  }
  .footer-wave::after {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0;
    height: 60px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 C200,0 400,60 600,30 C800,0 1000,60 1200,30 L1200,0 L0,0 Z' fill='%230d1117'/%3E%3C/svg%3E") no-repeat top;
    background-size: cover;
  }
</style>
</head>
<body>
<div class="github-page">

  <!-- HEADER -->
  <div class="header-wave">
    <div class="header-title">Suhyeon's Github</div>
    <div class="header-sub">AI | Media | Data</div>
  </div>

  <div class="content">

    <!-- TYPING SVG -->
    <div class="typing-wrap">
      <span class="typing-text" id="typer"></span>
    </div>

    <!-- ABOUT ME -->
    <h2>🙋‍♀️ About Me</h2>
    <div class="code-block">
<span class="k">suhyeon</span> <span class="p">=</span> {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="s">"role"</span>    : [<span class="v">"Journalist"</span>, <span class="v">"Planner"</span>, <span class="v">"Product Manager"</span>],<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="s">"stack"</span>   : [<span class="v">"Python"</span>, <span class="v">"Flask"</span>, <span class="v">"PostgreSQL"</span>, <span class="v">"Supabase"</span>, <span class="v">"Google Gemini API"</span>],<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="s">"passion"</span> : <span class="v">"AI × Media Convergence"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="s">"project"</span> : <span class="v">"AI 자동 카드뉴스 생성 서비스 (Gemini + Imagen)"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="s">"goal"</span>    : <span class="v">"AI 시대를 선도하는 미디어 전문가"</span><br>
}
    </div>

    <!-- TECH STACK -->
    <h2>🛠️ Tech Stack</h2>
    <div class="badge-label">AI / Data</div>
    <div class="badges">
      <span class="badge badge-python">🐍 Python</span>
      <span class="badge badge-pandas">🐼 Pandas</span>
      <span class="badge badge-gemini">✨ Google Gemini</span>
    </div>
    <div class="badge-label">Backend / DB</div>
    <div class="badges">
      <span class="badge badge-flask">🔥 Flask</span>
      <span class="badge badge-pg">🐘 PostgreSQL</span>
      <span class="badge badge-supabase">⚡ Supabase</span>
    </div>
    <div class="badge-label">Tools</div>
    <div class="badges">
      <span class="badge badge-git">🔴 Git</span>
      <span class="badge badge-github">🐱 GitHub</span>
      <span class="badge badge-notion">📝 Notion</span>
    </div>

    <!-- FEATURED PROJECT -->
    <h2>🌟 Featured Project</h2>
    <div class="project-card">
      <h3>📰 AI 자동 카드뉴스 생성 서비스</h3>
      <p>Google Gemini &amp; Imagen API를 활용한 뉴스 자동 카드뉴스 변환 서비스</p>
      <div class="project-badges">
        <span class="pb pb-flask">Flask</span>
        <span class="pb pb-gemini">Gemini API</span>
        <span class="pb pb-supa">Supabase</span>
        <span class="pb pb-team">6인 팀프로젝트</span>
      </div>
      <div class="project-checks">
        ✅ 뉴스 트렌드 대시보드 &nbsp;|&nbsp; ✅ 이미지 자동 생성 &nbsp;|&nbsp; ✅ 기획~배포 전과정
      </div>
    </div>

    <!-- GITHUB STATS -->
    <h2>📊 GitHub Stats</h2>
    <div class="stats-row">
      <div class="stat-card">
        <div class="title">📈 Contributions</div>
        <div class="stat-row-inner"><span class="label">⭐ Stars Earned</span><span class="val">--</span></div>
        <div class="stat-row-inner"><span class="label">🔀 Commits (2025)</span><span class="val">--</span></div>
        <div class="stat-row-inner"><span class="label">🔃 Pull Requests</span><span class="val">--</span></div>
        <div class="stat-row-inner"><span class="label">🐛 Issues</span><span class="val">--</span></div>
        <div style="margin-top:10px;font-size:0.75rem;color:#8b949e;">* GitHub ID 입력 후 실제 수치 반영</div>
      </div>
      <div class="stat-card">
        <div class="title">💻 Top Languages</div>
        <div class="lang-bar">
          <div style="width:55%;background:#3776AB;"></div>
          <div style="width:25%;background:#F7DC6F;"></div>
          <div style="width:20%;background:#e34c26;"></div>
        </div>
        <div class="stat-row-inner"><span class="label">Python</span><span class="val">55%</span></div>
        <div class="stat-row-inner"><span class="label">JavaScript</span><span class="val">25%</span></div>
        <div class="stat-row-inner"><span class="label">HTML/CSS</span><span class="val">20%</span></div>
      </div>
    </div>

  </div><!-- /content -->

  <!-- FOOTER WAVE -->
  <div class="footer-wave"></div>

</div>

<script>
  const lines = [
    "AI | Media | Data Explorer 🚀",
    "Journalist × Product Manager × Data Analyst",
    "Building AI-powered Media Services 🎯",
    "Let's build something amazing together!"
  ];
  let li = 0, ci = 0, deleting = false;
  const el = document.getElementById('typer');
  function tick() {
    const cur = lines[li];
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
</script>
</body>
</html>
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8947eab5-74cc-4a66-aac9-d4c78fcef831

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
