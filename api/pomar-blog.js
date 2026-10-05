// pomar.jp POMAR BLOG フィード
// store.upioutdoor.com（Shopify）ブログのタグ「POMARブログ」の最新記事を
// サーバー側で取得し、同一オリジンのJSONとして返す。タグ一覧ページから記事URLを
// 抽出し、各記事の og:title / og:image / 公開日を取得する。
//
// 返却形式: [{ title, url, date("YYYY.MM.DD"), image }]  最大4件

const ORIGIN = 'https://store.upioutdoor.com';
// タグ一覧（「POMARブログ」をURLエンコード済み。実在確認済みのURL）
const LIST = ORIGIN + '/blogs/blog/tagged/pomar%E3%83%96%E3%83%AD%E3%82%B0';
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

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;|&apos;/g, "'")
    .replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&hellip;|&#8230;/g, '…').replace(/&nbsp;/g, ' ');
}

function fmtDate(d) { // ISO -> YYYY.MM.DD（日本時間）
  const t = new Date(d);
  if (isNaN(t.getTime())) return '';
  const j = new Date(t.getTime() + 9 * 3600 * 1000);
  return j.getUTCFullYear() + '.' +
    String(j.getUTCMonth() + 1).padStart(2, '0') + '.' +
    String(j.getUTCDate()).padStart(2, '0');
}

// タグ一覧HTMLから記事パーマリンク（/blogs/<blog>/<article>）を出現順に抽出
function extractArticleUrls(html) {
  const urls = [];
  const re = /href=["'](\/blogs\/[^"'\/]+\/[^"'?#]+)["']/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (/\/tagged(\/|$)/.test(href)) continue;   // タグ一覧ページ自身を除外
    const abs = ORIGIN + href;
    if (urls.indexOf(abs) === -1) urls.push(abs);
    if (urls.length >= 12) break;
  }
  return urls;
}

async function articleMeta(url) {
  try {
    const html = await getText(url);
    const title = decodeEntities(
      pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i, html)
      || pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i, html)
    );
    const image =
      pick(/<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i, html)
      || pick(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i, html)
      || '';
    const pub =
      pick(/<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i, html)
      || pick(/"datePublished"\s*:\s*"([^"]+)"/i, html)
      || '';
    if (!title) return null;
    return { title: title, url: url, date: fmtDate(pub), image: image };
  } catch (e) { return null; }
}

module.exports = async (req, res) => {
  try {
    const html = await getText(LIST);
    const urls = extractArticleUrls(html).slice(0, LIMIT);
    const metas = await Promise.all(urls.map(articleMeta));
    const out = metas.filter(function (x) { return x && x.title; });
    send(res, 200, out, 'public, s-maxage=600, stale-while-revalidate=86400');
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
