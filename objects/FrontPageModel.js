import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';
import SectionHandler from "./SectionHandler.js";

class FrontPageModel {
    constructor() {
        this.dictionary = new Dictionary();
        this.sectionHandler = new SectionHandler();
    }

    async init() {
        await this.initDictionary();
        await this.sectionHandler.createSectionObjects(this.dictionary);
        await this.sectionHandler.createFilterMenuObjects(this.dictionary);
    }

    async initDictionary() {
        const filepath = './ResumeData.json';
        const jsonData = await this.readJSONFile(filepath);
        Object.entries(jsonData).forEach(([key, value]) => this.dictionary.set(key, value));
    }

    async readJSONFile(filePath) {
        const jsonReader = new JSONReader(filePath);
        await jsonReader.readJSONSync();
        return jsonReader.getData();
    }
}

export default FrontPageModel;
