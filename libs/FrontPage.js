import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './HTMLsections.js';
import NavBar from './HTMLnavbar.js';
import ResumeData from './factoryResumeData.js';
// import HTMLexperienceTile from './HTMLexperienceTile.js';
// import HTMLportfolioTile from './HTMLportfolioTile.js';
import {HTMLExperienceTile, HTMLPortfolioTile } from './HTMLtile.js';

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

    constructMainDivElement() {
        const newElement = document.createElement("main");
        newElement.innerHTML = `
         <button class="arrow" id="section-prev">❮</button>
         <button class="arrow" id="section-next">❯</button>
         <div id="section-container"></div>
         `;
         this.#wrapperElement.appendChild(newElement) 
    };

    createSections() {
        const sections = [
            new IntroductionSection(0),
            new SkillsSection(1),
            new EducationSection(2),
            new ExperiencesSection(3),
            new PortfolioSection(4)
        ];

        return sections;
    };

    addEventListeners() {
        const prevArrow = document.querySelector("#section-prev");
        const nextArrow = document.querySelector("#section-next");

        // Navbar links
        this.navBarObj.allNavLinks.forEach((nav, index) => {
            nav.addEventListener('click', () => {
                this.adjustDisplayedSection(index);
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

        this.navBarObj.setActiveElement(this.currentIndex);
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

    addIntro(email, phone, linkedin, github, background, introduction) {
        const parentEl = this.mainEl.querySelectorAll('#myIntroduction article')[0]
        parentEl.querySelector('.introduction').textContent = introduction;
    }


    addEducations(degree, institution) {
        const parentEl1 = this.mainEl.querySelectorAll('#myEducations article')[0]; // First Article
        const parentEl2 = this.mainEl.querySelectorAll('#myEducations article')[1]; // Second Article
    
        // Function to create a list item and append it to the specified parent element
        const createListItemAndAppend = (parentElement, textContent) => {
            const li = document.createElement('li');
            li.textContent = textContent;
            parentElement.appendChild(li);
        };
    
        // Determine which article to add the education to based on the existing children
        const targetParent = parentEl1.children.length <= parentEl2.children.length ? parentEl1 : parentEl2;
    
        // Populate the section with education data
        createListItemAndAppend(targetParent, `${degree} - ${institution}`);
    };

    addSkills(skillsKey, skillsLangages, skillsTechincal, skillsSoft) {
        const parentIntro = this.mainEl.querySelectorAll('#myIntroduction article')[1]
        const parentEl1 = this.mainEl.querySelectorAll('#mySkills article')[0] // Programming Languages
        const parentEl2 = this.mainEl.querySelectorAll('#mySkills article')[1] // Hard Skills
        const parentEl3 = this.mainEl.querySelectorAll('#mySkills article')[2] // Soft Skills
        const parentIntro2 = this.mainEl.querySelectorAll('#myIntroduction article')[3]
        const parentEl4 = this.mainEl.querySelectorAll('#mySkills article')[3] // Programming Languages
        const parentEl5 = this.mainEl.querySelectorAll('#mySkills article')[4] // Hard Skills
        const parentEl6 = this.mainEl.querySelectorAll('#mySkills article')[5] // Soft Skills

        console.log(parentEl2)
        // Function to create a list and append it to the specified parent element
        const createListAndAppend = (parentElement, skillsArray) => {
            const ul = document.createElement('ul');
            skillsArray.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                ul.appendChild(li);
            });
            parentElement.appendChild(ul);
        };

        // Populate the sections with skills
        createListAndAppend(parentIntro, skillsKey);
        createListAndAppend(parentEl1, skillsLangages);
        createListAndAppend(parentEl2, skillsTechincal);
        createListAndAppend(parentEl3, skillsSoft);

        createListAndAppend(parentIntro2, skillsKey);
        createListAndAppend(parentEl4, skillsLangages);
        createListAndAppend(parentEl5, skillsTechincal);
        createListAndAppend(parentEl6, skillsSoft);

    };

    addExperienceTile(company, address, position, period, tags, softwares, duties) {
        const parentEl = document.body.querySelector('#myExperiences .tile-container')
        const experienceTile = new HTMLExperienceTile(company, address, position, period, tags, softwares, duties)
        experienceTile.initTile(parentEl)
    };

    addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const parentEl = document.body.querySelector('#myPortfolio .tile-container')
        const portfolioTile = new HTMLPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
        portfolioTile.initTile(parentEl)
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