import cloudinary from 'cloudinary-core';
import Spinner from '../UI/Spinner/Spinner';
import './FullImage.css';

const cloud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
const spinner = Spinner('#353030');
const fullImageSection = document.querySelector('section.full-image');
const fullImageContainer = fullImageSection.querySelector('.full-image__container');
let fullImage = null;

const loadHandler = () => {
  if (spinner.parentNode === fullImageContainer) {
    fullImageContainer.appendChild(fullImage);
    fullImageContainer.removeChild(spinner);
  }
};

const closeFullImage = () => {
  fullImageSection.style.display = 'none';
  fullImage.removeEventListener('load', loadHandler.bind(this), { once: true });
  if (fullImage.parentNode === fullImageContainer) {
    fullImageContainer.removeChild(fullImage);
  }
  //   if (fullDescription.parentNode === fullImageContainer) {
  //     fullImageContainer.removeChild(fullDescription);
  //   }
  if (spinner.parentNode === fullImageContainer) {
    fullImageContainer.removeChild(spinner);
  }
};

const handleFullImageSection = () => {
  const close = fullImageSection.querySelector('.full-image__close');
  fullImageSection.style.display = 'grid';
  const height = window.innerHeight * 0.925;
  fullImageSection.style.height = `${height}px`;
  close.addEventListener('click', closeFullImage, { once: true });
};

const openFullImage = (e) => {
  handleFullImageSection();
  fullImageContainer.prepend(spinner);
  const link = document.querySelector('.full-image__button');

  const { person } = e.target.dataset;
  const openImageIndex = e.target.dataset.index;
  const imageHeight = (window.innerHeight * 0.95).toFixed(0);

  fullImage = new Image();
  fullImage.src = cloud.url(`main-page/works-${person}/${openImageIndex}`, {
    height: imageHeight,
    quality: 'auto',
    crop: 'scale',
    fetchFormat: 'auto',
  });

  fullImage.classList.add('full-image__image');
  fullImage.setAttribute('data-index', openImageIndex);
  fullImage.removeAttribute('height');

  link.href = `./gallery.html#${person}`;

  fullImage.addEventListener('load', loadHandler.bind(this), { once: true });
};

export default openFullImage;
