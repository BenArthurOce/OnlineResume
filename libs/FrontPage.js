import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './HTMLsections.js';
import NavBar from './HTMLnavbar.js';
import ResumeData from './factoryResumeData.js';
// import HTMLexperienceTile from './HTMLexperienceTile.js';
// import HTMLportfolioTile from './HTMLportfolioTile.js';
import {HTMLExperienceTile, HTMLPortfolioTile } from './HTMLtile.js';
import {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter} from "./HTMLFilter.js";
import HTMLPalette from "./HTMLPalette.js";

class FrontPageNEW {
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
    #fiilterObjs;
    #sectionsObj;
    #frontPageElements


    constructor() {

        this.#sectionIDs = ["aboutMe", "mySkills", "myEducation", "myExperience", "myPortfolio"]
        this.#sectionNames = ["About Me", "My Skills", "Education", "Experience", "Portfolio"]
        
        this.#currentIndex = 0;
        this.#previousIndex = 0;
        this.#wrapperElement = document.querySelector("#wrapper");
        this.#navBarObj = this.createNavBar()
        this.#navBarEl = document.querySelector("nav");
    
        // Construct the main div element
        this.constructMainDivElement();
    
        // Render the sections
        this.#paletteObj = this.createPalette()
        this.#sectionsObj = this.createSections()
        this.#fiilterObjs = this.createFilters()

        this.#paletteEl = document.body.querySelector(`#paletteSelector`)
        this.#sectionsEl = document.body.querySelectorAll(`section`)

        this.#frontPageElements = this.initSlideshowElements();

        this.showSlide();
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
    get fiilterObjs() {return this.#fiilterObjs;};
    set fiilterObjs(index) {this.#fiilterObjs = index;};
    //
    // xxxxxxxx
    //
    get leftArrow() {return this.frontPageElements.single.arrow.prev};
    get rightArrow() {return this.frontPageElements.single.arrow.next};

    get prevArrow() {return this.mainEl.querySelector(`#section-prev`)}
    get nextArrow() {return this.mainEl.querySelector(`#section-next`)};

    //
    // xxxxxxxx
    //

    get allFiltersEl() {
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
                ,"filters": this.fiilterObjs
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
                    "introduction": this.fiilterObjs[0]
                   ,"educations": this.fiilterObjs[1]
                   ,"skills": this.fiilterObjs[2]
                   ,"experience": this.fiilterObjs[3]
                   ,"portfolio": this.fiilterObjs[4]
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
            <button class="arrow" id="section-prev">❮</button>
            <button class="arrow" id="section-next">❯</button>
            <div id="section-container"></div>
        `;
        this.#wrapperElement.appendChild(newElement) 
    };

    createNavBar() {
        const navBar = new NavBar(document.querySelector("#wrapper"));
        return navBar;
    };

    createSections() {
        const sections = [
             new IntroductionSection(0, this.sectionIDs[0], document.body.querySelector('#section-container'), this.sectionNames[0])
            ,new SkillsSection(1, this.sectionIDs[1], document.body.querySelector('#section-container'), this.sectionNames[1])
            ,new EducationSection(2, this.sectionIDs[2], document.body.querySelector('#section-container'), this.sectionNames[2])
            ,new ExperiencesSection(3, this.sectionIDs[3], document.body.querySelector('#section-container'), this.sectionNames[3])
            ,new PortfolioSection(4, this.sectionIDs[4], document.body.querySelector('#section-container'), this.sectionNames[4])
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

    addFilterEvents(elements, callbackFunction) {
        // filterTiles() / showArticle() is the callback function
        elements.forEach((filterButton, i) => {

            filterButton.addEventListener('click', (event) => { 
                const filterButton = event.target.closest('.tile-filter-button');
                if (filterButton) {
                    const filterValue = filterButton.dataset.filter;
                    callbackFunction(filterValue);
                };
                const filterButtonMobile = event.target.closest('.mobile-article-filter');
                if (filterButtonMobile) {
                    const filterValue = filterButtonMobile.dataset.filter;
                    callbackFunction(filterValue);
                };
            });
        });
    };

    showArticle(filterObject, filterKeyword) {
        // Hide all articles
        const articles = document.body.querySelectorAll(`#${filterObject.id} article`);
        articles.forEach(article => article.classList.remove('activated'));

        // Show the selected article based on the clicked filter
        const selectedArticle = document.body.querySelector(`#mobile-${filterKeyword}`);
        if (selectedArticle) {
            selectedArticle.classList.add('activated');
        }
    };

    filterTiles(filterObject, filterKeyword) {
        // using the id attribute of the menu item, get the tile objects
        const tiles = document.body.querySelectorAll(`#${filterObject.id} .tile`);
        tiles.forEach(tile => tile.classList.remove('activated'));
    
        // If a tile class attribute matches the filterKeyword, it becomes activated
        tiles.forEach(tile => {
            const tags = Array.from(tile.classList);
            const shouldShow = tags.includes(filterKeyword);
            tile.classList.toggle('activated', shouldShow);
        });
    };

    addEventListeners() {
        const prevArrow = document.querySelector("#section-prev");
        const nextArrow = document.querySelector("#section-next");

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

        // Attach showArticle and filterTiles functions to each of the filter/menu buttons
        this.fiilterObjs.forEach((filterObject, i) => {
            if (filterObject.refNum === 0 || filterObject.refNum === 1 || filterObject.refNum === 2) {
                this.addFilterEvents(filterObject.element.querySelectorAll(`li`), this.showArticle.bind(this, filterObject));
            };
            if (filterObject.refNum === 3 || filterObject.refNum === 4) {
                this.addFilterEvents(filterObject.element.querySelectorAll(`li`), this.filterTiles.bind(this, filterObject));
            };
        });

        // ColourPalette
        this.paletteEl.addEventListener('change', () => {
            const newColour = document.body.querySelector(`#paletteSelector`).value;
            this.updateColorScheme(newColour);
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

    addIntro(email, phone, linkedin, github, background, introduction) {
        // const articleList = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)
        // articleList[0].querySelector('.introduction').textContent = introduction;   //Pc
        // articleList[2].querySelector('.introduction').textContent = introduction;   //Mobile
        const articleEl1 = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[0]; // Pc
        console.log(articleEl1)
        const articleEl2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[2]; // Mobile
        articleEl1.querySelector('.introduction').textContent = introduction;
        articleEl2.querySelector('.introduction').textContent = introduction;

    };

    addEducations(degree, institution) {
        const parentEl1 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[0]; // First Article
        const parentEl2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[2]} article`)[1]; // Second Article
    
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
        const parentIntro = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[1]
        const parentEl1 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[0] // Programming Languages
        const parentEl2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[1] // Hard Skills
        const parentEl3 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[2] // Soft Skills
        const parentIntro2 = this.mainEl.querySelectorAll(`#${this.sectionIDs[0]} article`)[3]
        const parentEl4 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[3] // Programming Languages
        const parentEl5 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[4] // Hard Skills
        const parentEl6 = this.mainEl.querySelectorAll(`#${this.sectionIDs[1]} article`)[5] // Soft Skills

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
        const data = {company, address, position, period, tags, softwares, duties}
        const parentEl = document.body.querySelector(`#${this.sectionIDs[3]} .tile-container`);
        const experienceTile = new HTMLExperienceTile(data, parentEl)
    };

    addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const data = {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages}
        const parentEl = document.body.querySelector(`#${this.sectionIDs[4]} .tile-container`);
        const portfolioTile = new HTMLPortfolioTile(data, parentEl);
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
