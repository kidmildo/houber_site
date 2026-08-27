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
├── ja/
│   └── index.html          ← 일본어 메인 페이지
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

---

## 4. ⚠️ 배포 전 반드시 처리할 것

체크리스트입니다. **1번과 2번은 법적 의무 사항**입니다.

- [x] ~~**1. 택지건물거래업 면허번호 입력**~~ ✅ 완료
      `宅地建物取引業免許 大阪府知事(2)第62361号`
      `宅地建物取引士 (大阪)第088239号 山中英樹`
      → `index.html` / `ja/index.html` 의 `info-bar` 와 푸터 `footer__license` 에 반영됨.
      담당 공인중개사가 바뀌면 푸터의 번호와 이름을 함께 갱신하세요.

- [ ] **2. 행정서사 등록번호 · 법인번호 입력**  ← 아직 남음
      `index.html` / `ja/index.html` 두 곳씩 총 4곳입니다.
      입력 후 `class="info-bar__value is-todo"` 에서 ` is-todo` 를 지우면
      빨간색 경고 표시가 사라집니다. 푸터에서는 `<em>` 태그를 지우세요.

- [ ] **3. 도메인 주소 교체**
      아래 4개 파일에 `https://www.aders-international.com` 이 들어 있습니다.
      실제 배포 주소가 다르면 전부 바꿔주세요.
      - `index.html` (canonical, hreflang, og:url)
      - `ja/index.html` (동일)
      - `robots.txt` (Sitemap 주소)
      - `sitemap.xml` (모든 `<loc>`, `<xhtml:link>`)

- [ ] **4. 카카오톡 · LINE 상담 링크 연결**
      현재 `href="#"` 로 비어 있습니다. (`#contact` 섹션)

- [ ] **5. 개인정보처리방침 · 特定商取引法に基づく表記 페이지 작성**
      푸터 하단 링크가 `href="#"` 로 비어 있습니다.
      일본에서 사업을 하는 경우 특정상거래법 표기는 필수입니다.

- [ ] **6. 숫자 지표 근거 확인**
      "연간 계약자 1,200명+" 등의 수치가 실제와 맞는지 확인해 주세요.
      근거를 댈 수 없는 수치는 삭제하는 편이 안전합니다.

- [ ] **7. SNS 공유 이미지(og-image.jpg) 준비**
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
