import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';
import NavBar from './NavbarObject.js';
import Palette from "./Palette.js";
import SectionHandler from "./SectionHandler.js";

class FrontPage {
    #dictionary;
    #navBar;
    #sectionHandler;
    #searchTimeout;
    #intCurrInx;

    constructor() {
        this.#dictionary = new Dictionary();
        this.#navBar = new NavBar(this, ['About Me', 'Skills', 'Education', 'Experience', 'Portfolio']);
        this.#sectionHandler = null;
        this.#searchTimeout = null;
        this.#intCurrInx = 0;
    };
    get resumeData() {
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

    createPalette() {
        const paletteInstance = new Palette(this);
        this.updateColorScheme("forest"); //default colour scheme
        return paletteInstance;
    };

    updateColorScheme(scheme) {
        // Implementation for updating color scheme
    };
}

export default FrontPage;