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
    imageLoader.setAttribute(attribute[0], attribute[1]);
  });
  imageLoader.addEventListener('load', () => {
    if (container === null) {
      placeholder.src = imageLoader.src;
    } else {
      container.classList.remove(containerSelector);
      container.src = imageLoader.src;
      placeholder.classList.add('placeholder-hidden');
      placeholder.addEventListener(
        'transitionend',
        () => {
          parent.removeChild(placeholder);
        },
        { once: true },
      );
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
