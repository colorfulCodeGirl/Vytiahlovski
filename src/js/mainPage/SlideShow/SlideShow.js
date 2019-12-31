import fetchFullImage from '../../UI/fetchFullImage';

const resizeSlideShowFrame = () => {
  const slideFame = document.querySelector('.slideshow__frame');
  slideFame.style.height = `${window.innerHeight * 0.925}px`;
};

function prepareFirstSlideImage() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;
  let height = '';
  let width = '';
  if (isPortrait) {
    height = window.innerHeight;
  } else {
    width = window.innerWidth;
  }

  fetchFullImage({
    placeholderSelector: '.slideshow__slide.placeholder',
    containerSelector: 'slideshow__slide--container',
    width,
    height,
    imageName: 'tetiana/53.jpg',
    attributeArray: [['alt', ' '], ['data-index', 0]],
  });
}

const initSlideshow = () => {
  resizeSlideShowFrame();
  window.addEventListener('resize', resizeSlideShowFrame);
  prepareFirstSlideImage();
};

export default initSlideshow;
