# pomar.jp — サイト構成メモ（編集用）

公開URL: https://pomar.jp/
制作: SORAH Inc.（釜田）／ 更新日: 2026-09-17

このファイルは、UPI ECチームが Claude 等でページを編集するための「地図」です。
ページの文言・写真・商品を触るときは、まずここで「どのファイルの、どのセクションか」を確認してください。

---

## 1. 全体像

- 静的HTML 5ページ＋画像/動画フォルダ。フレームワーク・CMSなし。各HTMLの `<head>` 内 `<style>` にそのページのCSSを内包。orukayak.jp と同じ作りです。
- 本番リポジトリ（GitHub）: **`UNEPLAGE/pomar-jp`**（ルートに HTML、`assets/` に画像・動画）
- ホスティング: UPI の Vercel。`main` ブランチにコミットすると約1分で自動反映
- `vercel.json` の `cleanUrls: true` により、URL は拡張子なし（`lineup.html` → https://pomar.jp/lineup ）。HTML内のリンクも `/lineup` のように拡張子なしで書く
- 画像・動画のパスは **ルート絶対パス** `/assets/...` で書く
- 確認用（SORAH側）: https://sorah.io/project/upi/pomar/ にパスワード付きの同内容があります。こちらは `SORAH-INC/corporate` 管理で、パスが `/project/upi/pomar/...`・リンクが `.html` 付きという違いだけです。本番の修正は必ず UNEPLAGE リポジトリで行ってください

| ファイル | 役割 | 本番URL |
|---|---|---|
| `index.html` | トップ | https://pomar.jp/ |
| `lineup.html` | 製品ラインナップ | https://pomar.jp/lineup |
| `about.html` | ブランドストーリー | https://pomar.jp/about |
| `care.html` | シューケアガイド | https://pomar.jp/care |
| `size.html` | サイズガイド | https://pomar.jp/size |
| `assets/` | 画像・動画・ロゴ | https://pomar.jp/assets/… |
| `robots.txt` `sitemap.xml` | 検索エンジン向け（5ページ登録） | — |
| `favicon.svg` `favicon-32x32.png` `apple-touch-icon.png` | ファビコン（ロゴの「p」） | — |
| `vercel.json` | URL設定（触らない） | — |

---

## 2. ページ別セクション構成

セクションは `<section class="sec">` 単位。見出しは `<p class="eyebrow en">英字ラベル</p>` ＋ `<h2 class="t">日本語見出し</h2>` の組み合わせ。英字ラベルで検索すると該当箇所にすぐ飛べます。

### index.html（トップ）
1. ヘッダー（ロゴ／ナビ: BRAND・SHOE CARE・SIZE GUIDE・LINEUP）
2. ヒーロー（写真スライド4枚 `hero.jpg` `hero-a.jpg` `h-neito.jpg` `h-aita.jpg`、キャッチ「北欧の暮らしに寄り添う、フィンランドの本格派シューズ。」）
3. **LINEUP** — 2026 Autumn & Winter（商品カード8点。全13SKUはラインナップページへ）
4. **FUNCTION MARKS** — 機能性マークについて（WATERPROOF／WARM／EXTRA WARM／GRIP SOLE）
5. **ブランドムービー** `assets/brand.mp4`（自動再生・ループ・無音、ポスター `brand-poster.jpg`）
6. **POMAR ｜ ポマール — FINLAND, POMARKKU** — 1960年創業。今もなお、家族経営のものづくり。（写真 `craft-wet.jpg`＋黒地テキスト＋CRAFTSMANSHIP）
7. 2枚バナー（SHOE CARE → care.html／SIZE GUIDE → size.html）
8. フッター（UPIロゴ・ストアリンク）

### lineup.html（製品ラインナップ）
1. ページタイトル「製品ラインナップ」（LINEUP — 2026 AUTUMN & WINTER）
2. **WOMEN** ウィメンズ（NEITO／NIVA／PERHO／ORAS）
3. **MEN** メンズ（AITA黒／AITA茶／KAARRE／KUJA）
4. **SNEAKERS** スニーカー（KARLA白／KARLA茶／VIRE／SAVI白／SAVI茶）※女性→男性の順

