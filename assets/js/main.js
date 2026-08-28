/* ==========================================================================
   ADERS INTERNATIONAL — 공통 스크립트
   --------------------------------------------------------------------------
   한국어(index.html)와 일본어(ja/index.html)가 이 파일 하나를 함께 사용합니다.

   담당하는 기능은 네 가지입니다.
     1) 스크롤을 내리면 헤더 배경을 불투명하게 바꾸기
     2) 모바일 햄버거 메뉴 열기/닫기
     3) 화면에 들어온 요소를 스르륵 나타나게 하기
     4) 사업 "자세히 보기" 팝업(모달) 열기/닫기

   ※ 이 파일은 <script defer> 로 불러오므로
      HTML이 모두 읽힌 뒤에 실행됩니다. (DOMContentLoaded 대기 불필요)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. 헤더 — 스크롤하면 배경 생기기
     ------------------------------------------------------------------
     60px 이상 내려가면 .is-scrolled 클래스를 붙입니다.
     실제 배경색·그림자는 CSS(06번 항목)에서 정의합니다.
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var SCROLL_THRESHOLD = 60; // 헤더가 바뀌기 시작하는 스크롤 위치(px)

  if (header) {
    // passive: true → 스크롤 성능 향상 (브라우저가 스크롤을 먼저 처리하도록 허용)
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    }, { passive: true });
  }


  /* ------------------------------------------------------------------
     2. 모바일 메뉴
     ------------------------------------------------------------------
     햄버거 버튼을 누르면 전체 화면 메뉴가 펼쳐집니다.
     닫히는 경우는 세 가지입니다.
       · 햄버거 버튼을 다시 누를 때
       · 메뉴 안의 링크를 눌렀을 때
       · ESC 키를 눌렀을 때
     ------------------------------------------------------------------ */
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {

    /**
     * 메뉴를 열거나 닫습니다.
     * @param {boolean} shouldOpen  true면 열기, false면 닫기
     */
    function setMenu(shouldOpen) {
      mobileMenu.classList.toggle('is-open', shouldOpen);
      menuToggle.classList.toggle('is-open', shouldOpen);

      // 스크린리더에게 현재 상태를 알려줍니다. (접근성)
      menuToggle.setAttribute('aria-expanded', String(shouldOpen));

      // 헤더 로고가 어두운 메뉴 배경 위에 겹치므로,
      // 메뉴가 열린 동안에는 로고 글자를 흰색으로 바꿉니다. (CSS 07번 항목)
      document.body.classList.toggle('is-menu-open', shouldOpen);

      // 메뉴가 열린 동안에는 뒤쪽 본문이 스크롤되지 않도록 잠급니다.
      document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }

    // 햄버거 버튼 클릭 → 현재 상태를 뒤집기
    menuToggle.addEventListener('click', function () {
      setMenu(!mobileMenu.classList.contains('is-open'));
    });

    // 메뉴 안의 링크를 누르면 자동으로 닫기
    // (같은 페이지 안 앵커 이동이라 페이지가 새로 로드되지 않기 때문에 필요합니다)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus(); // 포커스를 햄버거 버튼으로 되돌려 줍니다
      }
    });

    // 창을 넓히면(모바일 → PC) 열려 있던 메뉴를 정리합니다.
    // 그대로 두면 PC 화면에서 body 스크롤이 잠긴 채로 남을 수 있습니다.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760 && mobileMenu.classList.contains('is-open')) {
        setMenu(false);
      }
    });
  }


  /* ------------------------------------------------------------------
     3. 스크롤 등장 애니메이션
     ------------------------------------------------------------------
     .reveal 클래스가 붙은 요소가 화면에 12% 이상 보이면
     .is-visible 을 붙여 나타나게 합니다.
     한 번 나타난 요소는 다시 감시하지 않습니다(unobserve).
     ------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll('.reveal');

  // 사용자가 "동작 줄이기"를 켜 두었다면 애니메이션 없이 즉시 표시합니다.
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // 구형 브라우저이거나 모션을 원치 않는 경우 → 전부 바로 보이게
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 한 번만 실행
        }
      });
    }, {
      threshold: 0.12 // 요소가 12% 보이면 실행
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------------
     4. 사업 상세 팝업 (모달)
     ------------------------------------------------------------------
     동작 방식

       카드의 "자세히 보기"는 원래 business/houber.html 로 가는 평범한 링크입니다.
       여기서 그 클릭을 가로채, 페이지를 이동하는 대신
       그 파일의 본문(<article id="biz-detail">)만 읽어와 팝업으로 보여줍니다.

     이렇게 만든 이유
       · 글이 한 곳(business/*.html)에만 있어서 고칠 곳이 하나입니다.
       · JavaScript가 꺼져 있거나 파일을 못 읽어도
         링크 그대로 상세 페이지가 열리므로 내용이 사라지지 않습니다.
       · 주소창도 함께 바뀌므로 뒤로가기로 팝업을 닫을 수 있습니다.

     새 사업을 추가해도 링크가 business/…html 형태이면
     자동으로 팝업이 적용됩니다. 따로 등록할 필요가 없습니다.
     ------------------------------------------------------------------ */
  var modal = document.getElementById('biz-modal');

  if (modal) {
    var modalBody   = document.getElementById('biz-modal-body');
    var modalFull   = document.getElementById('biz-modal-full');   // "전체 페이지로 보기" 링크
    var modalPanel  = modal.querySelector('.modal__panel');
    var modalClose  = modal.querySelector('.modal__close');
    var loadingText = modalBody ? modalBody.innerHTML : '';        // 처음 들어 있던 "불러오는 중" 문구

    var cache     = {};      // 한 번 읽은 페이지는 다시 읽지 않도록 보관
    var lastFocus = null;    // 팝업을 연 버튼 (닫을 때 여기로 초점을 되돌립니다)
    var pushedUrl = false;   // 주소를 바꿨는지 여부 (뒤로가기 처리에 필요)

    /**
     * 팝업을 엽니다.
     * @param {string} url  상세 페이지 주소 (예: business/houber.html)
     */
    function openModal(url) {
      lastFocus = document.activeElement;

      modal.hidden = false;
      document.body.classList.add('is-modal-open');
      document.body.style.overflow = 'hidden';   // 뒤쪽 본문 스크롤 잠금
      modalPanel.scrollTop = 0;

      if (modalFull)  { modalFull.setAttribute('href', url); }
      if (modalClose) { modalClose.focus(); }

      // 주소창을 상세 페이지 주소로 바꿔둡니다.
      // → 뒤로가기를 누르면 팝업이 닫히고, 새로고침하면 상세 페이지가 그대로 열립니다.
      try {
        history.pushState({ bizModal: url }, '', url);
        pushedUrl = true;
      } catch (e) {
        pushedUrl = false;   // 아주 오래된 브라우저 — 주소는 그대로 두고 팝업만 씁니다
      }

      loadInto(url);
    }

    /**
     * 팝업을 닫습니다.
     * @param {boolean} goBack  주소도 원래대로 되돌릴지 여부
     *                          (뒤로가기로 닫힌 경우에는 이미 되돌아왔으므로 false)
     */
    function closeModal(goBack) {
      modal.hidden = true;
      document.body.classList.remove('is-modal-open');
      document.body.style.overflow = '';

      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }

      if (goBack && pushedUrl) {
        pushedUrl = false;
        history.back();
      }
    }

    /** 팝업 안의 등장 애니메이션 요소를 바로 보이게 합니다. */
    function revealAll(scope) {
      var items = scope.querySelectorAll('.reveal');
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add('is-visible');
      });
    }

    /** 상세 페이지를 읽어와 팝업 안에 넣습니다. */
    function loadInto(url) {
      if (cache[url]) {
        modalBody.innerHTML = cache[url];
        revealAll(modalBody);
        return;
      }

      modalBody.innerHTML = loadingText;

      fetch(url)
        .then(function (res) {
          if (!res.ok) { throw new Error(res.status); }
          return res.text();
        })
        .then(function (html) {
          // 받아온 HTML에서 본문(article#biz-detail)만 골라냅니다.
          var doc  = new DOMParser().parseFromString(html, 'text/html');
          var part = doc.getElementById('biz-detail');
          if (!part) { throw new Error('본문을 찾지 못했습니다'); }

          // 팝업 안에서는 "현재 위치(HOME / 사업내용 / …)" 표시가 필요 없습니다.
          var crumb = part.querySelector('.breadcrumb');
          if (crumb) { crumb.parentNode.removeChild(crumb); }

          cache[url] = part.innerHTML;
          modalBody.innerHTML = cache[url];
          revealAll(modalBody);
        })
        .catch(function () {
          // 읽지 못했다면(예: 파일을 브라우저로 직접 연 경우)
          // 팝업을 접고 원래대로 상세 페이지로 이동합니다.
          closeModal(false);
          window.location.href = url;
        });
    }

    // --- 클릭 가로채기 ---------------------------------------------------
    // business/ 폴더의 .html 로 가는 링크는 모두 팝업으로 엽니다.
    document.addEventListener('click', function (event) {
      if (!event.target.closest) { return; }
      var link = event.target.closest('a[href*="business/"][href$=".html"]');
      if (!link) { return; }

      // 새 탭으로 열려는 경우(Cmd/Ctrl/Shift)는 브라우저에 맡깁니다.
      if (event.metaKey || event.ctrlKey || event.shiftKey) { return; }
      if (link.target === '_blank') { return; }

      // fetch 를 못 쓰는 환경이면 평범한 링크로 동작하게 둡니다.
      if (!window.fetch || !window.DOMParser) { return; }

      event.preventDefault();
      openModal(link.getAttribute('href'));
    });

    // --- 닫기 ------------------------------------------------------------
    // 배경, 닫기 버튼, 팝업 안의 "문의하기" 버튼에 data-modal-close 가 붙어 있습니다.
    modal.addEventListener('click', function (event) {
      if (event.target.closest && event.target.closest('[data-modal-close]')) {
        closeModal(true);
      }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) { closeModal(true); }
    });

    // 브라우저 뒤로가기로 닫기
    window.addEventListener('popstate', function () {
      if (!modal.hidden) {
        pushedUrl = false;   // 주소는 이미 되돌아왔으므로 history.back() 을 부르지 않습니다
        closeModal(false);
      }
    });
  }

})();
