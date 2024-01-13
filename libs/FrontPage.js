import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './HTMLsections.js';
import NavBar from './HTMLnavbar.js';
import ResumeData from './factoryResumeData.js';
// import HTMLexperienceTile from './HTMLexperienceTile.js';
// import HTMLportfolioTile from './HTMLportfolioTile.js';
import {HTMLExperienceTile2, HTMLPortfolioTile2 } from './HTMLtile.js';

class FrontPageNEW {
    #sectionsEl;
    #currentIndex;
    #wrapperElement;
    #navBarObj;
    #sectionsObj;
    #frontPageElements

    constructor() {
        
        this.#currentIndex = 0;
        this.#wrapperElement = document.querySelector("#wrapper");
        this.#navBarObj = new NavBar;
    
        // Construct the main div element
        this.constructMainDivElement();
    
        // Render the sections
        this.#sectionsObj = this.createSections()
        this.#sectionsEl = document.body.querySelectorAll(`section`)

        // this.addEventListeners()
    };

    //
    // All Elements (Dictionary Object)
    //
    get frontPageElements() {
        return this.#frontPageElements;
    };
    set frontPageElements(value) {
        this.#frontPageElements = value;
    };
    //
    //
    //
    get mainEl() {
        return document.querySelector(`main`)
    }
    // Sections
    get sectionsObj() {
        return this.#sectionsObj;
    };
    set sectionsObj(value) {
        this.#sectionsObj = value;
    };
    get sectionsEl() {
        return this.#sectionsEl;
    };
    //
    // NavBar
    //
    get navBarObj() {
        return this.#navBarObj;
    };
    //
    // Current Section Display
    //
    get currentIndex() {
        return this.#currentIndex;
    };
    set currentIndex(index) {
        this.#currentIndex = index;
    };


    get leftArrow() {
        return this.frontPageElements.single.arrow.prev
    };
    get rightArrow() {
        return this.frontPageElements.single.arrow.next
    };

    get prevArrow() {
        return this.mainEl.querySelector(`#section-prev`)
    }
    get nextArrow() {
        return this.mainEl.querySelector(`#section-next`)
    };



    get allFilters() {
        return this.mainEl.querySelectorAll('menu')
    };
    get experienceTiles() {
        return document.body.querySelectorAll('#myExperiences .tile')
    };
    get portfolioTiles() {
        return this.mainEl.querySelectorAll('#myPortfolio .tile')
    };
    get experienceFilter() {
        return this.mainEl.querySelector(`#myExperiences menu`)
    };
    get portfolioFilter() {
        return this.mainEl.querySelector(`#myPortfolio menu`)
    };
    get allButtons() {
        return this.mainEl.querySelectorAll('button')
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
                 "navs": this.navBarObj.allNavLinks
                ,"sections": this.sectionsObj
                ,"arrows": this.mainEl.allButtons
                // ,"tiles": {
                //      "experience": this.mainEl.experienceTiles
                //     ,"portfolio": this.mainEl.portfolioTiles
                // }
                ,"filters": this.mainEl.allFilters
            }
            ,"single": {
                 "navbar": this.navBarObj.elementNavbar
                ,"nav": {
                    "introduction": this.navBarObj.allNavLinks[0]
                    ,"educations": this.navBarObj.allNavLinks[1]
                    ,"skills": this.navBarObj.allNavLinks[2]
                    ,"experience": this.navBarObj.allNavLinks[3]
                    ,"portfolio": this.navBarObj.allNavLinks[4]
                }
                ,"section": {
                     "introduction": this.sectionsObj[0]
                    ,"educations": this.sectionsObj[1]
                    ,"skills": this.sectionsObj[2]
                    ,"experience": this.sectionsObj[3]
                    ,"portfolio": this.sectionsObj[4]
                }
                ,"arrow": {
                     "prev": this.mainEl.prevArrow
                    ,"next": this.mainEl.nextArrow
                }
                ,"filter": {
                     "experience": this.mainEl.experienceFilter
                    ,"portfolio": this.mainEl.portfolioFilter
                }
            }
        }
    };

    constructNavigationBar() {

    };

    constructMainDivElement() {
        const newElement = document.createElement("main");
        newElement.innerHTML = `
         <button class="arrow" id="section-prev">❮</button>
         <button class="arrow" id="section-next">❯</button>
         <div id="slideshowContainer"></div>
         `;
         this.#wrapperElement.appendChild(newElement) 
    };

    createSections() {
        const sections = [
            new IntroductionSection(0),
            new EducationSection(1),
            new SkillsSection(2),
            new ExperiencesSection(3),
            new PortfolioSection(4)
        ];

        sections.forEach(section => {
            section.initSection();
        });

        return sections;
    };

    addEventListeners() {
        const prevArrow = document.querySelector("#section-prev");
        const nextArrow = document.querySelector("#section-next");

        // Navbar links
        this.navBarObj.allNavLinks.forEach((nav, index) => {
            nav.addEventListener('click', () => {
                this.adjustDisplayedSection(index);
                this.navBarObj.setActiveSection(index)
            });
        });

        // Add event listeners for arrow buttons
        prevArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("-1");
        });

        nextArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("+1");
        });
    };

    showSlide() {
        this.sectionsObj.forEach((section, i) => {
            this.currentIndex === i ? section.setActiveSection() : section.setInactiveSection()
        });

        this.navBarObj.setActiveSection();
    };

    adjustDisplayedSection(action) {
        switch (action) {
            case '+1':
                // Loops back to index 0 if the forward arrow goes too far
                if (++this.currentIndex > this.sectionsObj.length - 1) {
                    this.currentIndex = 0
                }
                this.showSlide();
                break;
            case '-1':
                // Loops back to the last index is the prev button goes too far
                if (--this.currentIndex < 0) {
                    this.currentIndex = this.sectionsObj.length - 1
                }
                this.showSlide();
                break;
            default:
                // If this function by a navlink clicking and deciding the slide number
                this.currentIndex = action
                this.showSlide();
                break;
        };
    };

    addExperienceTile(company, address, position, period, tags, softwares, duties) {
        const experienceTile = new HTMLExperienceTile2(company, address, position, period, tags, softwares, duties)
        experienceTile.renderToPage()
    };

    addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const portfolioTile = new HTMLPortfolioTile2(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
        portfolioTile.renderToPage()
    };
};


class FrontPageWithResumeData extends FrontPageNEW {
    #resumeData;
    #data;
    #url;

    constructor() {
        super();
        
        this.#resumeData = new ResumeData();

        this.populateSectionsWithData()
    }

    populateSectionsWithData() {
        this.#resumeData.getJSONdata()
            .then(resumeData => {
                console.log("put in the data")
        })
    };
};

export {FrontPageNEW, FrontPageWithResumeData};