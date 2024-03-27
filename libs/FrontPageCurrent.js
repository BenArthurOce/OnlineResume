import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './Section.js';
import NavBar from './HTMLnavbar.js';
import ResumeData from './factoryResumeData.js';
// import HTMLexperienceTile from './HTMLexperienceTile.js';
// import HTMLportfolioTile from './HTMLportfolioTile.js';
import {ExperienceTile, PortfolioTile } from './Tile.js';
import {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter} from "./HTMLFilter.js";
import HTMLPalette from "./HTMLPalette.js";
import SectionHandler from "./SectionHandler.js";

class FrontPageCurrent {
    #sectionIDs;
    #sectionNames;
    #sectionsEl;
    #currentIndex;
    #previousIndex;
    #wrapperElement;
    #navBarObj;
    #navBarEl;
    #paletteObj
    #paletteEl
    #filterBarObjs;
    #sectionsObj;
    #frontPageElements
    #sectionHandler;


    constructor() {

        // this.#sectionIDs = ["about", "skills", "myEducation", "myExperience", "portfolio"]
        // this.#sectionNames = ["About Me", "My Skills", "Education", "Experience", "Portfolio"]
        
        this.#currentIndex = 0;
        this.#previousIndex = 0;
        this.#wrapperElement = document.querySelector("#wrapper");
        this.#navBarObj = this.createNavBar()
        this.#navBarEl = document.querySelector("nav");
    
        // Construct the main div element
        this.constructMainDivElement();
    
        // Render the sections
        this.#paletteObj = this.createPalette()
        this.#sectionsObj = []
        // this.#sectionsObj = this.createSections()
        // this.#filterBarObjs = this.createFilters()

        this.#paletteEl = document.body.querySelector(`#paletteSelector`)
        this.#sectionsEl = document.body.querySelectorAll(`section`)

        // this.#frontPageElements = this.initSlideshowElements();

        // this.showSlide();

        this.#sectionHandler = new SectionHandler;
    };
    //
    // All Names
    //
    get sectionIDs() {return this.#sectionIDs;};
    get sectionNames() {return this.#sectionNames;};
    //
    // All Elements (Dictionary Object)
    //
    get frontPageElements() {return this.#frontPageElements;};
    set frontPageElements(value) {this.#frontPageElements = value;};
    //
    // xxxxxxxx
    //
    get mainEl() {return document.querySelector(`main`)}
    //
    // Palette
    //
    get paletteObj() {return this.#paletteObj;};
    set paletteObj(value) {this.#paletteObj = value;};
    get paletteEl() {return this.#paletteEl;};
    //
    // Sections
    //
    get sectionsObj() {return this.#sectionsObj;};
    set sectionsObj(value) {this.#sectionsObj = value;};
    get sectionsEl() {return this.#sectionsEl;};
    //
    // NavBar
    //
    get navBarObj() {return this.#navBarObj;};
    get navBarEl() {return this.#navBarEl;};
    //
    // Current Section Display
    //
    get currentIndex() {return this.#currentIndex;};
    set currentIndex(index) {this.#currentIndex = index;};
    get previousIndex() {return this.#previousIndex;};
    set previousIndex(index) {this.#previousIndex = index;};
    //
    // Menus (Filters) FiilterObjs
    //
    get filterBarObjs() {return this.#filterBarObjs;};
    set filterBarObjs(index) {this.#filterBarObjs = index;};
    
    //
    // xxxxxxxx
    //
    get leftArrow() {return this.frontPageElements.single.arrow.prev};
    get rightArrow() {return this.frontPageElements.single.arrow.next};

    get prevArrow() {return this.mainEl.querySelector(`.arrow.prev.section`)};
    get nextArrow() {return this.mainEl.querySelector(`.arrow.next.section`)};

    //
    // xxxxxxxx
    //

    get filterBarObjs() {
        return this.#filterBarObjs;
    };
    get allFiltersEl() {
        return this.mainEl.querySelectorAll('menu')
    };
    get experienceTiles() {
        return document.body.querySelectorAll('#experience .tile')
    };
    get portfolioTiles() {
        return this.mainEl.querySelectorAll('#portfolio .tile')
    };
    get experienceFilter() {
        return this.mainEl.querySelector(`#experience menu`)
    };
    get portfolioFilter() {
        return this.mainEl.querySelector(`#portfolio menu`)
    };
    get allButtons() {
        return this.mainEl.querySelectorAll('button')
    };
    //
    // xxxxxxxx
    //
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


    get sectionHandler() {
        return this.#sectionHandler
    };
    set sectionHandler(value) {
        this.#sectionHandler = value
    }

    
    initSlideshowElements() {
        const tempObj = {
            "all": {
                 "navs": this.navBarObj.allLinkEl
                ,"sections": this.sectionsObj
                ,"menus": this.menuObj
                ,"arrows": this.mainEl.allButtons
                // ,"tiles": {
                //      "experience": this.mainEl.experienceTiles
                //     ,"portfolio": this.mainEl.portfolioTiles
                // }
                ,"tiles": {
                     "experience": this.sectionsObj[3].experienceTiles
                    ,"portfolio": this.sectionsObj[4].portfolioTiles
                }
                ,"filters": this.filterBarObjs
            }
            ,"single": {
                 "navbar": this.navBarObj.elementNavbar
                ,"nav": {
                    "introduction": this.navBarObj.allLinkEl[0]
                    ,"educations": this.navBarObj.allLinkEl[1]
                    ,"skills": this.navBarObj.allLinkEl[2]
                    ,"experience": this.navBarObj.allLinkEl[3]
                    ,"portfolio": this.navBarObj.allLinkEl[4]
                }
                ,"section": {
                     "introduction": this.sectionsObj[0]
                    ,"educations": this.sectionsObj[1]
                    ,"skills": this.sectionsObj[2]
                    ,"experience": this.sectionsObj[3]
                    ,"portfolio": this.sectionsObj[4]
                }
                ,"filter": {
                    "introduction": this.filterBarObjs[0]
                   ,"educations": this.filterBarObjs[1]
                   ,"skills": this.filterBarObjs[2]
                   ,"experience": this.filterBarObjs[3]
                   ,"portfolio": this.filterBarObjs[4]
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
        };
        return tempObj;
    };

    constructMainDivElement() {
        const newElement = document.createElement("main");
        newElement.innerHTML = `
            <button class="arrow prev for-section">❮</button>
            <button class="arrow next for-section">❯</button>
            <div class="container for-section"></div>
        `;
        this.#wrapperElement.appendChild(newElement) 
    };

    createNavBar() {
        const navBar = new NavBar(document.querySelector("#wrapper"));
        return navBar;
    };

    // das good code
    createSections() {
        const sections = [
            //  new IntroductionSection(0, this.sectionIDs[0], document.body.querySelector('.container.for-section'), this.sectionNames[0])
             new IntroductionSection(data, document.body.querySelector('.container.for-section'))
            ,new SkillsSection(data, document.body.querySelector('.container.for-section'))
            ,new EducationSection(data, document.body.querySelector('.container.for-section'))
            // ,new EducationSection(2, this.sectionIDs[2], document.body.querySelector('.container.for-section'), this.sectionNames[2])
            // ,new ExperiencesSection(3, this.sectionIDs[3], document.body.querySelector('.container.for-section'), this.sectionNames[3])
            // ,new PortfolioSection(4, this.sectionIDs[4], document.body.querySelector('.container.for-section'), this.sectionNames[4])
        ];
        return sections;
    };

    createFilters() {
        const menus = [
             new IntroductionFilter(0, this.sectionIDs[0], document.body.querySelector(`#${this.sectionIDs[0]}-filter-container`))
            ,new SkillsFilter(1, this.sectionIDs[1], document.body.querySelector(`#${this.sectionIDs[1]}-filter-container`))
            ,new EducationFilter(2, this.sectionIDs[2], document.body.querySelector(`#${this.sectionIDs[2]}-filter-container`))
            ,new ExperienceFilter(3, this.sectionIDs[3], document.body.querySelector(`#${this.sectionIDs[3]}-filter-container`))
            ,new PortfolioFilter(4, this.sectionIDs[4], document.body.querySelector(`#${this.sectionIDs[4]}-filter-container`))
        ];
        return menus;
    };

    createPalette(){
        const paletteInstance = new HTMLPalette(document.body.querySelector('#palette-container'));
        this.updateColorScheme("forest"); //default colour scheme
        return paletteInstance;
    };


    addEventListeners() {
        const prevArrow = document.querySelector(".arrow.prev.for-section");
        const nextArrow = document.querySelector(".arrow.next.for-section");

        // Navbar links
        this.navBarObj.allLinkEl.forEach((nav, index) => {
            nav.addEventListener('click', () => {
                this.adjustDisplayedSection(index);
                this.currentIndex = index
            });
        });

        // Add event listener for left arrow
        prevArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("-1");
        });

        // Add event listener for right arrow
        nextArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("+1");
        });


        // All buttons inside the menu bars
        this.filterBarObjs.forEach((filterBarObject, i) => {
            if (filterBarObject.refNum === 0 || filterBarObject.refNum === 1 || filterBarObject.refNum === 2) {
                const filterButtons = filterBarObject.element.querySelectorAll(`li`)
                filterButtons.forEach((button, i) => {
                    const callbackFunction = this.showArticle.bind(this)
                    button.addEventListener("click", callbackFunction);
                });
            };
            if (filterBarObject.refNum === 3 || filterBarObject.refNum === 4) {
                const filterButtons = filterBarObject.element.querySelectorAll(`li`)
                filterButtons.forEach((button, i) => {
                    const callbackFunction = this.filterTiles.bind(this)
                    button.addEventListener("click", callbackFunction);
                });
            };
        });

        // ColourPalette
        this.paletteEl.addEventListener('change', () => {
            const newColour = document.body.querySelector(`#paletteSelector`).value;
            this.updateColorScheme(newColour);
        });
    };


    showArticle(event) {
        // Code to handle if the button icon was pressed, or the background of the word
        let { class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.parentElement.attributes;
        if (dataIndex === undefined) {
            ({ class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.attributes);
        };

        // Get a list of all the articles in the same section and remove all of them
        const articles = document.body.querySelectorAll(`#${dataParent.value} article`);
        articles.forEach(article => article.classList.remove('activated'));
    
        // Show the selected article based on the provided filterKeyword
        const selectedArticle = document.body.querySelector(`#mobile-${dataFilter.value}`);
        if (selectedArticle) {
            selectedArticle.classList.add('activated');
        };
    };


    filterTiles(event) {
        // Code to handle if the button icon was pressed, or the background of the icon
        let { class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.parentElement.attributes;
        if (dataIndex === undefined) {
            ({ class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.attributes);
        };

        // Get a list of all the tiles in the same section and remove all of them
        const tiles = document.body.querySelectorAll(`#${dataParent.value} .tile`);
        tiles.forEach(tile => tile.classList.remove('activated'));
    
        // If a tile class attribute matches the filterKeyword, it becomes activated
        tiles.forEach(tile => {
            const tags = Array.from(tile.classList);
            const shouldShow = tags.includes(dataFilter.value);
            tile.classList.toggle('activated', shouldShow);
        });
    };


    updateColorScheme(newColour) {
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };


    showSlide() {
        // Adjust the section to be displayed
        this.sectionsObj[this.previousIndex].toggleActive()
        this.sectionsObj[this.currentIndex].toggleActive()

        // Transfer this information to NavBar()
        this.navBarObj.activeIndex = this.currentIndex

        // Change the navbar link to be highlighted. Change the active section name (for mobile)
        this.navBarObj.updateActiveLink();
        this.navBarObj.updateActiveName(this.sectionNames);
    };


    adjustDisplayedSection(action) {
        this.previousIndex = this.currentIndex;
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

    addIntro(data) {

        const subHeadings = ['Introduction', 'KeySkills']
        const parentEl = document.body.querySelector('.container.for-section')
        const newIntro = new IntroductionSection(data, parentEl, subHeadings)
        this.sectionsObj.push(newIntro)

    };



    addEducations(degree, institution, tags) {
        // const parentEl1 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[0]; // IT Article // PC
        // const parentEl2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[1]; // Accounting Article // PC

        // const parentEl3 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[2]; // IT Article // Mobile
        // const parentEl4 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[3]; // Accounting Article // Mobile

        // // Function to create a list item and append it to the specified parent element
        // const createListItemAndAppend = (parentElement, textContent) => {
        //     const ul = document.createElement('ul');
        //     const li = document.createElement('li');
        //     li.textContent = textContent;
        //     ul.appendChild(li);
        //     parentElement.appendChild(ul);
        // };

        // if (tags.includes("IT")) {
        //     createListItemAndAppend(parentEl1, `${degree} - ${institution}`);
        //     createListItemAndAppend(parentEl3, `${degree} - ${institution}`);
        // }

        // if (tags.includes("Finance")) {
        //     createListItemAndAppend(parentEl2, `${degree} - ${institution}`);
        //     createListItemAndAppend(parentEl4, `${degree} - ${institution}`);
        // }

    };

    addSkills(data) {

        const subHeadings = ['Technical', 'Soft', 'Languages']
        const parentEl = document.body.querySelector('.container.for-section')
        const newSkills = new SkillsSection(data, parentEl, subHeadings)
        this.sectionsObj.push(newSkills)


        // new SkillsSection(data, document.body.querySelector('.container.for-section'))

        // const parentIntro = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[1]

        // const parentEl1 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[0] // Hard Skills
        // const parentEl2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[1] // Soft Skills
        // const parentEl3 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[2] // Programming Languages
        // const parentIntro2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[3]
        
        // const parentEl4 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[3] // Hard Skills
        // const parentEl5 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[4] // Soft Skills
        // const parentEl6 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[5] // Programming Languages

        // // Function to create a list and append it to the specified parent element
        // const createListAndAppend = (parentElement, skillsArray) => {
        //     const ul = document.createElement('ul');
        //     skillsArray.forEach(skill => {
        //         const li = document.createElement('li');
        //         li.textContent = skill;
        //         ul.appendChild(li);
        //     });
        //     parentElement.appendChild(ul);
        // };

        // // Populate the sections with skills
        // createListAndAppend(parentIntro, skillsKey);
        // createListAndAppend(parentEl1, skillsTechincal);
        // createListAndAppend(parentEl2, skillsSoft);
        // createListAndAppend(parentEl3, skillsLangages);

        // createListAndAppend(parentIntro2, skillsKey);
        // createListAndAppend(parentEl4, skillsTechincal);
        // createListAndAppend(parentEl5, skillsSoft);
        // createListAndAppend(parentEl6, skillsLangages);
    };

    addExperienceTileOLD(company, address, position, period, extraInfo, tags, softwares, duties) {
        const data = {company, address, position, period, extraInfo, tags, softwares, duties}
        console.log(this.sectionIDs[3])
        const parentEl = document.body.querySelector(`#${this.sectionIDs[3]} .container.for-tile`);
        const experienceTile = new ExperienceTile(data, parentEl)
    };


    addExperienceTile(company, address, position, period, extraInfo, tags, softwares, duties) {
        const data = {company, address, position, period, extraInfo, tags, softwares, duties}
        console.log(this.sectionIDs[3])
        const parentEl = document.body.querySelector(`#${this.sectionIDs[3]} .container.for-tile`);
        const experienceTile = new ExperienceTile(data, parentEl)
    };

    addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const data = {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages}
        const parentEl = document.body.querySelector(`#${this.sectionIDs[4]} .container.for-tile`);
        const portfolioTile = new PortfolioTile(data, parentEl);
    };
};


class FrontPageWithResumeData extends FrontPageCurrent {
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

export {FrontPageCurrent as FrontPageNEW, FrontPageWithResumeData};
