class TextSection {
  constructor(selector) {
    this.section = document.querySelector(selector);
    this.className = selector;
  }

  showWholeContent() {
    const buttons = this.section.querySelectorAll('.button');

    const showMore = (e) => {
      const btn = e.target;
      const { person } = btn.dataset;
      const fullText = this.section.querySelector(`.text-section__full-text--${person}`);

      const isActive = fullText.className.includes('active');

      if (isActive) {
        btn.innerHTML = 'more...';
        btn.setAttribute('aria-label', "Whole Tetniana's biography");
      } else {
        btn.innerHTML = 'less...';
        btn.setAttribute('aria-label', "Hide whole Tetniana's biography");
      }
      fullText.classList.toggle('text-section__full-text--active');
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', showMore);
    });
  }

  addContent() {
    if (window.innerWidth < 400) return;

    const textLeads = this.section.querySelectorAll('.text-section__lead');
    const fullTexts = this.section.querySelectorAll('.text-section__full-text');
    const buttons = this.section.querySelectorAll('.button');

    const appendText = () => {
      /* separate logic for achievements,
      because it contains a list divided between short text and full text */
      if (this.className.includes('achievements')) {
        textLeads.forEach((textLead, i) => {
          const fullTextList = fullTexts[i].querySelector('.text-section__list');
          const listItems = Array.from(fullTextList.children).slice(0, 3);
          const textLeadList = textLead.querySelector('.text-section__list');
          listItems.forEach((item) => {
            textLeadList.appendChild(item);
          });
        });
      } else {
        textLeads.forEach((textLead, i) => {
          const paragraph = Array.from(fullTexts[i].children).shift();
          textLead.insertBefore(paragraph, buttons[i]);
        });
      }
    };

    if (window.innerWidth > 400) {
      appendText();
    }
    if (window.innerWidth > 650) {
      appendText();
    }
    if (window.innerWidth > 900) {
      appendText();
    }
  }

  init() {
    this.showWholeContent();
    this.addContent();
  }
}

export default TextSection;
