import cloudinary from 'cloudinary-core';
import Spinner from '../../UI/Spinner/Spinner';
import './FullImage.css';

const cloud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
const spinner = Spinner('#353030');
const fullImageSection = document.querySelector('section.full-image');
const fullImageContainer = fullImageSection.querySelector('.full-image__container');
let fullImage = null;
const descriptionData = {};

async function convertData(person) {
  const data = await import(`../../../assets/${person}.json`).then((response) => response.default);
  return data;
}

const getFullDescription = (index, person) => {
  const text = `
  <p>${descriptionData[person][index].name}</p>
  <p>${descriptionData[person][index].material},</p>
  <p>${descriptionData[person][index].size}cm, ${descriptionData[person][index].year}</p>
  <a class="button button--left-side full-image__button" href="./gallery.html#${person}"
                    data-name="${person}">Gallery</a>
  `;
  const div = document.createElement('div');
  div.classList.add('full-image__text');
  div.innerHTML = text;
  return div;
};

const loadHandler = () => {
  if (spinner.parentNode === fullImageContainer) {
    fullImageContainer.appendChild(fullImage);
    fullImageContainer.removeChild(spinner);
  }
};

const closeFullImage = () => {
  fullImageSection.style.display = 'none';
  fullImage.removeEventListener('load', loadHandler.bind(this), { once: true });
  fullImageContainer.innerHTML = '';
};

const handleFullImageSection = () => {
  const close = fullImageSection.querySelector('.full-image__close');
  fullImageSection.style.display = 'grid';
  const height = window.innerHeight * 0.925;
  fullImageSection.style.height = `${height}px`;
  close.addEventListener('click', closeFullImage, { once: true });
};

async function openFullImage(e) {
  if (e.target.tagName === 'A') return;

  handleFullImageSection();
  fullImageContainer.prepend(spinner);

  const { person } = e.target.dataset;
  const openImageIndex = e.target.dataset.index;
  const imageHeight = (window.innerHeight * 0.95).toFixed(0);

  if (!descriptionData.tetiana) {
    descriptionData.tetiana = await convertData('tetiana');
    descriptionData.mykhailo = await convertData('mykhailo');
  }
  const fullDescription = getFullDescription(openImageIndex, person);

  fullImage = new Image();
  fullImage.src = cloud.url(`${person}/${openImageIndex}`, {
    height: imageHeight,
    quality: 'auto',
    crop: 'scale',
    fetchFormat: 'auto',
  });

  fullImage.classList.add('full-image__image');
  fullImage.setAttribute('data-index', openImageIndex);
  fullImage.removeAttribute('height');
  fullImageContainer.prepend(fullDescription);

  fullImage.addEventListener('load', loadHandler.bind(this), { once: true });
}

export default openFullImage;
