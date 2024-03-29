import NavBarView from '../views/NavbarView.js'
import NavLinkView from '../views/NavlinkView.js';
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'

class View {
    constructor() {
        this.searchTimeout = null;
        this.init()

    }



    async init() {


        this.app = this.getElement('#wrapper');



        this.title = this.createElement('h1');
        this.title.textContent = 'Ben Resume';


        // Prepare Navigation Bar
        this.navBar = new NavBarView();
        this.navBar.appendLink(new NavLinkView(0, "Introduction"))
        this.navBar.appendLink(new NavLinkView(1, "Skills"))
        this.navBar.appendLink(new NavLinkView(2, "Education"))
        this.navBar.appendLink(new NavLinkView(3, "Experience"))
        this.navBar.appendLink(new NavLinkView(4, "Portfolio"))

        
        this.sections = [
             new IntroductionSectionView()
            ,new SkillSectionView()
            ,new EducationSectionView()
            ,new ExperienceSectionView()
            ,new PortfolioSectionView()
        ]

        // this.elNavs = []
        this.sectionsEL = this.sections.map(section => section.element)


        // this.navbar = navbar.element;
        // this.sections = [section1.element, section2.element, section3.element, section4.element, section5.element];
        this.currentSectionIndex = 0;

        this.indexView = 0;

        console.log(this.navBar)



        this.app.append(this.title, this.navBar.element, ...this.sectionsEL);
        // this.renderNavLinks();
    };


    renderNavBar() {
        // Append navigation bar element to the body or any other appropriate container
        document.body.appendChild(this.navBar.element);
    }

    renderNavLinks() {
        // Get the container element where navigation links will be appended
        const navLinksContainer = this.navBar.element.querySelector('.container.for-navbar-links');

        // Append each navigation link element to the container
        this.navLinks.forEach(navLink => {
            navLinksContainer.appendChild(navLink.element);
        });
    }


    // I'm not sure if the hanlder is needed as I think its to do with adjusting data in the model, and data in the model doesnt need adjusting
    bindAdjIndexNumber(handler) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                // Navigate to previous section
                this.decrementActiveNumber()
                handler(-1); // Decrement index by 1

                this.render(this.indexView)
            } else if (event.key === 'ArrowRight') {
                // Navigate to next section
                this.incrementActiveNumber()
                handler(1); // Increment index by 1
                this.render(this.indexView)
            }
        });
    };


    decrementActiveNumber() {
        const numSections = this.sections.length;
        let a 
        a = this.indexView 
        let b 
        b = (a - 1 + numSections) % numSections;
        this.indexView = b
    };


    incrementActiveNumber() {
        // console.log("incrementActiveNumber")
        const numSections = this.sections.length;
        let a 
        a = this.indexView 
        let b 
        b = (a + 1 + numSections) % numSections;
        this.indexView = b
    };


  
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    };

  
    getElement(selector) {
        return document.querySelector(selector);
    };


    renderNewSection(sections) {
        console.log(sections)
    };




    render(nextIndex) {
        console.log(nextIndex)

        // Unactivate current nav link
        this.navBar.returnSingleNavigationLink(this.currentSectionIndex).toggle();


        // Activate next navlink




        // Hide the current section
        this.sectionsEL[this.currentSectionIndex].style.display = 'none';

        // Show the next section
        this.sectionsEL[nextIndex].style.display = 'block';

        // Update current section index
        this.currentSectionIndex = nextIndex;
    };

};

export default View;
