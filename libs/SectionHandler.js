import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './Section.js';
import {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter} from "./HTMLFilter.js";
import {ExperienceTile, PortfolioTile } from './Tile.js';


class SectionHandler {
    #className; // The name of the class
    #sectionObjectList; // Contains each of the Section() objects
    #sectionFilterList; // Contains each of the Filter() objects which pair with each Section() object
    // #parentObject; // The object that contains this class
    #element; // The DOM element of this class
    #indexCurrent; // Which Section() should currently be displayed on screen
    #indexChangeCallback; // What happens automatically when an Index number is changed
    constructor() {
        this.#className = "SectionHandler";
        this.#sectionObjectList = [];
        this.#sectionFilterList = []
        // this.#parentObject = document.querySelector("#wrapper");
        this.#element = null
        this.#indexCurrent = 0;
        this.createElement();
    };
    get className() {
        return this.#className;
    };
    get sectionObjectList() {
        return this.#sectionObjectList;
    };
    set sectionObjectList(value) {
        this.#sectionObjectList = value;
    };
    get sectionFilterList() {
        return this.#sectionFilterList;
    };
    set sectionFilterList(value) {
        this.#sectionFilterList = value;
    };
    // get parentObject() {
    //     return this.#parentObject;
    // };
    // set parentObject(value) {
    //     this.#parentObject = value;
    // };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get indexCurrent() {
        return this.#indexCurrent;
    };
    set indexCurrent(value) {
        // console.log("indexCurrent")
        this.#indexCurrent = value;
        this.toggleActiveSection(); // Call toggleActiveSection whenever index changes
    };

    addSection() {

    }

    addFilterBar() {

    }


    returnSectionObject(index) {
        return this.sectionObjectList[index];
    };
    returnFilterObject(index) {
        return this.sectionFilterList[index];
    };
    returnSectionSubItems(index) {
        return this.sectionObjectList[index].subObjects
    };


//****** Creates the Section() objects and added to class ******
    createSectionObjects(data) {
        this.sectionObjectList = [
              new IntroductionSection(data.get("about"), ['Introduction', 'KeySkills'])
            , new SkillsSection(data.get("skills"), ['Technical', 'Soft', 'Languages'])
            , new EducationSection(data.get("education"), ['IT', 'Accounting'])
            , new ExperiencesSection(data.get("experience"), null)
            , new PortfolioSection(data.get("portfolio"), null)
        ]; 
    };


//****** Creates the FilterBar() Objects ******
    createFilterMenuObjects(data) {
        this.sectionFilterList = [
            new IntroductionFilter(data.get("about"), ['Introduction', 'KeySkills'])
            , new SkillsFilter(data.get("skills"), ['Technical', 'Soft', 'Languages'])
            , new EducationFilter(data.get("education"), ['IT', 'Accounting'])
            , new ExperienceFilter(data.get("experience"), null)
            , new PortfolioFilter(data.get("portfolio"), null)
        ];
    };


    filterTiles(event) {
        console.log("filterTiles")
        console.log(event)
    };
 
    filterSubObjectsInSection(sectionIndex, filterKey) {
        const subObjects = this.returnSectionSubItems(sectionIndex)
        // console.log(subObjects)


        subObjects.forEach((element, i) => {
            // console.log(`element: ${element}  index: ${ i}`);

            // console.log(element.data.tags)

            if (element.data.tags.includes(filterKey)) {
                // console.log(element)
                element.toggleOn()
            } else {
                element.toggleOff()
            }
        });
    };


//****** Apply Event Listeners ******
    createEventListeners() {
        console.log("function:  createEventListeners")
        const experienceTiles = this.returnSectionSubItems(3)
        const portfolioTiles = this.returnSectionSubItems(4)

        const filterButtons = this.returnFilterObject(3)
        console.log(filterButtons)

        experienceTiles.forEach((tile, i) => {

            // tile.addEventListener('click', () => {

            // });

            const callbackFunction = this.filterTiles.bind(this)
            console.log(callbackFunction)
            tile.element.addEventListener("click", callbackFunction);

            // console.log(`element: ${tile}  index: ${ i}`);

        });

        // console.log(experienceTiles)
    };

    // prevArrow.addEventListener('click', () => {
    //     this.adjustDisplayedSection("-1");
    // });

    // filterTiles(event) {
    //     // Code to handle if the button icon was pressed, or the background of the icon
    //     let { class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.parentElement.attributes;
    //     if (dataIndex === undefined) {
    //         ({ class: btnClass, role, dataParent, dataIndex, dataFilter, title } = event.target.attributes);
    //     };

    //     // Get a list of all the tiles in the same section and remove all of them
    //     const tiles = document.body.querySelectorAll(`#${dataParent.value} .tile`);
    //     tiles.forEach(tile => tile.classList.remove('activated'));
    
    //     // If a tile class attribute matches the filterKeyword, it becomes activated
    //     tiles.forEach(tile => {
    //         const tags = Array.from(tile.classList);
    //         const shouldShow = tags.includes(dataFilter.value);
    //         tile.classList.toggle('activated', shouldShow);
    //     });
    // };


//****** Updates the h1 tag dependant on the current active section object ******
    updateNameOfActiveSection(index) {
        const headingEl = this.element.querySelector(`#section-heading`)
        headingEl.textContent = this.returnSectionObject(index).classType
    };



//****** Creates the element for SectionHandler() ******
    createElement() {
        console.log("createElement - SectionHandler")
        this.element = document.createElement("main");
        this.element.innerHTML = `
            <h1 id="section-heading">PlaceHolder Heading</h1>
            <div id="main-section-container" class="container for-section"></div>
        `;
    };


