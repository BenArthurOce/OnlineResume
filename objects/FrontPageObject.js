import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';

import NavBarObject from './NavBarObject.js';
import NavLinkObject from './NavlinkObject.js';

import {IntroductionFilterBarObject, EducationFilterBarObject, SkillFilterBarObject, ExperienceFilterBarObject, PortfolioFilterBarObject} from './FilterBarObject.js';
import {ArticleFilterButtonObject, TileFilterButtonObject} from "./FilterButtonObject.js"

import {IntroductionSectionObject, EducationSectionObject, SkillSectionObject, ExperienceSectionObject, PortfolioSectionObject} from "./SectionObject.js";
import {IntroductionArticleObject, SkillArticleObject, EducationArticleObject} from "./ArticleObject.js"
import {ExperienceTileObject, PortfolioTileObject} from "./TileObject.js"


class FrontPageObject {

    #dictionary;            // Entire class that holds the dictionary of resume data. Can be called by using the method "dict()"
    #sectionKeys;           // [Description Required]
    #navigationTitles;      // [Description Required]
    #navigationBar;         // The NavBarObject()
    #allFilterBars;         // An array of all the FilterBarObject()
    #allSections;           // An array of all the SectionObject()
    #searchTimeout;         // [Description Required]
    #index;                 // [Description Required]

    constructor() {
        this.#dictionary        = new Dictionary();
        this.#sectionKeys       = ['About', 'Skills', 'Education', 'Experience', 'Portfolio'];
        this.#navigationTitles  = ['About Me', 'Skills', 'Education', 'Experience', 'Portfolio'];
        this.#navigationBar     = null
        this.#allFilterBars     = null;
        this.#allSections       = null;
        this.#searchTimeout     = null;
        this.#index             = 0;
        this.init();
    };
    get navigation() {
        return this.#navigationBar;
    };
    get filters() {
        return this.#allFilterBars;
    };
    get sections() {
        return this.#allSections;
    };
    get currentIndex() {
        return this.#index;
    };
    set currentIndex(value) {
        this.#index = value;
        if (this.#allSections) {
            this.#allSections.indexCurrent = value;
            this.navigation.indexCurrent = value;
        };
    };

    dict(key) {
        return this.#dictionary.get(key);
    };

    returnSingleFilterBar(i) {
        return this.#allFilterBars[i];
    };

    returnSingleSection(i) {
        return this.#allSections[i];
    };

    returnIntroductionTypes() {
        return new Set(["Introduction", "KeySkills"]);
    };

    returnSkillsTypes() {
        // return new Set(Object.keys(this.frontpage.sections[1].data).map(key => key.charAt(0).toUpperCase() + key.slice(1)));
        return ["Technical", "Soft", "Languages"]
    };

    returnEducationTypes() {
        // return new Set(this.frontpage.sections[2].data.flatMap(education => education.tags));
        return ["IT", "Accounting"]
    };

    returnExperienceTypes() {
        return Array.from(new Set(this.dict("experience").flatMap(experience => experience.tags)));
    };

    returnPortfolioTypes() {
        return Array.from(new Set(this.dict("portfolio").flatMap(project => project.projectTags)));
    };


  //****** Starts the class ******  
    async init() {
        await this.initDictionary();
        clearTimeout(this.#searchTimeout);
        this.#navigationBar = this.createNavigationBar();
        this.#allSections = this.createSectionObjects();
        this.#allFilterBars = this.createFilterBarObjects();


        this.#sectionKeys.forEach((key) => {
            this.prepareFilterButtonObjects(key);
            this.prepareSectionSubObjects(key);
        });
    };

//****** Creates and populates the Dictionary attribute in this class ******
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


//****** Creates the Navigation Bar and the links inside it ******
    createNavigationBar() {
        const navbar = new NavBarObject();
        this.#navigationTitles.forEach((title, i) => {
            navbar.appendLink(new NavLinkObject(title))
        });
        return navbar;
    };


//****** Creates the Section() objects and added to class ******
    createSectionObjects() {
        let index = null
        return [
              new IntroductionSectionObject(index = 0)
            , new SkillSectionObject(index = 1)
            , new EducationSectionObject(index = 2)
            , new ExperienceSectionObject(index = 3)
            , new PortfolioSectionObject(index = 4)
        ]; 
    };

