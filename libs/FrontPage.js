import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';
import NavBar from './NavbarObject.js';
import Palette from "./Palette.js";
import SectionHandler from "./SectionHandler.js";

class FrontPage {
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
        // this.#paletteObj = this.createPalette()
        // this.#element = document.querySelector(`#wrapper`)
        this.#dictionary = new Dictionary();
        this.#navBar = new NavBar(this, ['About Me', 'Skills', 'Education', 'Experience', 'Portfolio']);
        this.#sectionHandler = new SectionHandler();
        this.#searchTimeout = null;
        // this.#elArrowPrev = this.initLeftArrow();
        // this.#elArrowNext = this.initRightArrow();
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
        // this.initNavBarLinks();

        // Sections
        // this.initSectionHandler();


        //****** Initialize the Section Handler ******
        // this.sectionHandler.createElement()
        await this.sectionHandler.createSectionObjects(this.resumeData)
        await this.sectionHandler.createFilterMenuObjects(this.resumeData)

        clearTimeout(this.#searchTimeout);      // Stop all the setup async functions

        // this.renderToPage() 

        console.log(this)


        console.log(this.sectionHandler.sectionObjectList[3].subObjects)
        console.log(this.resumeData)
    };


//****** Resume Data Setup ******
    async initDictionary() {
        const filepath = './ResumeData.json';

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

    //****** Colour Palette ******
    createPalette(){
        const paletteInstance = new Palette(this);
        this.updateColorScheme("forest"); //default colour scheme
        return paletteInstance;
    };

};


export default FrontPage;