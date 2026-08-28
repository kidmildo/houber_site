# ADERS INTERNATIONAL 공식 사이트

오사카 ADERS INTERNATIONAL(株式会社エイダス)의 공식 웹사이트입니다.
한국어 / 일본어 2개 언어를 지원합니다.

- **빌드 도구 없이** 순수 HTML · CSS · JavaScript 로만 만들어졌습니다.
- `npm install` 같은 설치 과정이 필요 없고, 폴더를 그대로 올리면 바로 동작합니다.

---

## 1. 폴더 구조

```
/                           ← 저장소 루트가 곧 사이트 루트입니다
├── index.html              ← 한국어 메인 페이지
├── business/               ← 한국어 사업 상세 페이지 5장
│   ├── houber.html         ←   01 부동산
│   ├── nubi.html           ←   02 요식업
│   ├── startup.html        ←   03 창업 컨설팅
│   ├── legal.html          ←   04 행정서사
│   └── it.html             ←   05 IT & Digital
├── ja/
│   ├── index.html          ← 일본어 메인 페이지
│   └── business/           ← 일본어 사업 상세 페이지 5장 (파일명이 위와 같습니다)
│       ├── houber.html
│       ├── nubi.html
│       ├── startup.html
│       ├── legal.html
│       └── it.html
├── assets/
│   ├── css/
│   │   └── style.css       ← 디자인 전체 (두 언어가 함께 사용)
│   ├── js/
│   │   └── main.js         ← 메뉴·애니메이션 (두 언어가 함께 사용)
│   └── images/
│       └── README.md       ← 사진 넣는 방법 안내
├── favicon.svg             ← 브라우저 탭 아이콘
├── 404.html                ← 없는 페이지에 접속했을 때 화면
├── wrangler.jsonc          ← 배포 설정 (Cloudflare)
├── .assetsignore           ← 사이트에 올리지 않을 파일
├── _headers                ← 배포 설정 (브라우저 보관 기간)
├── robots.txt              ← 검색엔진 안내
├── sitemap.xml             ← 검색엔진용 페이지 목록
└── README.md               ← 이 파일
```

### 핵심 원칙

> **디자인과 동작은 파일 하나씩만 존재합니다.**
> `style.css` 를 고치면 한국어·일본어 페이지에 **동시에** 반영됩니다.
> 반대로 **글(텍스트)은 두 HTML 파일에 각각 들어 있으므로**,
> 문구를 바꿀 때는 `index.html` 과 `ja/index.html` 을 **둘 다** 수정해야 합니다.

---

## 2. 로컬에서 미리보기

파일을 더블클릭해서 열어도 대부분 동작하지만,
브라우저 보안 정책 때문에 일부 기능이 막힐 수 있습니다.
아래처럼 간단한 로컬 서버를 띄우는 것을 권장합니다.

```bash
# 저장소를 내려받은 폴더에서 실행합니다
cd houber_site

# 방법 1) Python (대부분의 Mac/Linux에 기본 설치되어 있음)
python3 -m http.server 8000

# 방법 2) Node.js 가 있다면
npx serve .
```

그다음 브라우저에서 접속:

- 한국어 → http://localhost:8000/
- 일본어 → http://localhost:8000/ja/
- 사업 상세(예) → http://localhost:8000/business/houber.html

---

## 3. 자주 하는 수정

### 3-0. ⚠️ 고쳤는데 화면이 그대로일 때 (캐시)

브라우저는 한 번 받은 `style.css` · `main.js` 를 한동안 다시 받지 않습니다.
그래서 **디자인·동작을 고쳤는데 화면이 그대로**인 일이 생깁니다.

이를 막기 위해 HTML에서 두 파일을 이렇게 부르고 있습니다.

```html
<link rel="stylesheet" href="assets/css/style.css?v=20260828">
<script src="assets/js/main.js?v=20260828" defer></script>
```

