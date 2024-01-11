"use strict"




import HTMLSectionSlideshow from './HTMLsectionSideshow.js';
import NavBar from './HTMLnavbar.js';
import HTMLportfolioTile from "./HTMLportfolioTile.js";
import HTMLexpTile from "./HTMLexpTile.js";



class FrontPage {
    #elementWrapper;
    #elementNavBar;
    #elementMainDiv
    #elementSectionSlideshow;
    #frontPageElements;
    #currentSectionIndex;
    constructor() {
        this.#elementWrapper = document.getElementById('wrapper')
        this.#elementNavBar = new NavBar;
        this.#elementMainDiv = ''
        this.#elementSectionSlideshow = new HTMLSectionSlideshow(this.#elementWrapper);
        this.#currentSectionIndex = 0;
        this.#frontPageElements = {}

        this.initSlideshowElements()
        this.addEventListeners()
    };
    get frontPageElements() {
        return this.#frontPageElements;
    };
    set frontPageElements(value) {
        this.#frontPageElements = value;
    };
    get elementNavBar() {
        return this.#elementNavBar;
    };
    set elementNavBar(value) {
        this.#elementNavBar = value;
    };
    get allNavs() {
        return this.frontPageElements.all.navs
    };
    get elementSectionSlideshow() {
        return this.#elementSectionSlideshow;
    };
    set elementSectionSlideshow(value) {
        this.#elementSectionSlideshow = value;
    };
    get elementWrapper() {
        return this.#elementWrapper;
    };
    get elementMainDiv() {
        return this.#elementMainDiv;
    };
    set elementMainDiv(value) {
        this.#elementMainDiv = value;
    };
    get currentSectionIndex() {
        return this.#currentSectionIndex;
    };
    set currentSectionIndex(value) {
        this.#currentSectionIndex = value;
    };
    get allSections() {
        return this.frontPageElements.all.sections
    };
    get leftArrow() {
        return this.frontPageElements.single.arrow.prev
    };
    get rightArrow() {
        return this.frontPageElements.single.arrow.next
    };
    get experienceTiles() {
        return this.frontPageElements.all.tiles.experience
    };
    get portfolioTiles() {
        return this.frontPageElements.all.tiles.portfolio
    };
    get experienceFilter() {
        return this.frontPageElements.single.filter.experience
    };
    get portfolioFilter() {
        return this.frontPageElements.single.filter.portfolio
    };

    initSlideshowElements() {
        this.#frontPageElements = {
            "all": {
                 "navs": this.elementNavBar.allNavLinks
                ,"sections": this.elementSectionSlideshow.allSections
                ,"arrows": this.elementSectionSlideshow.allButtons
                ,"tiles": {
                     "experience": this.elementSectionSlideshow.experienceTiles
                    ,"portfolio": this.elementSectionSlideshow.portfolioTiles
                }
                ,"filters": this.elementSectionSlideshow.allFilters
            }
            ,"single": {
                 "navbar": this.elementNavBar.elementNavbar
                ,"nav": {
                    "introduction": this.elementNavBar.allNavLinks[0]
                    ,"educationSkills": this.elementNavBar.allNavLinks[1]
                    ,"experience": this.elementNavBar.allNavLinks[2]
                    ,"portfolio": this.elementNavBar.allNavLinks[3]
                }
                ,"section": {
                     "introduction": this.elementSectionSlideshow.allSections[0]
                    ,"educationSkills": this.elementSectionSlideshow.allSections[1]
                    ,"experience": this.elementSectionSlideshow.allSections[2]
                    ,"portfolio": this.elementSectionSlideshow.allSections[3]
                }
                ,"arrow": {
                     "prev": this.elementSectionSlideshow.prevArrow
                    ,"next": this.elementSectionSlideshow.nextArrow
                }
                ,"filter": {
                     "experience": this.elementSectionSlideshow.experienceFilter
                    ,"portfolio": this.elementSectionSlideshow.portfolioFilter
                }
            }
        }
    };

    addExperienceTile(company, address, position, period, tags, softwares, duties) {
        const expTile = new HTMLexpTile(company, address, position, period, tags, softwares, duties)
        expTile.renderToPage()
    };

    addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const portTile = new HTMLportfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
        portTile.renderToPage()
    }

    addEventListeners() {
        // Navbar links
        this.allNavs.forEach((nav, index) => {
            nav.addEventListener('click', () => {
                this.adjustDisplayedSection(index);
            });
        });

        // Add event listeners for arrow buttons
        this.leftArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("-1");
        });

        this.rightArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("+1");
        });

        // Add event listeners for experience tile filters
        this.experienceFilter.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myExperiences', filter.dataset.filter);
            });
        });

        // Add event listeners for portfolio tile filters
        this.portfolioFilter.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myPortfolio', filter.dataset.filter);
            });
        });
    };

    filterTiles(sectionId, filter) {
        // TODO: use the this.experienceTiles to make a filter
        const tiles = this.elementMainDiv.querySelectorAll(`#${sectionId} .tile`);
        tiles.forEach(tile => {
            let tags = Array.from(tile.classList)
            if (tags.includes(filter)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        })
    };

    showSlide() {
        // Remove the active state of each resume section
        this.frontPageElements.all.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove the active state of each navigation link
        this.frontPageElements.all.navs.forEach(link => {
            link.classList.remove('active');
        });

        // Set the active class
        this.frontPageElements.all.sections[this.currentSectionIndex].classList.add('active');
        this.frontPageElements.all.navs[this.currentSectionIndex].classList.add('active');

        // this.allNavs[this.currentSectionIndex].classList.add('active');
    };


    adjustDisplayedSection(action) {
        switch (action) {
            case '+1':
                // Loops back to index 0 if the forward arrow goes too far
                if (++this.currentSectionIndex > this.allSections.length - 1) {
                    this.currentSectionIndex = 0
                }
                this.showSlide();
                break;
            case '-1':
                // Loops back to the last index is the prev button goes too far
                if (--this.currentSectionIndex < 0) {
                    this.currentSectionIndex = this.allSections.length - 1
                }
                this.showSlide();
                break;
            default:
                // If this function by a navlink clicking and deciding the slide number
                this.currentSectionIndex = action
                this.showSlide();
                break;
        };
    };

};

export default FrontPage



// const wrapperElement = document.getElementById('wrapper')

// const navbarElementNEW = new NavBar;
// const slideshowNEW = new HTMLSectionSlideshow(wrapperElement);



// const classResumeData = new ResumeData;

// // fetch json resume data
// classResumeData.getJSONdata()
// .then(resumeData => {

//     // Get the headers of the JSON file, and then render each section to the page
//     const {aboutMe, myCompetencies, myEducations, myExperiences, myPortfolio} = resumeData

//     // for (const {degree, institution} of myEducations) {
//     //     const eduTile = new HTMLeducation(degree, institution)
//     //     eduTile.renderToPage();
//     // };

//     // Code to Add Education
//     // Code to Add Skills


//     for (const {company, address, position, period, tags, softwares, duties} of myExperiences) {
//         const expTile = new HTMLexpTile(company, address, position, period, tags, softwares, duties)
//         expTile.renderToPage()
//     };

//     for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
//         const portTile = new HTMLportfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
//         portTile.renderToPage()
//     };
// });