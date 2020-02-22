import fetchFullImage from '../../UI/fetchFullImage';

const resizeSlideShowFrame = () => {
  const slideFame = document.querySelector('.slideshow__frame');
  slideFame.style.height = `${window.innerHeight * 0.925}px`;
};

const getSlideDimensions = () => {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;
  let height = '';
  let width = '';
  if (isPortrait) {
    height = window.innerHeight;
  } else {
    width = window.innerWidth;
  }
  return { width, height };
};

const prepareFirstSlideImage = () => {
  const { width, height } = getSlideDimensions();

  fetchFullImage({
    placeholderSelector: '.slideshow__slide.placeholder',
    containerSelector: 'slideshow__slide--container',
    width,
    height,
    name: 'tetiana/53.jpg',
    attributeArray: [['alt', ' '], ['data-index', 0]],
  });
};

export const lazyLoadSlides = () => {
  const { width, height } = getSlideDimensions();
  for (let i = 1; i < 7; i++) {
    fetchFullImage({
      placeholderSelector: `.slideshow__slide.download[data-index="${i}"]`,
      width,
      height,
    });
  }
};

let nextSectionIndex = 1;

const handleDownArrow = () => {
  const arrow = document.querySelector('.slideshow__down-arrow');
  const sections = document.querySelectorAll('section');
  arrow.addEventListener('click', () => {
    // when scrolling back to top on mobile need to align first section to bottom
    // otherwise it doesn't scroll to the very end
    if (nextSectionIndex === 0) {
      sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth', block: 'end' });
      // set next index after firing observers when scrolling up
      // otherwise it's set to "2"
      setTimeout(() => {
        nextSectionIndex = 1;
      }, 500);
    } else {
      sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  // handle arrow when scrolling manually
  const intersectOptions = {
    root: null,
    threshold: 0.5,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { index } = entry.target.dataset;
        if (index === '4') {
          nextSectionIndex = 0;
          arrow.classList.remove('slideshow__down-arrow--mobile');
          arrow.classList.add('slideshow__down-arrow--backwards');
        } else if (index === '0') {
          arrow.classList.remove('slideshow__down-arrow--mobile');
        } else {
          arrow.classList.remove('slideshow__down-arrow--backwards');
          nextSectionIndex = +index + 1;
          arrow.classList.add('slideshow__down-arrow--mobile');
        }
      }
    });
  }, intersectOptions);
  sections.forEach((section) => observer.observe(section));
};

const initSlideshow = () => {
  resizeSlideShowFrame();
  window.addEventListener('resize', resizeSlideShowFrame);
  prepareFirstSlideImage();
  handleDownArrow();
};

export default initSlideshow;
