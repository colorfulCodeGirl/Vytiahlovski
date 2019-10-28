const buttons = document.querySelectorAll('.works .button');

const hideOtherSections = (currentPerson) => {
    const otherSelectors = 'section.first-screen-gallery, section.biography, section.achievements, .works .section-heading';
    const otherSections = Array.from(document.querySelectorAll(otherSelectors));

    //find out who's gallery should be hidden and return it's container class selector
    const findPersonToHide = () => {
        if (currentPerson == 'tetiana') {
            return '.works-mykhailo';
        } else {
            return '.works-tetiana';
        }
    }
    const personToHide = findPersonToHide();
    const otherGallery = document.querySelector(personToHide);

    otherSections.push(otherGallery);
    //hide sections
    otherSections.forEach(sect => {
        sect.style.display = 'none';
    });
}

const makeTransitionToFull = (currentPerson) => {
    const gallery = document.querySelector(`.works-${currentPerson}`);
    gallery.classList.add('full');
    //make it scroll to top 
    gallery.scrollIntoView({
        behavior: 'smooth'
      });
    gallery.addEventListener( 'transitionend', (e) => {
        if (e.propertyName == 'height') {
            hideOtherSections(currentPerson);
            gallery.scrollIntoView();
        }
    })
}

const openGallery = (e) => {
    const currentPerson = e.target.dataset.name;
    makeTransitionToFull(currentPerson);
}

function initFullGallery() {
    buttons.forEach(btn => btn.addEventListener('click', openGallery));
}

export default initFullGallery;