> **`style.css` 나 `main.js` 를 고쳤다면, 이 `?v=` 날짜를 바꿔주세요.**
> 값이 바뀌면 브라우저가 새 파일로 인식해 반드시 다시 받아갑니다.
> HTML 12장 + `404.html` 을 한 번에 바꾸는 명령 (macOS):
>
> ```bash
> grep -rl "?v=20260828" . --include="*.html" \
>   | xargs sed -i '' 's/?v=20260828/?v=20260901/g'
> ```
>
> `assets/js/main.js` 맨 위의 `VERSION` 값도 같이 바꿔두면,
> 개발자도구 Console 에서 지금 어느 버전이 도는지 바로 확인할 수 있습니다.

**지금 브라우저가 어느 버전을 쓰는지 확인하는 법**
개발자도구(`F12` 또는 `Cmd + Option + I`) → **Console** 탭에
`ADERS site — main.js v20260828` 이 찍힙니다. 날짜가 예전 것이면 캐시 문제입니다.

---

### 3-1. 색상 바꾸기

`assets/css/style.css` 맨 위 **"01. 디자인 토큰"** 블록만 고치면 됩니다.
여기 값 하나를 바꾸면 사이트 전체에 일괄 적용됩니다.

```css
:root {
  --color-navy: #16324F;   /* 메인 브랜드 색 — 이 한 줄만 바꿔도 전체가 바뀝니다 */
  --color-bg:   #FFFFFF;   /* 배경 (흰색) */
  ...
}
```

| 변수명            | 용도                                    |
| ----------------- | --------------------------------------- |
| `--color-navy`    | 메인 브랜드 색 (제목, 버튼, 로고)       |
| `--color-blue`    | 보조색 1                                |
| `--color-slate`   | 보조색 2                                |
| `--color-steel`   | 보조색 3 (가장 옅음)                    |
| `--color-bg`      | 기본 배경                               |
| `--color-bg-soft` | 옅은 회색 배경 (사업목표 섹션, 푸터)    |
| `--color-alert`   | ⚠️ 주의 표시 전용. **장식용으로 쓰지 마세요** |

### 3-2. 글자 바꾸기

HTML 파일 안에서 `[수정]` 이라고 적힌 주석을 찾으면 됩니다.
**한국어와 일본어 두 파일 모두 고쳐야 한다는 점**만 기억해 주세요.

### 3-3. 메뉴 항목 바꾸기

메뉴는 한 페이지 안에 **3곳**에 있습니다. 셋 다 고쳐야 합니다.

1. `<nav class="site-nav">` — PC 메뉴
2. `<nav class="mobile-menu">` — 모바일 메뉴
3. `<footer>` 안의 `MENU` 목록

### 3-4. 사진 넣기

→ `assets/images/README.md` 참고 (파일명·크기·라이선스 주의사항 정리되어 있습니다)

### 3-5. 사업 카드 추가·삭제

`business-grid` 는 **6칸 격자** 위에 카드를 올리는 구조입니다.

- `class="biz-card biz-card--wide"` → 3칸 차지 (첫 줄 2장)
- `class="biz-card"` → 2칸 차지 (둘째 줄 3장)

즉 `3 + 3` / `2 + 2 + 2` 로 두 줄이 정확히 맞아떨어집니다.
**카드 개수를 바꾸면 이 계산이 깨지므로**,
`style.css` 의 "13. 사업내용" 주석을 먼저 읽어보세요.

카드 강조색은 `data-accent` 속성으로 지정합니다.
사용 가능한 값: `navy` / `blue` / `slate` / `ink` / `steel`

### 3-6. 사업 설명 고치기 (카드 요약 · 자세히 보기 팝업)

동작은 이렇습니다.

```
[카드]  2~3줄 요약  +  (자세히 보기 →)
                            │
                            ▼  누르면 페이지 이동 없이
                    ┌──────────────────────┐
                    │  팝업(모달)로 전문 표시  │
                    └──────────────────────┘
                            ▲
        내용은 business/<이름>.html 에서 그대로 읽어옵니다
```

