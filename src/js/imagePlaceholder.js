import cloudinary from 'cloudinary-core';

async function handleIMagePlaceholder({
  selector,
  width = '',
  height = '',
  imageName,
  attributeArray = [],
}) {
  const placeholder = document.querySelector(selector);
  const parent = placeholder.parentNode;
  const claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });

  const fullImage = new Image();
  fullImage.src = await claud.url(imageName, {
    fetchFormat: 'auto',
    crop: 'scale',
    width,
    height,
    quality: 'auto:good',
    dpr: 'auto',
  });

  attributeArray.forEach((attribute) => {
    fullImage.setAttribute(attribute.key, attribute.value);
  });

  parent.appendChild(fullImage);

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
}

export default handleIMagePlaceholder;
