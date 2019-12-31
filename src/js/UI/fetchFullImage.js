import cloudinary from 'cloudinary-core';

const fetchFullImage = ({
  placeholderSelector,
  containerSelector,
  width = '',
  height = '',
  imageName,
  attributeArray = [],
}) => {
  const placeholder = document.querySelector(placeholderSelector);
  const container = containerSelector ? document.querySelector(`.${containerSelector}`) : null;
  const parent = placeholder.parentNode;
  const claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });

  const imageLoader = new Image();
  attributeArray.forEach((attribute) => {
    if (container) {
      container.setAttribute(attribute[0], attribute[1]);
    } else {
      placeholder.setAttribute(attribute[0], attribute[1]);
    }
  });
  imageLoader.addEventListener('load', () => {
    if (container === null) {
      placeholder.src = imageLoader.src;
    } else {
      container.classList.remove(containerSelector);
      container.src = imageLoader.src;
      placeholder.classList.add('placeholder-hidden');
      setTimeout(() => {
        parent.removeChild(placeholder);
      }, 0);
    }
  });

  const src = claud.url(imageName, {
    fetchFormat: 'auto',
    crop: 'scale',
    width,
    height,
    quality: 'auto:good',
    dpr: 'auto',
  });

  imageLoader.src = src;
};

export default fetchFullImage;
