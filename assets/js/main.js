/* ==========================================================================
   ADERS INTERNATIONAL — 공통 스크립트
   --------------------------------------------------------------------------
   한국어(index.html)와 일본어(ja/index.html)가 이 파일 하나를 함께 사용합니다.

   담당하는 기능은 세 가지뿐입니다.
     1) 스크롤을 내리면 헤더 배경을 불투명하게 바꾸기
     2) 모바일 햄버거 메뉴 열기/닫기
     3) 화면에 들어온 요소를 스르륵 나타나게 하기

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

})();