### about.html（ブランドストーリー）
1. ページタイトル「pomar（ポマール）の歩み」（BRAND STORY）＋年表（1960／1994／2000〜）
2. **CRAFTSMANSHIP & LOCAL PRODUCTION** — 世界の靴のわずか3％。（写真 `craft-wet.jpg`）
3. **SIX CRAFTS** — 靴づくりを支える、熟練の手仕事（裁断／縫製／吊り込み／底付け／仕上げ／生産管理）
4. **HOW WE MAKE A SHOE** — 一足が仕上がるまで（製造工程動画 `assets/craft.mp4` 2分・再生ボタン式）
5. **SUSTAINABILITY** — 北欧の自然と歩むものづくり（PFASフリー GORE-TEX® ePE など）
6. **FUNCTION MARKS** — 機能性マークについて

### care.html（シューケアガイド）
1. ページタイトル「シューケアガイド」
2. **6 RULES** — お手入れの基本、6つのルール
3. **SHOE CARE PRODUCTS** — 推奨ケアアイテム ← ★Collonil 2品の入荷後にここへ追加
4. **CARE BY MATERIAL** — 素材別のお手入れ
5. **REPLACEABLE INSOLE** — インソールは取り外し可能。

### size.html（サイズガイド）
1. ページタイトル「サイズガイド」
2. **WOMEN** — ウィメンズ 内寸表（mm）
3. **MEN** — メンズ 内寸表（mm）
4. **HOW TO MEASURE** — 足長の測り方 ← ★測り方の図（Shopify商品ページで使用中の画像）を入れる予定
5. **READY?** — サイズが決まったら。（ストアへの導線）

---

## 3. 商品カードの書き方

商品は `<div class="card" id="card-xxx">` 1ブロック。トップ（8点）とラインナップ（13点）で同じ構造です。値段・サイズ・色を直すときは **両方のファイル** を直してください。

```html
<div class="card" id="card-neito" data-opt="ブラック">
  <a class="imgbox" href="（ストア商品URL）" target="_blank" rel="noopener" aria-label="…">
    <span class="gtag w en">WOMEN'S</span>            <!-- 男性は class="gtag en" で MEN'S -->
    <span class="so-tag en">SOLD OUT</span>           <!-- 表示はCSSで制御（通常は非表示） -->
    <img class="main-img" src="/assets/p-neito-black.jpg" alt="…">
  </a>
  <p class="code en code-val">品番 38113-100</p>
  <h3 class="en">NEITO Women's GORE-TEX® ANKLE BOOTS<br><span class="jp">ネイト ウィメンズ アンクルブーツ</span></h3>
  <p class="price">税込 <span class="price-val">¥39,050</span><small>送料無料</small></p>
  <p class="sizes">SIZE：EU 36–41（内寸 240–272mm）</p>
  <div class="sw"><span class="cpill"><span class="dot" style="background:#1d1c1c"></span>ブラック</span></div>
  <div class="buy"><a href="（ストア商品URL）" target="_blank" rel="noopener" class="en">BUY ON STORE <span class="ar">→</span></a></div>
</div>
```

- カラーチップ: `dot` の `background` が色、続くテキストが色名（日本語のみ）
- 商品画像: `assets/p-<商品名>-<色>.jpg`（正方形・白背景・1000px程度）
- 商品を追加するときは、既存カードをコピーして id を変える（id は重複不可）

### 掲載中の13SKU

