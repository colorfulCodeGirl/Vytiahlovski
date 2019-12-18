/* eslint-disable object-curly-newline */
import cloudinary from 'cloudinary-core';

const fetchFullImage = ({ selector, width = '', height = '', imageName, attributeArray = [] }) => {
  const placeholder = document.querySelector(selector);
  const parent = placeholder.parentNode;
  const claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });

  const fullImage = new Image();
  fullImage.src = claud.url(imageName, {
    fetchFormat: 'auto',
    crop: 'scale',
    width,
    height,
    quality: 'auto:good',
    dpr: 'auto',
    ...attributeArray,
  });

  attributeArray.forEach((attribute) => {
    fullImage.setAttribute(attribute[0], attribute[1]);
  });

  parent.prepend(fullImage);

  fullImage.addEventListener('load', () => {
    placeholder.classList.add('placeholder-hidden');
    placeholder.addEventListener(
      'transitionend',
      () => {
        parent.removeChild(placeholder);
      },
      { once: true },
    );
  });
  return fullImage;
};

export default fetchFullImage;
