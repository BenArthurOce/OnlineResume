import NavBar from '../views/NavbarView.js'
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'

class View {
    constructor() {
        const navbar = new NavBar();
        const section1 = new IntroductionSectionView();
        const section2 = new SkillSectionView();
        const section3 = new EducationSectionView();
        const section4 = new ExperienceSectionView();
        const section5 = new PortfolioSectionView();

        this.app = this.getElement('#wrapper');

        this.title = this.createElement('h1');
        this.title.textContent = 'Ben Resume';

        this.navbar = navbar.element;
        this.sections = [section1.element, section2.element, section3.element, section4.element, section5.element];
        this.currentSectionIndex = 0;

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                // Navigate to previous section
                this.navigateSections(-1);
            } else if (event.key === 'ArrowRight') {
                // Navigate to next section
                this.navigateSections(1);
            }
        });

        this.app.append(this.title, this.navbar, ...this.sections);
    }
  
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }
  
    getElement(selector) {
        return document.querySelector(selector);
    }

    navigateSections(direction) {
        // Calculate the index of the next section
        let nextIndex = this.currentSectionIndex + direction;

        // Ensure the index stays within bounds
        if (nextIndex < 0) {
            nextIndex = 0; // Wrap around to the last section
        } else if (nextIndex >= this.sections.length) {
            nextIndex = this.sections.length - 1; // Wrap around to the first section
        }

        // Hide the current section
        this.sections[this.currentSectionIndex].style.display = 'none';

        // Show the next section
        this.sections[nextIndex].style.display = 'block';

        // Update current section index
        this.currentSectionIndex = nextIndex;
    }
};

export default View;