| 品番 | 商品名 | 色 | 税込 | サイズ | ストアURL |
|---|---|---|---|---|---|
| 38113-100 | NEITO ウィメンズ アンクルブーツ | ブラック | ¥39,050 | EU 36–41 | store.upioutdoor.com/products/pomar-neito |
| 37111-102 | NIVA ウィメンズ ウォーム ウィンターブーツ | サンド | ¥43,450 | EU 36–41 | …/pomar-niva |
| 37108-102 | PERHO ウィメンズ アンクルブーツ | サンド | ¥39,600 | EU 36–41 | …/pomar-perho |
| 38136-202 | ORAS ウィメンズ アンクルブーツ | ブラウン | ¥42,900 | EU 36–41 | …/pomar-oras |
| 63020-530 | AITA メンズ ダービーシューズ | ブラック | ¥37,950 | EU 40–45 | …/pomar-aita |
| 63020-212 | AITA メンズ ダービーシューズ | ブラウン | ¥39,600 | EU 40–45 | …/pomar-aita |
| 68010-502 | KAARRE チェルシーブーツ | ダークブラウン | ¥40,700 | EU 40–45 | …/pomar-kaarre |
| 68229-500 | KUJA メンズ アンクルブーツ | ブラック | ¥40,700 | EU 40–45 | …/pomar-kuja |
| 13525-101 | KARLA ウィメンズ スニーカー | ホワイト | ¥25,300 | EU 36–40 | …/pomar-karla-sneakers |
| 13525-102 | KARLA ウィメンズ スニーカー | ライトブラウン | ¥25,300 | EU 36–40 | …/pomar-karla-sneakers |
| 33271-120 | VIRE ウィメンズ スリッポン スニーカー | ブラック | ¥23,650 | EU 36–40 | …/pomar-vire-womens-sneakers |
| 43625-101 | SAVI Pomar+ メンズ スニーカー | ホワイト | ¥26,400 | EU 40–44 | …/pomar-savi-sneakers |
| 43625-102 | SAVI Pomar+ メンズ スニーカー | ライトブラウン | ¥26,400 | EU 40–44 | …/pomar-savi-sneakers |

---

## 4. 画像・動画（assets/）

| 接頭辞 | 用途 | 例 |
|---|---|---|
| `p-` | 商品カード画像（正方形・白背景） | `p-karla-tan.jpg` |
| `h-` / `hero` | トップのヒーロー写真（横長・2000px） | `hero.jpg` `h-aita.jpg` |
| `ls-` | ライフスタイル写真（各ページの差し込み） | `ls-oras.jpg` |
| `st-` | ストリート／着用カット | `st-karla.jpg` |
| `mark-` | 機能性マーク（4種） | `mark-waterproof.jpg` |
| `t` | 年表用サムネイル | `t1960.jpg` |
| `logo-` | ロゴ（pomar白・グレー、UPI） | `logo-pomar-white.svg` |
| 動画 | `brand.mp4`（0:48 無音）＋`brand-poster.jpg`／`craft.mp4`（2:01 音声あり）＋`craft-poster.jpg` | |

- 写真を差し替えるときは **同じファイル名で上書き** すればHTMLの変更は不要
- 公式画像の原本: Dropbox「Lifestyle by Product Number」（品番でファイル名）／動画は Dropbox「動画」
- 公式画像がまだ無い品番: NEITO／NIVA／AITA黒／KAARRE／KUJA／SAVI白／VIRE（現状は仮画像）
- Web用の目安: 写真は長辺1400〜2000px・JPEG品質85前後、動画は幅1280px以下・H.264・10MB以下

---

## 5. よくある編集の手順（Claudeに頼むときの言い方の例）

- 価格変更 →「`index.html` と `lineup.html` の 品番 38113-100 の price-val を ¥40,700 に」
- 商品の入れ替え →「`lineup.html` の MEN セクションに、KUJA と同じ構造で 品番 ○○ のカードを追加」
- 写真差し替え → 新しい画像を同名で `assets/` に上書き
- 文言修正 →「`about.html` の SUSTAINABILITY セクションの本文を…に」
- ケア用品追加 →「`care.html` の SHOE CARE PRODUCTS に Collonil オーガニック バンブーローション（https://www.collonil.jp/products/organic-bamboo-lotion）と オーガニック プロテクト＆ケア（…/organic-protect-and-care）を追加」

編集後は GitHub（UNEPLAGE/pomar-jp）の `main` にコミット → 約1分で pomar.jp に反映されます。

---

## 6. 技術メモ（触らなくてよい部分）

- 各ページの `<head>` に canonical / OGP（og:image はトップのヒーロー写真）/ favicon を設定済み。ページを増やしたら canonical と `sitemap.xml` も更新
- 商品の価格・在庫は `store.upioutdoor.com/collections/pomar/products.json` を読んでページ側で更新する仕組みが入っています（HTMLの価格は初期表示用）
- Google アナリティクス: 未設置。orukayak.jp と同様に GA4 の測定IDが決まったら各HTMLの `<head>` 先頭に gtag を追加
- DNS: お名前.com（pomar.jp）→ Vercel（A `76.76.21.21`／CNAME www → `cname.vercel-dns.com`）
- 未対応事項: SIZE GUIDE 足長の図（素材待ち）／Collonil ケア用品2点（入荷待ち）／公式画像のない7品番