//****** Picks which Section() in SectionHandler() that needs to be displayed to the user ******
    toggleActiveSection() {
        // console.log("toggleActiveSection")
        this.sectionObjectList.forEach((section, index) => {
            if (index === this.#indexCurrent) {
                section.toggleOn();
            } else {
                section.toggleOff();
            }
        });

        this.sectionFilterList.forEach((filter, index) => {
            if (index === this.#indexCurrent) {
                filter.toggleOn();
            } else {
                filter.toggleOff();
            }
        });

        this.updateNameOfActiveSection(this.#indexCurrent)
    };





//****** Selects an object from the sectionObjectList and creates the HTML element. Does NOT add it to the DOM******
    createSectionElement(index) {
        // this.returnSectionObject(index).createElement();
        // this.returnSectionObject(index).applyInfoToElement();
    };





//****** Adds buttons to the FilterBar() object ******
    createFilterButtonObjects() {

        const menuBar = this.returnFilterObject(3)
        // console.log(menuBar)
        menuBar.addButton()
    }


//****** Selects an object from the sectionFilterList and creates the HTML element. Does NOT add it to the DOM******
    createFilterElement(index) {
        this.returnFilterObject(index).createElement();
    };

    // appendFilterElement




//****** 
    appendSectionsAndFilters() {
        // console.log("appendSectionsAndFilters")
        for (let i = 0; i < this.sectionObjectList.length; i++) {
            // console.log(i)
            // Create section element
            // this.createSectionElement(i);
            // Append section element to SectionHandler element
            // this.element.querySelector('.for-section').appendChild(this.returnSectionElement(i));

            // this.element.appendChild(this.returnSectionElement(i))

            // this.returnFilterElement(i).appendToParent()

            // Create filter element
            // this.createFilterElement(i);
            // Append filter element to SectionHandler element
            // this.element.querySelector('.for-filter').appendChild(this.returnFilterElement(i));

            // this.element.appendChild(this.returnFilterElement(i))

            // this.returnFilterObject(i).appendToParent()
            // this.returnSectionObject(i).appendToParent()


        }
    };


    // for (const {company, address, position, period, extraInfo, tags, softwares, duties} of myExperiences) {
    //     frontpage.addExperienceTile(company, address, position, period, extraInfo, tags, softwares, duties)
    // };


    // for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
    //     frontpage.addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages)
    // };


//****** 
    createASingleTile() {
        //maybe? Kinda need to loop through the tiles
    }

//****** 
    addExperienceTiles(data) {

        const sectionObject = this.returnSectionObject(3)
        // console.log(sectionObject)

        const parentELTemp = this.element.querySelector(`#experience-tile-container`)
        //maybe? Kinda need to loop through the tiles
        // console.log(data)

        const experienceData = data.get("experience")

        experienceData.forEach((job, i) => {
            //   console.log(`job: ${job}  index: ${ i}`);

            //   console.log(job)


            //   const newTile = new ExperienceTile(job, this.returnSectionElement(3))
            const newTile = new ExperienceTile(job, parentELTemp)
            sectionObject.addSubObject(newTile)
            // console.log(newTile)


        });

        // SECTIONOBJECT.subObjects.push

    };

    addPortfolioTiles(data) {
        // const sectionObject = this.returnSectionElement(4)

        const sectionObject = this.returnSectionObject(4)
        const parentELTemp = this.element.querySelector(`#portfolio-tile-container`)
        const portfolioData = data.get("portfolio")

        portfolioData.forEach((project, i) => {
            //   console.log(`job: ${job}  index: ${ i}`);

            //   console.log(job)


            //   const newTile = new ExperienceTile(job, this.returnSectionElement(3))
            const newTile = new PortfolioTile(project, parentELTemp)
            // console.log(newTile)
        });
        //maybe? Kinda need to loop through the tiles
    };


    // addExperienceTileOLD(company, address, position, period, extraInfo, tags, softwares, duties) {
    //     const data = {company, address, position, period, extraInfo, tags, softwares, duties}
    //     console.log(this.sectionIDs[3])
    //     const parentEl = document.body.querySelector(`#${this.sectionIDs[3]} .container.for-tile`);
    //     const experienceTile = new ExperienceTile(data, parentEl)
    // };.


    addFilterEventsToExperienceSection() {
        const tiles = this.returnSectionSubItems(3)
        // console.log(tiles)

    }

    addFilterEventListeners() {




        // Add Article Filters


        // Add Tile Filters

    }

    // // All buttons inside the menu bars
    // this.filterBarObjs.forEach((filterBarObject, i) => {
    //     if (filterBarObject.refNum === 0 || filterBarObject.refNum === 1 || filterBarObject.refNum === 2) {
    //         const filterButtons = filterBarObject.element.querySelectorAll(`li`)
    //         filterButtons.forEach((button, i) => {
    //             const callbackFunction = this.showArticle.bind(this)
    //             button.addEventListener("click", callbackFunction);
    //         });
    //     };
    //     if (filterBarObject.refNum === 3 || filterBarObject.refNum === 4) {
    //         const filterButtons = filterBarObject.element.querySelectorAll(`li`)
    //         filterButtons.forEach((button, i) => {
    //             const callbackFunction = this.filterTiles.bind(this)
    //             button.addEventListener("click", callbackFunction);
    //         });
    //     };
    // });


};

export default SectionHandler


// console.log(filters)
// filters[4].createFilterElement()

// // this.#filterBars = filters
// this.sectionFilterList = filters;

// console.log(filters[4])
// console.log(filters[4].element)
// this.parentEl.appendChild(filters[4].element)

// // document.body.querySelectorAll(`#wrapper`).appendChild(this.sectionFilterList[1].element)