**글은 한 곳에만 있습니다.** 팝업과 상세 페이지가 같은 파일을 함께 쓰기 때문에,
`business/<이름>.html` 만 고치면 팝업 내용도 같이 바뀝니다.

| 보이는 곳 | 고칠 파일 |
| --- | --- |
| 카드 2~3줄 요약 | `index.html` / `ja/index.html` 의 `biz-card__text` |
| 카드의 "자세히 보기" 버튼 | 같은 파일의 `biz-card__more` |
| **팝업에 나오는 전문** | `business/<이름>.html` / `ja/business/<이름>.html` |

> **팝업이 가져가는 범위**
> 상세 페이지의 `<article id="biz-detail">` ~ `</article>` 안쪽만 팝업에 들어갑니다.
> 그 바깥(헤더·푸터·문의 유도·이전다음)은 상세 페이지를 직접 열었을 때만 보입니다.

**팝업 조작 방법**

| 동작 | 결과 |
| --- | --- |
| "자세히 보기" 클릭 | 팝업이 열리고 주소창이 `?biz=houber` 로 바뀝니다 |
| `×` · 배경 클릭 · `ESC` · 뒤로가기 | 팝업이 닫히고 주소도 원래대로 돌아옵니다 |
| `?biz=houber` 주소로 접속 | 그 사업의 팝업이 열린 채로 시작합니다 (링크 공유 가능) |
| 팝업 안 "전체 페이지로 보기" | 상세 페이지로 실제 이동합니다 |
| Cmd(Ctrl) + 클릭 | 새 탭에서 상세 페이지가 열립니다 |

> ⚠️ **주소를 바꾸는 방식을 건드리지 마세요.**
> 팝업을 열 때 주소를 `?biz=houber` 처럼 **쿼리로만** 바꿉니다.
> `business/houber.html` 처럼 **경로**를 바꾸면 페이지의 기준 위치가 `/business/` 로
> 옮겨져서, 그다음 누르는 카드가 `business/business/…` 로 이어지며 404가 납니다.
> (`assets/js/main.js` 4번 항목에도 같은 경고가 적혀 있습니다)

> ⚠️ **파일을 더블클릭해서 여는(`file://`) 경우**에는 브라우저 보안 정책 때문에
> 팝업이 내용을 못 읽어옵니다. 이때는 자동으로 상세 페이지로 이동하므로
> 내용이 사라지지는 않습니다. 팝업까지 확인하려면 **2번의 로컬 서버**를 쓰세요.

상세 페이지는 아래 조각들을 위에서 아래로 쌓은 구조입니다.
필요 없는 조각은 통째로 지워도 레이아웃이 깨지지 않습니다.

| 클래스 | 역할 |
| --- | --- |
| `.detail-hero` | 머리 — 번호·제목·요약·키워드(`.detail-tags`) |
| `.detail-section` | 본문 한 덩어리. `--soft` 를 붙이면 옅은 회색 배경 |
| `.detail-item` | 번호(01, 02 …)가 붙은 세부 항목 |
| `.detail-points` | 점 목록 |
| `.detail-lines` | 짧은 문장을 한 줄씩 강조 (왼쪽 세로선) |
| `.detail-flow` | 진행 순서 (신청 → 심사 → 계약 …) |
| `.detail-motto` | 영문 한 줄 표어. 한국어·일본어 문장이면 `detail-motto--text` 를 같이 붙이세요 |
| `.detail-note` | 등록번호 같은 사실 정보 상자 |
| `.detail-approach` | 마무리 — 네이비 배경 |
| `.detail-nav` | 맨 아래 이전/다음 사업 링크 |

> **사업을 새로 추가할 때 손봐야 하는 곳 (총 6군데)**
> 1. `business/새이름.html` 과 `ja/business/새이름.html` 을 만듭니다
>    (기존 파일을 복사해서 글만 바꾸는 것이 가장 안전합니다)
> 2. 두 메인 페이지의 카드(`business-grid`)
> 3. 두 메인 페이지의 헤더 드롭다운
> 4. 두 메인 페이지의 푸터 `BUSINESS` 목록
> 5. 상세 페이지 10장의 헤더 드롭다운·푸터 목록·이전/다음 링크
> 6. `sitemap.xml`
>
> 팝업은 따로 등록할 필요가 없습니다. 링크가 `business/…html` 형태이기만 하면
> 자동으로 팝업으로 열립니다.

