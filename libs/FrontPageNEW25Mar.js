// import { IntroductionSection, EducationSection, SkillsSection, ExperiencesSection, PortfolioSection } from './Section.js';
import NavBar from './HTMLnavbar.js';
// import ResumeData from './factoryResumeData.js';
// // import HTMLexperienceTile from './HTMLexperienceTile.js';
// // import HTMLportfolioTile from './HTMLportfolioTile.js';
// import {ExperienceTile, PortfolioTile } from './Tile.js';

import HTMLPalette from "./HTMLPalette.js";
import SectionHandler from "./SectionHandler.js";

import JSONReader from "./JSONReader.js";
import Dictionary from './Dictionary.js';

class FrontPageNEW {
    //There is no parent element for this. This is the top level
    #paletteObj;        // A colour palette picker that stays in the FrontPage() - I should make a class for it
    #element;           // The element of the FrontPage() object, its just the wrapper
    #dictionary;        // The object where the resume data is kept
    #navBar;            // Navigation Bar. Sits at top of page and updates the current index number if interacted with
    #sectionHandler;    // This object contains all the Section() objects and decides which one to display
    #searchTimeout;     //
    #elArrowPrev;       // Left arrow element. Exists to change the internal Index number of the FrontPage()
    #elArrowNext;       // Right arrow element. Exists to change the internal Index number of the FrontPage()
    #intCurrInx;        // Current index number. Used to determine what Section() and NavLink() to show to the user

    constructor() {
        this.#paletteObj = this.createPalette()
        this.#element = document.querySelector(`#wrapper`)
        this.#dictionary = new Dictionary();
        this.#navBar = new NavBar(this, ['About Me', 'Skills', 'Education', 'Experience', 'Portfolio']);
        this.#sectionHandler = new SectionHandler();
        this.#searchTimeout = null;
        this.#elArrowPrev = this.initLeftArrow();
        this.#elArrowNext = this.initRightArrow();
        // this.#intPrevInx = null;
        this.#intCurrInx = 0;

        this.init();
    };
    get element() {
        return this.#element;
    };
    get resumeData() {
        return this.#dictionary;
    };
    get sectionHandler() {
        return this.#sectionHandler;
    };
    get sections() {
        return this.#sectionHandler.sectionObjectList;
    };
    get filters() {
        return this.#sectionHandler.sectionFilterList;
    };
    get navigationBar() {
        return this.#navBar;
    };
    get previousArrow() {
        return this.#elArrowPrev;
    };
    get nextArrow() {
        return this.#elArrowNext;
    };
    get currentIndex() {
        return this.#intCurrInx;
    };
    set currentIndex(value) {
        this.#intCurrInx = value;
        this.sectionHandler.indexCurrent = value;        // Changing the index number also automatically updates the sections
        this.navigationBar.indexCurrent = value;         // Changing the index number also automatically updates the navbar
    };

    returnSection(index) {
        return this.sectionHandler.sectionObjectList[index]
    }

//****** Append to Front Page ******
    appendToFrontPage(object) {
        this.element.appendChild(object.element)
    };


//****** Initialize the Front Page ******
    async init() {



        await this.initDictionary();
        clearTimeout(this.#searchTimeout);      // Stop all the setup async functions

        // Resume data is now accessible


        // Navbar links
        this.initNavBarLinks();

        // Sections
        // this.initSectionHandler();


        //****** Initialize the Section Handler ******
        // this.sectionHandler.createElement()
        await this.sectionHandler.createSectionObjects(this.resumeData)
        await this.sectionHandler.createFilterMenuObjects(this.resumeData)

        clearTimeout(this.#searchTimeout);      // Stop all the setup async functions

        // console.log("-----")
        // console.log(this)
        // await this.printObjectTree(this);

        // this.walk(this)

        this.renderToPage() 


    };



//****** Render Everything to Dom ******
    renderToPage() {

        document.body.appendChild(this.previousArrow);
        document.body.appendChild(this.nextArrow);
        // this.element.appendChild(this.navigationBar.element)  


        // this.sectionHandler.element.appendChild()
        // this.sectionHandler.element.appendChild()
        // this.sectionHandler.element.appendChild()
        // this.sectionHandler.element.appendChild()
        // this.sectionHandler.element.appendChild()

        
        // console.log(allSections)

        // this.sectionHandler.element.appendChild()

        // console.log(this.element)

        const allSections = this.sectionHandler.sectionObjectList
        console.log(allSections)

        // Section Object
        allSections.forEach((section, i) => {
            // console.log(`element: ${element}  index: ${ i}`);
            console.log(section.element)

            // Section Element
            this.sectionHandler.element.appendChild(section.element)
        });
        


        // FrontPage() object
        this.element.appendChild(this.sectionHandler.element)
    };





//****** Navigation Bar ******
    initNavBarLinks() {
        this.navigationBar.links.forEach((link, index) => {
            link.element.addEventListener('click', () => {
                this.currentIndex = index
            });
        });
    };





//****** Resume Data Setup ******
    async initDictionary() {
        const filepath = './resumeDataJSON.json';

        // Find the JSON file and read the data
        const jsonData = await this.readJSONFile(filepath);

        // Go through each JSON item and add it to the Dictionary() class
        Object.entries(jsonData).forEach(([key, value]) => this.#dictionary.set(key, value));
    };


    async readJSONFile(filePath) {
        const jsonReader = new JSONReader(filePath);
        await jsonReader.readJSONSync();
        return jsonReader.getData();
    };




//****** Left and Right Arrows ******
    initLeftArrow() {
        const prevButton = document.createElement('button');
        prevButton.classList.add('arrow', 'prev', 'for-section');
        prevButton.textContent = '❮';
        prevButton.addEventListener('click', () => {
            this.decrementActiveNumber()
        });
        return prevButton
    };

    initRightArrow() {
        const nextButton = document.createElement('button');
        nextButton.classList.add('arrow', 'next', 'for-section');
        nextButton.textContent = '❯';
        nextButton.addEventListener('click', () => {
            this.incrementActiveNumber()
        });
        return nextButton
    };


    decrementActiveNumber() {
        const numSections = this.sectionHandler.sectionObjectList.length;
        this.currentIndex = (this.currentIndex - 1 + numSections) % numSections;

        this.sectionHandler.indexCurrent = this.#intCurrInx
    };


    incrementActiveNumber() {
        // console.log("incrementActiveNumber")
        const numSections = this.sectionHandler.sectionObjectList.length;
        let a 
        a = this.currentIndex 
        let b 
        b = (a + 1 + numSections) % numSections;

        // this.currentIndex = (this.currentIndex + 1 + numSections) % numSections;

        this.currentIndex = b

        // this.sectionHandler.indexCurrent = b
    };


//****** Colour Palette ******
    createPalette(){
        const paletteInstance = new HTMLPalette(this);
        this.updateColorScheme("forest"); //default colour scheme
        return paletteInstance;
    };

    updateColorScheme(newColour) {
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };

}





export default FrontPageNEW;