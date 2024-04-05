import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';
// import SectionHandler from "./SectionHandler.js";

import NavBarObject from './NavBarObject.js';

class FrontPageObject {


    // Requirements:
        // Dictionary - But this doesnt go into the model
        // Navigation Bar. (it will include the navigation links as objects)
        // Heading? Maybe? Since we have a specific part on the view for it
        // Sections (will include the sub objects)
        // Overlays for the experience?
        // Overlays for the portfolios?



    #dictionary;
    #navBar;
    #sectionHandler;
    #searchTimeout;
    #intCurrInx;

    constructor() {
        this.#dictionary = new Dictionary();
        this.#navBar = new NavBarObject(this, ['About Me', 'Skills', 'Education', 'Experience', 'Portfolio']);
        this.#sectionHandler = null;
        this.#searchTimeout = null;
        this.#intCurrInx = 0;
    };
    get dictionary() {
        return this.#dictionary;
    };
    get sectionHandler() {
        return this.#sectionHandler;
    };
    get sections() {
        return this.#sectionHandler ? this.#sectionHandler.sectionObjectList : [];
    };
    get filters() {
        return this.#sectionHandler ? this.#sectionHandler.sectionFilterList : [];
    };
    get navigationBar() {
        return this.#navBar;
    };
    get currentIndex() {
        return this.#intCurrInx;
    };
    set currentIndex(value) {
        this.#intCurrInx = value;
        if (this.#sectionHandler) {
            this.#sectionHandler.indexCurrent = value;
            this.navigationBar.indexCurrent = value;
        };
    };

    async init() {
        await this.initDictionary();
        clearTimeout(this.#searchTimeout);
        this.#sectionHandler = new SectionHandler(this.#dictionary);
    };

    async initDictionary() {
        const filepath = './ResumeData.json';
        const jsonData = await this.readJSONFile(filepath);
        Object.entries(jsonData).forEach(([key, value]) => this.#dictionary.set(key, value));
    };

    async readJSONFile(filePath) {
        const jsonReader = new JSONReader(filePath);
        await jsonReader.readJSONSync();
        return jsonReader.getData();
    };
};

export default FrontPageObject;