//****** Creates the FilterBar() Objects ******
    createFilterBarObjects() {
        let index = null
        return [
              new IntroductionFilterBarObject(index = 0)
            , new SkillFilterBarObject(index = 1)
            , new EducationFilterBarObject(index = 2)
            , new ExperienceFilterBarObject(index = 3)
            , new PortfolioFilterBarObject(index = 4)
        ]; 
    };

//****** Create Articles and Tiles for the subobjects ******
    prepareFilterButtonObjects(key) {
        // console.log(`func = ${"prepareFilterButtonObjects"} ||  key = ${key}`);
        let filter = null; // Set the element to null for the switch function
        let keywords = null

        switch (key) {
            case "About":
                filter = this.returnSingleFilterBar(0);
                filter.appendSubObject(new ArticleFilterButtonObject(0, "About Me"));
                filter.appendSubObject(new ArticleFilterButtonObject(1, "Key Skills"));
                break;
            case "Skills":
                filter = this.returnSingleFilterBar(1);
                filter.appendSubObject(new ArticleFilterButtonObject(0, "Technical"));
                filter.appendSubObject(new ArticleFilterButtonObject(1, "Soft"));
                filter.appendSubObject(new ArticleFilterButtonObject(2, "Languages"));
                break;
            case "Education":
                filter = this.returnSingleFilterBar(2);
                filter.appendSubObject(new ArticleFilterButtonObject(0, "IT"));
                filter.appendSubObject(new ArticleFilterButtonObject(1, "Accounting"));
                break;
            case "Experience":
                filter = this.returnSingleFilterBar(3);
                keywords = this.returnExperienceTypes();

                keywords.forEach((word, i) => {
                    filter.appendSubObject(new TileFilterButtonObject(i, word));
                });
                break;
            case "Portfolio":
                filter = this.returnSingleFilterBar(4);
                keywords = this.returnPortfolioTypes();

                keywords.forEach((word, i) => {
                    filter.appendSubObject(new TileFilterButtonObject(i, word));
                });
                break;
            default:
                console.error("Unknown section key: " + key);
        };
    };



//****** Create Articles and Tiles (SubObjects) for the Sections ******
    prepareSectionSubObjects(key) {
        // console.log(`func = ${"prepareSectionSubObjects"} ||  key = ${key}`);

        let section = null; // Set the element to null for the switch function
        let info;   // Relevant resume data
        let index; let title; let data;
        switch (key) {
            case "About":
                info = this.dict("about");
                section = this.returnSingleSection(0);
                section.appendSubObject(new IntroductionArticleObject(index=0, title="About Me", data=info));
                section.appendSubObject(new IntroductionArticleObject(index=1, title="Key Skills", data=info["keySkills"]));
                break;
            case "Skills":
                info = this.dict("skills");
                section = this.returnSingleSection(1);
                section.appendSubObject(new IntroductionArticleObject(index=0, title="Technical", data=info["technical"]));
                section.appendSubObject(new IntroductionArticleObject(index=1, title="Soft",      data=info["soft"]));
                section.appendSubObject(new IntroductionArticleObject(index=2, title="Languages", data=info["languages"]));
                break;
            case "Education":
                section = this.returnSingleSection(2);
                section.appendSubObject(new IntroductionArticleObject(0, "IT",          data={}));
                section.appendSubObject(new IntroductionArticleObject(1, "Accounting",  data={}));
                break;
            case "Experience":
                section = this.returnSingleSection(3);
                this.dict("experience").forEach((job, i) => {
                    // console.log(job['tags'])
                    section.appendSubObject(new ExperienceTileObject(i, "aa", job));
                });
                break;
            case "Portfolio":
                section = this.returnSingleSection(4);
                this.dict("portfolio").forEach((project, i) => {
                    section.appendSubObject(new PortfolioTileObject(i, "aa", project));
                });
                break;
            default:
                console.error("Unknown section key: " + key);
        };
    };
};

export default FrontPageObject;