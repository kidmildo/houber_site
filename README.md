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
| "자세히 보기" 클릭 | 팝업이 열리고 주소창이 `business/…html` 로 바뀝니다 |
| `×` · 배경 클릭 · `ESC` · 뒤로가기 | 팝업이 닫힙니다 |
| 팝업 상태에서 새로고침 | 상세 페이지가 통째로 열립니다 (내용은 동일) |
| Cmd(Ctrl) + 클릭 | 새 탭에서 상세 페이지가 열립니다 |

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

- [ ] **4. 도메인 주소 교체**
      아래 파일들에 `https://www.aders-international.com` 이 들어 있습니다.
      실제 배포 주소가 다르면 전부 바꿔주세요.
      - `index.html` / `ja/index.html` (canonical, hreflang, og:url)
      - `business/*.html` / `ja/business/*.html` (10장, 동일)
      - `robots.txt` (Sitemap 주소)
      - `sitemap.xml` (모든 `<loc>`, `<xhtml:link>`)

      ```bash
      # 한 번에 바꾸는 예 (macOS)
      grep -rl "www.aders-international.com" . --include="*.html" --include="*.xml" --include="*.txt" \
        | xargs sed -i '' 's|www.aders-international.com|새주소.com|g'
      ```

- [ ] **5. 카카오톡 · LINE 상담 링크 연결**
      현재 `href="#"` 로 비어 있습니다. (메인 페이지 `#contact` 섹션)

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

정적 사이트라서 아래 어디에 올려도 동일하게 동작합니다.
**사이트가 저장소 루트에 있으므로, 빌드 명령어도 폴더 지정도 필요 없습니다.**

사이트는 기본 브랜치인 `main` 에 있습니다.

### GitHub Pages (가장 간단 — 별도 가입 불필요)

1. 저장소 Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **`main`** + 폴더는 **`/ (root)`**
4. Save → 1~2분 뒤 `https://kidmildo.github.io/houber_site/` 에서 확인

> ⚠️ GitHub Pages 는 하위 경로(`/houber_site/`)로 배포됩니다.
> 이 경우 `404.html` 안의 `/` 로 시작하는 링크가 저장소 밖(`kidmildo.github.io/`)을
> 가리키게 되므로, 실제 도메인을 연결하거나 아래 Cloudflare Pages 를 쓰는 편이 좋습니다.

### Cloudflare Pages (추천 — 일본/한국 양쪽 속도가 안정적)

1. Cloudflare 대시보드 → Workers & Pages → Create → Pages
2. GitHub 저장소 연결
3. 설정:
   - Build command: **(비워둠)**
   - Build output directory: **(비워둠 = 루트)**
4. Deploy

### Netlify

1. netlify.com → Add new site → Import an existing project
2. 설정:
   - Build command: **(비워둠)**
   - Publish directory: **(비워둠 = 루트)**

> 폴더를 통째로 netlify.com/drop 에 끌어다 놓기만 해도 바로 배포됩니다.

### Vercel

1. vercel.com → Add New → Project
2. Framework Preset: **Other**
3. Root Directory: **(기본값 그대로)**

### 도메인 연결 후

- 배포 주소가 정해지면 **위 4번 체크리스트의 "도메인 주소 교체"** 를 잊지 마세요.
- Google Search Console 에 `sitemap.xml` 을 등록하면 검색 노출이 빨라집니다.
- HTTPS 는 위 서비스 모두 무료로 자동 적용됩니다.

---

## 6. 브라우저 지원

최신 Chrome / Safari / Edge / Firefox 및 iOS·Android 기본 브라우저에서 동작합니다.

- CSS `color-mix()` 를 사용합니다 (2023년 이후 브라우저).
  아주 오래된 브라우저에서는 사업 카드 아이콘 배경색만 옅게 표시되지 않을 수 있으나,
  레이아웃이 깨지지는 않습니다.
- JavaScript 가 꺼져 있어도 **모든 내용이 정상적으로 보입니다.**
  (등장 애니메이션만 생략되고, 모바일 메뉴 대신 페이지 내 이동을 사용)
