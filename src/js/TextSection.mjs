class TextSection {
  constructor(selector) {
    this.section = document.querySelector(selector);
    this.className = selector;
  }

  showWholeContent() {
    const buttons = this.section.querySelectorAll('button');

    const showMore = (e) => {
      const btn = e.target;
      const { person } = btn.dataset;
      const fullText = this.section.querySelector(`.${person} .full-text`);

      const isActive = fullText.className.includes('active');
      if (isActive) {
        btn.innerHTML = 'more...';
        btn.setAttribute('aria-label', "Whole Tetniana's biography");
      } else {
        btn.innerHTML = 'less...';
        btn.setAttribute('aria-label', "Hide whole Tetniana's biography");
      }
      fullText.classList.toggle('active');
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', showMore);
    });
  }

  addContent() {
    if (window.innerWidth < 400) return;

    const shortTexts = this.section.querySelectorAll('.short-text');
    const fullTexts = this.section.querySelectorAll('.full-text');
    const buttons = this.section.querySelectorAll('button');

    const appendText = () => {
      /* separate logic for achievements,
      because it contains a list divided between short text and full text */
      if (this.className.includes('achievements')) {
        shortTexts.forEach((shortText, i) => {
          const fullTextList = fullTexts[i].querySelector('ul');
          const listItems = Array.from(fullTextList.children).slice(0, 3);
          const shortTextList = shortText.querySelector('ul');
          listItems.forEach((item) => {
            shortTextList.appendChild(item);
          });
        });
      } else {
        shortTexts.forEach((shortText, i) => {
          const paragraph = Array.from(fullTexts[i].children).shift();
          shortText.insertBefore(paragraph, buttons[i]);
        });
      }
    };

    if (window.innerWidth > 400) {
      appendText();
    }
    if (window.innerWidth > 650) {
      appendText();
    }
  }

  init() {
    this.showWholeContent();
    this.addContent();
  }
}

export default TextSection;
