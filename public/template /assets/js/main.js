/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Case Study Modal System
   */
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseModalClose = document.querySelector('.case-study-modal-close');
  const caseModalOverlay = document.querySelector('.case-study-modal-overlay');

  // Support optional <img> modal image (preferred) while keeping SVG fallback
  const caseModalImageImg = document.getElementById('caseModalImageImg');
  const caseModalImageSvg = document.getElementById('caseModalImage');

  // SVG icon generators for different case study types
  const iconGenerators = {
    flower: () => `
      <circle cx="300" cy="120" r="50" fill="#fff" opacity="0.9"/>
      <path d="M 300 200 Q 270 240 280 300 Q 300 250 320 300 Q 330 240 300 200" fill="#fff" opacity="0.8"/>
    `,
    it: () => `
      <rect x="200" y="80" width="200" height="120" fill="#fff" opacity="0.9" rx="8"/>
      <rect x="170" y="220" width="260" height="80" fill="#fff" opacity="0.8" rx="6"/>
    `,
    global: () => `
      <circle cx="180" cy="120" r="50" fill="#fff" opacity="0.9"/>
      <circle cx="420" cy="120" r="50" fill="#fff" opacity="0.9"/>
      <path d="M 180 200 L 420 200 L 420 300 L 180 300 Z" fill="#fff" opacity="0.8"/>
    `,
    logistics: () => `
      <rect x="150" y="60" width="300" height="200" fill="#fff" opacity="0.9" rx="12"/>
      <rect x="180" y="90" width="50" height="80" fill="rgba(0,0,0,0.1)" rx="6"/>
      <rect x="260" y="90" width="50" height="80" fill="rgba(0,0,0,0.1)" rx="6"/>
      <rect x="340" y="90" width="50" height="80" fill="rgba(0,0,0,0.1)" rx="6"/>
    `,
    shipping: () => `
      <path d="M 300 80 L 380 140 L 380 200 L 220 200 L 220 140 Z" fill="#fff" opacity="0.9"/>
      <circle cx="250" cy="240" r="15" fill="#fff" opacity="0.8"/>
      <circle cx="350" cy="240" r="15" fill="#fff" opacity="0.8"/>
    `,
    events: () => `
      <rect x="100" y="60" width="80" height="100" fill="#fff" opacity="0.9" rx="4"/>
      <rect x="220" y="60" width="80" height="100" fill="#fff" opacity="0.8" rx="4"/>
      <rect x="140" y="180" width="120" height="70" fill="#fff" opacity="0.85" rx="4"/>
    `,
    hospitality: () => `
      <circle cx="300" cy="100" r="50" fill="#fff" opacity="0.9"/>
      <path d="M 250 160 L 350 160 L 340 220 L 260 220 Z" fill="#fff" opacity="0.8"/>
    `,
    professional: () => `
      <circle cx="140" cy="110" r="35" fill="#fff" opacity="0.9"/>
      <circle cx="260" cy="110" r="35" fill="#fff" opacity="0.9"/>
      <rect x="120" y="170" width="160" height="80" fill="#fff" opacity="0.8" rx="8"/>
    `,
    fintech: () => `
      <circle cx="300" cy="100" r="40" fill="#fff" opacity="0.9"/>
      <path d="M 260 160 L 340 160 L 335 200 L 265 200 Z" fill="#fff" opacity="0.8"/>
      <rect x="270" y="210" width="60" height="30" fill="#fff" opacity="0.85" rx="4"/>
    `,
    distribution: () => `
      <path d="M 100 150 Q 300 80 500 150 Q 450 200 300 210 Q 150 200 100 150" fill="#fff" opacity="0.9"/>
      <circle cx="300" cy="170" r="15" fill="#fff" opacity="0.8"/>
      <rect x="80" y="220" width="440" height="40" fill="#fff" opacity="0.85" rx="4"/>
    `
  };
  
  function openCaseStudy(caseId, imageUrl) {
    const caseElement = document.getElementById(`case-${caseId}`);
    if (!caseElement) return;

    const grad1 = caseElement.getAttribute('data-gradient1');
    const grad2 = caseElement.getAttribute('data-gradient2');
    const title = caseElement.querySelector('h2')?.textContent || '';
    const body = caseElement.innerHTML;

    // Set modal content
    document.getElementById('caseModalTitle').textContent = title;
    const modalBodyEl = document.getElementById('caseModalBody');
    modalBodyEl.innerHTML = body;

    // Remove duplicated title from body (the modal already shows it in #caseModalTitle)
    const firstH2 = modalBodyEl.querySelector('h2');
    if (firstH2) firstH2.remove();

    // Prefer <img> if provided
    if (caseModalImageImg && imageUrl) {
      caseModalImageImg.src = imageUrl;
      caseModalImageImg.alt = title;
      caseModalImageImg.style.display = '';
      if (caseModalImageSvg) caseModalImageSvg.style.display = 'none';
    } else if (caseModalImageSvg) {
      if (caseModalImageImg) {
        caseModalImageImg.removeAttribute('src');
        caseModalImageImg.style.display = 'none';
      }
      caseModalImageSvg.style.display = '';

      // Determine which icon to use (default to professional)
      const iconType = {
        'jj-flowers': 'flower',
        'teisoft': 'it',
        'saigon-tech': 'global',
        'mbe': 'logistics',
        'shiponadime': 'shipping',
        'innova': 'events',
        'taverna': 'hospitality',
        'smb-au': 'professional',
        'cashela': 'fintech',
        'idi': 'distribution'
      }[caseId] || 'professional';

      caseModalImageSvg.innerHTML = `
        <defs>
          <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${grad1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${grad2};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#caseGrad)"/>
        ${iconGenerators[iconType]()}
        <text x="300" y="380" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">${title.split('—')[0].trim()}</text>
      `;
    }

    // Show modal
    caseStudyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function closeCaseStudy() {
    caseStudyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Open case study handlers
  document.querySelectorAll('.open-case-study').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = link.getAttribute('data-case');
      const imageUrl = link.getAttribute('data-image') || undefined;
      openCaseStudy(caseId, imageUrl);
    });
  });
  
  // Deep-link support: index.html?case=<id>#portfolio
  window.addEventListener('load', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const caseId = params.get('case');
      if (!caseId) return;

      // If there is a matching card with data-image, use it
      const trigger = document.querySelector(`.open-case-study[data-case="${caseId}"]`);
      const imageUrl = trigger?.getAttribute('data-image') || undefined;

      // Wait a tick for layout scripts / images
      setTimeout(() => openCaseStudy(caseId, imageUrl), 150);
    } catch {
      // ignore
    }
  });
  
  // Close modal handlers
  caseModalClose.addEventListener('click', closeCaseStudy);
  caseModalOverlay.addEventListener('click', closeCaseStudy);
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal.style.display === 'flex') {
      closeCaseStudy();
    }
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();