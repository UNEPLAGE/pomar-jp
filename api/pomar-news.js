// pomar.jp INFORMATION フィード
// upioutdoor.com（WordPress）タグ「pomar」の最新記事を、サーバー側で取得して
// 同一オリジンのJSONとして返す。RSSで一覧（タイトル/日付/リンク）を取り、
// 各記事の og:image を補完する。ブラウザからのCORS/403問題を回避するための中継。
//
// 返却形式: [{ title, url, date("YYYY.MM.DD"), image }]  最大4件

const FEED = 'https://upioutdoor.com/tag/pomar/feed/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
const LIMIT = 4;

async function getText(url) {
  const r = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ja,en;q=0.8'
    }
  });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
  return await r.text();
}

function pick(re, s) { const m = re.exec(s); return m ? m[1].trim() : ''; }

function stripCdata(s) {
  return s.replace(/^\s*<!\[CDATA\[/, '').replace(/\]\]>\s*$/, '').trim();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;|&apos;/g, "'")
    .replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&hellip;|&#8230;/g, '…').replace(/&nbsp;/g, ' ');
}

function fmtDate(d) { // RSS pubDate -> YYYY.MM.DD（日本時間）
  const t = new Date(d);
  if (isNaN(t.getTime())) return '';
  const j = new Date(t.getTime() + 9 * 3600 * 1000);
  return j.getUTCFullYear() + '.' +
    String(j.getUTCMonth() + 1).padStart(2, '0') + '.' +
    String(j.getUTCDate()).padStart(2, '0');
}

async function ogImage(url) {
  try {
    const html = await getText(url);
    return pick(/<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i, html)
      || pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::url)?["']/i, html)
      || pick(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i, html)
      || '';
  } catch (e) { return ''; }
}

module.exports = async (req, res) => {
  try {
    const xml = await getText(FEED);
    const items = [];
    const re = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = re.exec(xml)) && items.length < LIMIT) {
      const block = m[1];
      const title = decodeEntities(stripCdata(pick(/<title>([\s\S]*?)<\/title>/, block)));
      const link = decodeEntities(stripCdata(pick(/<link>([\s\S]*?)<\/link>/, block)));
      const pub = pick(/<pubDate>([\s\S]*?)<\/pubDate>/, block);
      if (link) items.push({ title: title, url: link, date: fmtDate(pub), image: '' });
    }
    await Promise.all(items.map(async (it) => { it.image = await ogImage(it.url); }));
    send(res, 200, items, 'public, s-maxage=600, stale-while-revalidate=86400');
  } catch (e) {
    send(res, 200, [], 'public, s-maxage=60');
  }
};

function send(res, code, obj, cache) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cache);
  res.end(JSON.stringify(obj));
}