디자인은 `assets/css/style.css` 의 두 곳에서 관리합니다.

- **"19. 사업 상세 페이지"** — 페이지와 팝업 양쪽에 공통으로 적용
- **"20. 사업 상세 팝업"** — 팝업 안에서만 달라지는 부분(여백 등)

팝업을 여닫는 동작은 `assets/js/main.js` 의 **"4. 사업 상세 팝업"** 한 곳에 있습니다.

---

## 4. ⚠️ 배포 전 반드시 처리할 것

체크리스트입니다. **1번과 2번은 법적 의무 사항**입니다.

- [x] ~~**1. 택지건물거래업 면허번호 입력**~~ ✅ 완료
      `宅地建物取引業免許 大阪府知事(2)第62361号`
      `宅地建物取引士 (大阪)第088239号 山中英樹`
      → `index.html` / `ja/index.html` 의 `info-bar` 와 푸터 `footer__license` 에 반영됨.
      담당 공인중개사가 바뀌면 푸터의 번호와 이름을 함께 갱신하세요.

- [x] ~~**2. 행정서사 회원번호 입력**~~ ✅ 완료
      `大阪行政書士会 会員番号008980`
      → 모든 페이지의 푸터 `footer__license` 와
        `business/legal.html` / `ja/business/legal.html` 의 `detail-note` 에 반영됨.

- [ ] **3. 법인번호(法人番号) 입력**  ← 번호 확보 후
      아직 넣지 않았습니다. (미입력 상태를 방문자에게 보이지 않기 위해 항목 자체를 뺀 상태)
      번호를 확보하면 각 페이지 푸터의 `footer__license` 에 한 줄씩 추가하세요.

      > 면허·등록 정보는 **메인 2장 + 상세 10장, 총 12곳**에 있습니다.
      > 한 곳만 고치면 값이 어긋나므로 반드시 전부 함께 갱신하세요.

- [~] **4. 도메인 주소 교체**  ← 임시 주소 적용 완료, 실제 도메인 구입 후 재교체
      현재는 Cloudflare Pages 기본 주소 `https://houber-site.w8st5tywbc.workers.dev` 가
      아래 파일들에 들어가 있습니다.
      - `index.html` / `ja/index.html` (canonical, hreflang, og:url)
      - `business/*.html` / `ja/business/*.html` (10장, 동일)
      - `robots.txt` (Sitemap 주소)
      - `sitemap.xml` (모든 `<loc>`, `<xhtml:link>`)

      실제 도메인을 구입하면 아래 한 줄로 전부 바꿉니다 (macOS).
      ```bash
      grep -rl "houber-site.w8st5tywbc.workers.dev" . --include="*.html" --include="*.xml" --include="*.txt" \
        | xargs sed -i '' 's|houber-site.w8st5tywbc.workers.dev|새도메인.com|g'
      ```
      > ⚠️ `property@aders-international.com` 은 **메일 주소**이므로 건드리면 안 됩니다.
      > 위 명령은 `pages.dev` 만 골라 바꾸므로 메일 주소는 그대로 남습니다.

- [x] ~~**5. 카카오톡 상담 링크 연결**~~ ✅ 완료
      카카오톡 채널 `https://pf.kakao.com/_qTEPj` 로 연결했습니다.
      (LINE 상담 버튼은 요청에 따라 제거)
      채널이 바뀌면 `index.html` / `ja/index.html` 의 `#contact` 섹션
      두 곳만 고치면 됩니다.

- [ ] **6. 개인정보처리방침 · 特定商取引法に基づく表記 페이지 작성**
      푸터 하단 링크가 `href="#"` 로 비어 있습니다.
      일본에서 사업을 하는 경우 특정상거래법 표기는 필수입니다.

