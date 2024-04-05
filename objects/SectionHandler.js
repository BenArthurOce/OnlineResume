import {IntroductionSectionObject, EducationSectionObject, SkillSectionObject, ExperienceSectionObject, PortfolioSectionObject} from "./SectionObject.js";
import {IntroductionFilterObject, EducationFilterObject, SkillFilterObject, ExperienceFilterObject, PortfolioFilterObject} from './FilterObject.js';



class SectionHandler {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  Data from Dictionary() class
    #sectionObjectList;             //  Contains each of the Section() objects
    #sectionFilterList;             //  Contains each of the Filter() objects which pair with each Section() object
    #indexCurrent;                  //  Which Section() should currently be displayed on screen

    constructor(data) {
        this.#className = "SectionHandler";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#data = data
        this.#sectionObjectList = this.createSectionObjects(data)
        this.#sectionFilterList = this.createFilterMenuObjects(data)
        this.#indexCurrent = 0;
        this.createElement();
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    set classType(value) {
        this.#classType = value;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get data() {
        return this.#data;
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

    get indexCurrent() {
        return this.#indexCurrent;
    };
    set indexCurrent(value) {
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
        const tempList = [
              new IntroductionSectionObject(data.get("about"), ['Introduction', 'KeySkills'])
            , new SkillSectionObject(data.get("skills"), ['Technical', 'Soft', 'Languages'])
            , new EducationSectionObject(data.get("education"), ['IT', 'Accounting'])
            , new ExperienceSectionObject(data.get("experience"), null)
            , new PortfolioSectionObject(data.get("portfolio"), null)
        ]; 
        return tempList;
    };


//****** Creates the FilterBar() Objects ******
    createFilterMenuObjects(data) {
        const tempList = [
              new IntroductionFilterObject(data.get("about"), ['Introduction', 'KeySkills'])
            , new SkillFilterObject(data.get("skills"), ['Technical', 'Soft', 'Languages'])
            , new EducationFilterObject(data.get("education"), ['IT', 'Accounting'])
            , new ExperienceFilterObject(data.get("experience"), null)
            , new PortfolioFilterObject(data.get("portfolio"), null)
            // , new IntroductionFilterObject
        ];
        return tempList;
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

        experienceTiles.forEach((tile, i) => {

            const callbackFunction = this.filterTiles.bind(this)
            tile.element.addEventListener("click", callbackFunction);

        });
    };




//****** Updates the h1 tag dependant on the current active section object ******
    updateNameOfActiveSection(index) {
        const headingEl = this.element.querySelector(`#section-heading`)
        headingEl.textContent = this.returnSectionObject(index).classType
    };



//****** Creates the element for SectionHandler() ******
    createElement() {
        // console.log("createElement - SectionHandler")
        this.element = document.createElement("main");
        this.element.innerHTML = `
            <h1 id="section-heading">PlaceHolder Heading</h1>
            <div id="main-section-container" class="container for-section"></div>
        `;
    };


//****** Picks which Section() in SectionHandler() that needs to be displayed to the user ******
    toggleActiveSection() {
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



//****** Adds buttons to the FilterBar() object ******
    createFilterButtonObjects() {
        const menuBar = this.returnFilterObject(3)
        menuBar.addButton()
    };


//****** Selects an object from the sectionFilterList and creates the HTML element. Does NOT add it to the DOM******
    createFilterElement(index) {
        this.returnFilterObject(index).createElement();
    };


//****** 
    addExperienceTiles(data) {
        console.log("addExperienceTiles")

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



    addFilterEventsToExperienceSection() {
        const tiles = this.returnSectionSubItems(3)
        // console.log(tiles)

    }

    addFilterEventListeners() {




        // Add Article Filters


        // Add Tile Filters

    }



};

export default SectionHandler;

