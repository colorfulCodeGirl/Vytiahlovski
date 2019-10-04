
(function handlingMenu() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menu = document.querySelector('.menu');
  // const main = document.querySelector('main');

  const trapTabKey = () => {
    const menuLinks = Array.from(menu.querySelectorAll('a'));
    const hideWhenMenuOpen = Array.from(document.querySelectorAll('main a, main button, footer a, footer button'));
    if (menu.getAttribute('aria-hidden') == 'true') {
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
        // block: 'center',
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

(function slideShow() {
  const mobileNav = document.querySelectorAll('.arrow-block');
  const desktopNav = document.querySelectorAll('.desctop.slideshow-button');
  let prevSlideInd = parseInt(document.querySelector('.slide-show .active').dataset.index);


  const handleDirection = (e) => {
    if (e.target.classList[0] === 'mobile') {
      return e.target.classList[2];
    } else {
      return (e.target.dataset.index > prevSlideInd) ? 'right' : 'left';
    }
  }

  const chooseNewInd = (direction) => {
    if (direction === "right") {
      const newInd = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
      return newInd;
    } else {
      const newInd = (prevSlideInd !== 0) ? (prevSlideInd - 1) : 6;
      return newInd;
    }
  }

  const rearangeIfLeftMove = (newSlide) => {
    newSlide.classList.add('transition-off', 'left-move');
    newSlide.classList.remove('transition-off');
  }

  const moveSlides = (prevSlide, newSlide, direction) => {
     if (direction === 'right') {
       prevSlide.classList.add('left-move');
      prevSlide.classList.remove('active');
      newSlide.classList.add('active');
      //return prewious slide in start position
      setTimeout(() => {
          prevSlide.classList.add('transition-off');
          prevSlide.classList.remove('left-move');
          setTimeout(() => prevSlide.classList.remove('transition-off'), 100);
      }, 800);
    } else {
      rearangeIfLeftMove(newSlide);
      prevSlide.classList.remove('active');
      newSlide.classList.add('active');
      newSlide.classList.remove('left-move');
    }
  }

  const handleDesctopNav = (newSlideInd) => {
    desktopNav[prevSlideInd].classList.remove('active');
    desktopNav[newSlideInd].classList.add('active');
  }

  const changeSlide = (e) => {
    const slides = document.querySelectorAll('.slide');
    const prevSlide = slides[prevSlideInd];
    const direction = handleDirection(e);
    const newSlideInd = chooseNewInd(direction)
    const newSlide = slides[newSlideInd];
    moveSlides(prevSlide, newSlide, direction);
    if (e.target.nodeName === 'A') {
      handleDesctopNav(e, newSlideInd);
    }
    prevSlideInd = parseInt(newSlide.dataset.index);
  }

  mobileNav.forEach(btn => btn.addEventListener('click', changeSlide));
  desktopNav.forEach(btn => btn.addEventListener('click', changeSlide));
  //setInterval(changeSlide, 3000);
})();
















// Fake scrollbar -TODO - import normally after gulp instalation 
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(window, document)
  } else {
    root.SimpleScrollbar = factory(window, document)
  }
})(this, function (w, d) {
  var raf = w.requestAnimationFrame || w.setImmediate || function (c) { return setTimeout(c, 0); };

  function initEl(el) {
    if (Object.prototype.hasOwnProperty.call(el, 'data-simple-scrollbar')) return;
    Object.defineProperty(el, 'data-simple-scrollbar', { value: new SimpleScrollbar(el) });
  }

  // Mouse drag handler
  function dragDealer(el, context) {
    var lastPageY;

    el.addEventListener('mousedown', function (e) {
      lastPageY = e.pageY;
      el.classList.add('ss-grabbed');
      d.body.classList.add('ss-grabbed');

      d.addEventListener('mousemove', drag);
      d.addEventListener('mouseup', stop);

      return false;
    });

    function drag(e) {
      var delta = e.pageY - lastPageY;
      lastPageY = e.pageY;

      raf(function () {
        context.el.scrollTop += delta / context.scrollRatio;
      });
    }

    function stop() {
      el.classList.remove('ss-grabbed');
      d.body.classList.remove('ss-grabbed');
      d.removeEventListener('mousemove', drag);
      d.removeEventListener('mouseup', stop);
    }
  }

  // Constructor
  function ss(el) {
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
      var totalHeight = this.el.scrollHeight,
        ownHeight = this.el.clientHeight,
        _this = this;

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

  function initAll() {
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