const buttons = document.querySelectorAll('.works .button');

const toggleFullSize = () => {
  const content = document.querySelector('.content');
  const gallery = document.querySelector('.full-gallery');
  content.classList.toggle('not-active');
  gallery.classList.toggle('active');
};

const addHomeBtn = () => {
  const header = document.querySelector('header');
  const hamburgerMenu = header.children[0];
  const home = new Image();
  home.src = '../../images/home.png';
  home.className = 'home';
  header.insertBefore(home, hamburgerMenu);
  header.classList.add('open-gallery');
  home.addEventListener('click', () => {
    toggleFullSize();
    header.removeChild(home);
    header.classList.remove('open-gallery');
  });
};

const calcAproxRatio = (img) => {
  const { width } = img;
  const { height } = img;
  const isHorizontal = width > height;
  let widthParam;
  let heightParam;

  if (isHorizontal) {
    widthParam = 10;
    heightParam = Math.floor((height / width) * 10);
  } else {
    heightParam = 10;
    widthParam = Math.floor((width / height) * 10);
  }

  return {
    widthParam,
    heightParam,
  };
};

const createImgNode = (picture) => {
  const img = new Image();
  img.src = picture.url;
  return img;
};

const generateBlock = (img) => {
  const block = document.createElement('div');
  block.classList.add('art-piece');
  block.appendChild(img);
  return block;
};

const populateGallery = async () => {
  const response = await fetch('../../data/tetianaGallery.json');
  const myJson = await response.json();
  const pictures = Array.from(myJson.pictures);
  const imageNodes = pictures.map(createImgNode);
  const gallery = document.querySelector('.full-gallery');

  imageNodes.forEach((img) => {
    img.onload = () => {
      const aproxRatio = calcAproxRatio(img);
      const htmlBlock = generateBlock(img);
      htmlBlock.classList.add(`w${aproxRatio.widthParam}`);
      htmlBlock.classList.add(`h${aproxRatio.heightParam}`);
      gallery.appendChild(htmlBlock);
    };
  });
};

// const generateEmptyBlock = (firstInd, secondInd, gallery, counter) => {
//     const block = document.createElement('div');
//     const proportions = [1, 2, 3, 4, 7, 8, 9, 10];
//     block.classList.add('filler');
//     block.classList.add(`w${proportions[firstInd]}`);
//     block.classList.add(`h${proportions[secondInd]}`);
//     gallery.appendChild(block);
//     const blockPosition = block.offsetTop;
//     if (blockPosition >= bottomLine) {
//         gallery.removeChild(block);
//         secondInd++;
//         counter++;
//         generateEmptyBlock(firstInd, secondInd, gallery);
//     }
// }
// const generateEmptyBlock = () => {
//   const block = document.createElement("div");
//   const proportions = [1, 2, 3, 4, 7, 8, 9, 10];
//   block.classList.add("filler");
//   block.classList.add(`w${1}`);
//   block.classList.add(`h${1}`);
//   gallery.appendChild(block);
//   const blockPosition = block.offsetTop;
//   if (blockPosition >= bottomLine) {
//     gallery.removeChild(block);
//     secondInd++;
//     counter++;
//     generateEmptyBlock(firstInd, secondInd, gallery);
//   }
// };
// const generateFillers = () => {
//   const gallery = document.querySelector(".full-gallery");
// //   const bottomLine = gallery.offsetTop + gallery.height;
//   const firstInd = 0;
//   const secondInd = 0;
//   const counter = 0;
//   if (counter < 8) {
//     generateEmptyBlock(firstInd, secondInd, gallery, counter);
//   }
// };

const openGallery = () => {
  //   const currentPerson = e.target.dataset.name;
  const content = document.querySelector('.content');
  const gallery = document.querySelector('.full-gallery');
  addHomeBtn();
  toggleFullSize();
  populateGallery();

  content.addEventListener('transitionend', () => {
    gallery.scrollIntoView();
    gallery.classList.add('show-img');
  });
};

function initFullGallery() {
  buttons.forEach((btn) =>
    btn.addEventListener('click', openGallery));
}

export default initFullGallery;