- [ ] **7. 숫자 지표 근거 확인**
      "연간 계약자 1,200명+" 등의 수치가 실제와 맞는지 확인해 주세요.
      근거를 댈 수 없는 수치는 삭제하는 편이 안전합니다.

- [ ] **8. SNS 공유 이미지(og-image.jpg) 준비**
      1200 × 630 px. 준비되면 두 HTML 의 `og:image` 주석을 풀어주세요.

---

## 5. 배포 방법

**현재 배포처: Cloudflare Workers (정적 자산)**
**사이트 주소: https://houber-site.w8st5tywbc.workers.dev**
`main` 브랜치에 push 하면 1~2분 뒤 자동으로 사이트에 반영됩니다.
빌드 도구가 없으므로 빌드 명령어도, 출력 폴더 지정도 필요 없습니다.

### 처음 한 번만 하는 설정

1. [dash.cloudflare.com](https://dash.cloudflare.com) 가입 (무료)
2. 왼쪽 **Compute** → **Workers & Pages** → **Create**
3. **Import a repository** 로 `kidmildo/houber_site` 선택
4. 설정 화면:

   | 항목 | 값 |
   | --- | --- |
   | Project name | **`houber-site`** |
   | Build command | **(비워둠)** |
   | Deploy command | `npx wrangler deploy` (기본값 그대로) |

5. **Deploy** → 1~2분 뒤 주소가 발급됩니다

> Cloudflare가 대시보드를 개편하면서 `Pages` 대신 `Workers` 흐름으로 안내합니다.
> 둘 다 정적 사이트를 똑같이 서빙하며, 이 저장소는 `wrangler.jsonc` 설정으로
> **빌드 없이 폴더를 그대로 올리는** 방식을 씁니다.

### 그 뒤로는

```bash
git add -A
git commit -m "수정 내용"
git push
```

push 하면 Cloudflare가 알아서 다시 배포합니다. 따로 할 일이 없습니다.
배포 상황은 Cloudflare 대시보드의 **Deployments** 탭에서 볼 수 있습니다.

### 설정 파일 `_headers`

브라우저가 파일을 얼마나 오래 보관할지 정하는 파일입니다.
페이지(HTML)는 매번 새로 확인하고, 디자인·동작 파일은 1시간 보관합니다.
급하게 반영해야 할 때는 HTML의 `?v=` 값을 올리세요 (위 3-0 참고).

### 실제 도메인 연결 (나중에)

1. 도메인 구입 (Cloudflare Registrar, 가비아, 후이즈 등)
2. Cloudflare Pages 프로젝트 → **Custom domains** → **Set up a domain**
3. 안내대로 DNS 설정 → HTTPS는 자동 적용
4. **위 4번 체크리스트의 명령으로 코드 안 주소도 함께 교체**
5. [Google Search Console](https://search.google.com/search-console) 에 `sitemap.xml` 등록

### 다른 서비스를 쓰고 싶다면

정적 사이트라 어디에 올려도 동일하게 동작합니다.
Netlify는 `_headers` 파일을 그대로 인식하고, GitHub Pages는 저장소 Settings → Pages 에서
`main` / `/ (root)` 를 고르면 됩니다.
단 GitHub Pages는 `kidmildo.github.io/houber_site/` 처럼 하위 경로로 배포되므로,
`404.html` 안의 `/` 로 시작하는 링크를 함께 고쳐야 합니다.

## 6. 브라우저 지원

최신 Chrome / Safari / Edge / Firefox 및 iOS·Android 기본 브라우저에서 동작합니다.

- CSS `color-mix()` 를 사용합니다 (2023년 이후 브라우저).
  아주 오래된 브라우저에서는 사업 카드 아이콘 배경색만 옅게 표시되지 않을 수 있으나,
  레이아웃이 깨지지는 않습니다.
- JavaScript 가 꺼져 있어도 **모든 내용이 정상적으로 보입니다.**
  (등장 애니메이션만 생략되고, 모바일 메뉴 대신 페이지 내 이동을 사용)
