/* eslint-disable semi */

(function handlingMenu () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menu = document.querySelector('.menu');
  // const main = document.querySelector('main');

  const trapTabKey = () => {
    const menuLinks = Array.from(menu.querySelectorAll('a'));
    const hideWhenMenuOpen = Array.from(document.querySelectorAll('main a, main button, footer a, footer button'));
    if (menu.getAttribute('aria-hidden') === 'true') {
      hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', -1));
      menu.setAttribute('aria-hidden', 'false');
      menuLinks.forEach(elem => elem.setAttribute('tabindex', 0));
    } else {
      hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', 0));
      menu.setAttribute('aria-hidden', 'true');
      menuLinks.forEach(elem => elem.setAttribute('tabindex', -1));
    }
  };

  const scrollToSection = (e, targetedSectionId) => {
    if (e.target.className === 'menu') {
      const scrollTarget = document.querySelector(`#${targetedSectionId}`);
      scrollTarget.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const openCloseMenu = (e) => {
    e.preventDefault();
    hamburgerMenu.classList.toggle('close');
    menu.classList.toggle('active');
    trapTabKey();

    const targetedSectionId = e.target.classList[1];
    if (e.target.className.includes('nav-elem')) {
      menu.addEventListener('transitionend', (e) => {
        scrollToSection(e, targetedSectionId);
      });
    }
  };

  menu.addEventListener('click', openCloseMenu);
  hamburgerMenu.addEventListener('click', openCloseMenu);
})();

(function slideShow () {
  const mobileNav = document.querySelectorAll('.arrow-block');
  const desktopNav = document.querySelectorAll('.desktop.slideshow-button');
  let prevSlideInd = parseInt(document.querySelector('.slide-show .active').dataset.index);
  const displayType = window.matchMedia('(min-width: 825px) and (pointer: fine)');
  const slides = document.querySelectorAll('.slide');
  let userClickedAt = 0;

  /* ----------Mobile version----------- */
  const handleDirection = (e) => {
    if (e.target.classList[0] === 'mobile') {
      return e.target.classList[2];
    } else {
      return (e.target.dataset.index > prevSlideInd) ? 'right' : 'left';
    }
  }

  const chooseNewIndex = (direction) => {
    if (direction === 'right') {
      const newInd = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
      return newInd;
    } else {
      const newInd = (prevSlideInd !== 0) ? (prevSlideInd - 1) : 6;
      return newInd;
    }
  }

  const prepareSlides = (newSlideInd, slides) => {
    const nextFromRightInd = (newSlideInd + 1) > 6 ? 0 : (newSlideInd + 1);
    const nextFromLeftInd = (newSlideInd - 1) < 0 ? 6 : (newSlideInd - 1);
    const nextFromRight = slides[nextFromRightInd];
    const nextFromLeft = slides[nextFromLeftInd];

    // if next right slide is from the left - move it to right
    if (nextFromRight.classList[1] === 'left-move') {
      nextFromRight.classList.add('transition-off');
      nextFromRight.classList.remove('left-move');
    }
    // if next left slide is from the right - move it to left
    if (nextFromLeft.classList[1] !== 'left-move') {
      nextFromLeft.classList.add('transition-off');
      nextFromLeft.classList.add('left-move');
    }

    setTimeout(() => {
      nextFromRight.classList.remove('transition-off');
      nextFromLeft.classList.remove('transition-off');
    }, 1000);
  }

  /* ---------------Common for bouth ----------------- */
  const moveSlides = (prevSlide, newSlide, direction) => {
    if (direction === 'right') {
      prevSlide.classList.add('left-move');
      prevSlide.classList.remove('active');
      newSlide.classList.add('active');
    } else {
      prevSlide.classList.remove('active');
      newSlide.classList.add('active');
      newSlide.classList.remove('left-move');
    }
  }

  /* ---------------Main Mobile function------------- */
  const changeSlideMobile = (e) => {
    const prevSlide = slides[prevSlideInd];
    const direction = handleDirection(e);
    const newSlideInd = chooseNewIndex(direction);
    const newSlide = slides[newSlideInd];
    moveSlides(prevSlide, newSlide, direction);
    prepareSlides(newSlideInd, slides);
    prevSlideInd = parseInt(newSlide.dataset.index);
    userClickedAt = new Date().getTime();
  }

  /* ------------------Desktop version--------------------- */
  const handleDesktopNav = (newIndex) => {
    desktopNav[prevSlideInd].classList.remove('active');
    desktopNav[newIndex].classList.add('active');
  }

  const prepareSlidesDesktop = (prevSlide) => {
    prevSlide.classList.add('transition-off');
    prevSlide.classList.remove('left-move');
    setTimeout(() => prevSlide.classList.remove('transition-off'), 100);
  }

  /* ------------------Main Desktop function--------------- */
  const changeSlideDesktop = (e) => {
    const prevSlide = slides[prevSlideInd];
    const newIndex = parseInt(e.target.dataset.index);
    const newSlide = slides[newIndex];
    handleDesktopNav(newIndex);
    moveSlides(prevSlide, newSlide, 'right');
    setTimeout(() => prepareSlidesDesktop(prevSlide), 2000);
    prevSlideInd = newIndex;
    userClickedAt = new Date().getTime();
  }

  /* ----------------Setting EventListeners----------------- */
  if (!displayType.matches) {
    mobileNav.forEach(btn => btn.addEventListener('click', changeSlideMobile));
  } else {
    // remove class preparation for mobile slide show
    prepareSlidesDesktop(slides[slides.length - 1]);
    desktopNav.forEach(btn => btn.addEventListener('click', changeSlideDesktop));
  }

  /* ------------------Automated slideshow-------------- */
  const changeSlideAutomated = () => {
    const prevSlide = slides[prevSlideInd];
    const currentTime = new Date().getTime();
    const timePassed = currentTime - userClickedAt;
    if (timePassed >= 4000) {
      const newIndex = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
      const newSlide = slides[newIndex];
      if (newIndex === (slides.length - 2) && !displayType.matches) {
        prepareSlidesDesktop(slides[slides.length - 1]);
      }
      moveSlides(prevSlide, newSlide, 'right');
      // if we are on desktop handle navigation animation
      if (displayType.matches) {
        handleDesktopNav(newIndex);
        setTimeout(() => prepareSlidesDesktop(prevSlide), 2000);
      } else {
        prepareSlides(newIndex, slides);
      }
      prevSlideInd = newIndex;
    }
  }

  const autoChange = setInterval(changeSlideAutomated, 4000);

  //   //if slideshow is out of the viewport - stop autoChange
  //   const checkOptions = { threshold: 1.0 };
  //   function checkIfSlideIsVisible(entries, observer) {
  // entries.forEach(entry => console.log(entry));

  //     // if (!) {
  //     //   clearInterval(autoChange);
  //     // }
  //   }
  //   const observer = new IntersectionObserver(checkIfSlideIsVisible, checkOptions);
  //   const target = document.querySelector('#main-header');
  //   observer.observe(target);
})();

(function openMenuFormMobile () {
  if (window.innerWidth < 600) {
    const btn = document.querySelector('.button.email-mobile');
    const emailForm = document.querySelector('.email');
    const overlay = document.querySelector('.form-overlay');
    const header = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.email .close');
    const submitBtn = document.querySelector('.email .submit');

    const openCloseForm = (e) => {
      const isHamburger = e.target.className.includes('hamburger');

      if (isHamburger &&
        emailForm.classList.length === 1) return;

      emailForm.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    btn.addEventListener('click', openCloseForm);
    header.addEventListener('click', openCloseForm);
    closeBtn.addEventListener('click', openCloseForm);
    submitBtn.addEventListener('click', openCloseForm);
  }
})();

(function addContentOnWideScreen () {
  if (window.innerWidth < 400) return;

  const shortText = document.querySelectorAll('.short-text');
  const fullText = document.querySelectorAll('.full-text');
  const buttons = document.querySelectorAll('.short-text .button-wrapper');

  const appendP = () => {
    let parentPrev;
    let parentNew;
    for (let i = 0; i < shortText.length; i++) {
      if (i >= 2) {
        parentPrev = fullText[i].children[0];
        const children = Array.from(parentPrev.children).slice(0, 3);
        parentNew = shortText[i].children[1];
        children.forEach(child => parentNew.appendChild(child));
      } else {
        parentPrev = fullText[i];
        const child = Array.from(parentPrev.children).shift();
        parentNew = shortText[i];
        const place = buttons[i];
        parentNew.insertBefore(child, place);
      }
    }
  }
  if (window.innerWidth > 400) {
    appendP();
  }
  if (window.innerWidth > 650) {
    appendP();
  }
})();

(function showWholeContent () {
  const buttons = document.querySelectorAll('.biography button, .achievements .button');

  const showMore = (e) => {
    const section = e.target.classList[1];
    const person = e.target.classList[2];
    const fullText = document.querySelector(`.${section} .${person} .full-text`);
    const fullTextClasses = Array.from(fullText.classList);
    const currentButton = e.target;
    const isActive = fullTextClasses.find(el => el === 'active');
    if (isActive) {
      currentButton.innerHTML = 'more...';
      currentButton.setAttribute('aria-label', 'Whole Tetniana\'s biography');
    } else {
      currentButton.innerHTML = 'less...';
      currentButton.setAttribute('aria-label', 'Hide whole Tetniana\'s biography');
    }
    fullText.classList.toggle('active');
  }

  buttons.forEach(btn => btn.addEventListener('click', showMore));
})();

// Fake scrollbar -TODO - import normally after gulp installation.
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(window, document)
  } else {
    root.SimpleScrollbar = factory(window, document)
  }
})(this, function (w, d) {
  var raf = w.requestAnimationFrame || w.setImmediate || function (c) { return setTimeout(c, 0); };

  function initEl (el) {
    if (Object.prototype.hasOwnProperty.call(el, 'data-simple-scrollbar')) return;
    Object.defineProperty(el, 'data-simple-scrollbar', { value: new SimpleScrollbar(el) });
  }

  // Mouse drag handler
  function dragDealer (el, context) {
    var lastPageY;

    el.addEventListener('mousedown', function (e) {
      lastPageY = e.pageY;
      el.classList.add('ss-grabbed');
      d.body.classList.add('ss-grabbed');

      d.addEventListener('mousemove', drag);
      d.addEventListener('mouseup', stop);

      return false;
    });

    function drag (e) {
      var delta = e.pageY - lastPageY;
      lastPageY = e.pageY;

      raf(function () {
        context.el.scrollTop += delta / context.scrollRatio;
      });
    }

    function stop () {
      el.classList.remove('ss-grabbed');
      d.body.classList.remove('ss-grabbed');
      d.removeEventListener('mousemove', drag);
      d.removeEventListener('mouseup', stop);
    }
  }

  // Constructor
  function ss (el) {
    this.target = el;

    this.direction = w.getComputedStyle(this.target).direction;

    this.bar = '<div class="ss-scroll">';

    this.wrapper = d.createElement('div');
    this.wrapper.setAttribute('class', 'ss-wrapper');

    this.el = d.createElement('div');
    this.el.setAttribute('class', 'ss-content');

    if (this.direction === 'rtl') {
      this.el.classList.add('rtl');
    }

    this.wrapper.appendChild(this.el);

    while (this.target.firstChild) {
      this.el.appendChild(this.target.firstChild);
    }
    this.target.appendChild(this.wrapper);

    this.target.insertAdjacentHTML('beforeend', this.bar);
    this.bar = this.target.lastChild;

    dragDealer(this.bar, this);
    this.moveBar();

    w.addEventListener('resize', this.moveBar.bind(this));
    this.el.addEventListener('scroll', this.moveBar.bind(this));
    this.el.addEventListener('mouseenter', this.moveBar.bind(this));

    this.target.classList.add('ss-container');

    var css = w.getComputedStyle(el);
    if (css['height'] === '0px' && css['max-height'] !== '0px') {
      el.style.height = css['max-height'];
    }
  }

  ss.prototype = {
    moveBar: function (e) {
      var totalHeight = this.el.scrollHeight;
      var ownHeight = this.el.clientHeight;
      var _this = this;

      this.scrollRatio = ownHeight / totalHeight;

      var isRtl = _this.direction === 'rtl';
      var right = isRtl ?
        (_this.target.clientWidth - _this.bar.clientWidth + 18) :
        (_this.target.clientWidth - _this.bar.clientWidth) * -1;

      raf(function () {
        // Hide scrollbar if no scrolling is possible
        if (_this.scrollRatio >= 1) {
          _this.bar.classList.add('ss-hidden')
        } else {
          _this.bar.classList.remove('ss-hidden')
          _this.bar.style.cssText = 'height:' + Math.max(_this.scrollRatio * 100, 10) + '%; top:' + (_this.el.scrollTop / totalHeight) * 100 + '%;right:' + right + 'px;';
        }
      });
    }
  }

  function initAll () {
    var nodes = d.querySelectorAll('*[ss-container]');

    for (var i = 0; i < nodes.length; i++) {
      initEl(nodes[i]);
    }
  }

  d.addEventListener('DOMContentLoaded', initAll);
  ss.initEl = initEl;
  ss.initAll = initAll;

  var SimpleScrollbar = ss;
  return SimpleScrollbar;
});
