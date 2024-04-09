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
        return Array.from(new Set(["Introduction", "KeySkills"]));      // lmao why did i do this
    };

    returnSkillsTypes() {
        const capitalizeFirstLetter = (input) => input.charAt(0).toUpperCase() + input.slice(1);
        const keys = Object.keys(this.dict("skills"))
        return keys.map(key => capitalizeFirstLetter(key));
    };

    returnEducationTypes() {
        // return new Set(this.frontpage.sections[2].data.flatMap(education => education.tags));
        return Array.from(new Set(this.dict("education").flatMap(education => education.tags)));
    };

    returnExperienceTypes() {
        return Array.from(new Set(this.dict("experience").flatMap(experience => experience.tags)));
    };

    returnPortfolioTypes() {
        return Array.from(new Set(this.dict("portfolio").flatMap(project => project.projectTags)));
    };



//****** Starts the class ******
//****** Transforms the JSON file into a dictionary class, creates all the resume website objects that are used in Model() ******
    async init() {
        await this.initDictionary();
        clearTimeout(this.#searchTimeout);
        this.#navigationBar = this.createNavigationBar();       // Creates the Navigation Bar
        this.#allSections = this.createSectionObjects();        // Creates the main content objects - a Section()
        this.#allFilterBars = this.createFilterBarObjects();    // Creates the filter bar that is paired with each Section()

        //Using information in the SectionObject() class, run switch functions that allow the filterbars and subobjects of that SectionObject() to be populated
        this.#allSections.forEach((section) => {
            this.prepareFilterButtonObjects(section.classType);
            this.prepareSectionSubObjects(section.classType);
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
        //console.log(`func = ${"prepareFilterButtonObjects"} ||  key = ${key}`);
        let filter = null; // Set the element to null for the switch function
        let keywords = null

        switch (key) {
            case "About":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------INTRODUCTION-----------------")
                filter = this.returnSingleFilterBar(0);
                keywords = this.returnIntroductionTypes()
                filter.appendSubObject(new ArticleFilterButtonObject(0, "About Me"));
                filter.appendSubObject(new ArticleFilterButtonObject(1, "Key Skills"));

                // filter.appendSubObject(new ArticleFilterButtonObject(0, keywords[0]));
                // filter.appendSubObject(new ArticleFilterButtonObject(1, keywords[1]));

                // keywords.forEach((word, i) => {
                //     filter.appendSubObject(new ArticleFilterButtonObject(i, word));
                // });
                // break;
                break;

            case "Skills":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------SKILLS-----------------")
                filter = this.returnSingleFilterBar(1);
                keywords = this.returnSkillsTypes()
                // filter.appendSubObject(new ArticleFilterButtonObject(0, "Technical"));
                // filter.appendSubObject(new ArticleFilterButtonObject(1, "Soft"));
                // filter.appendSubObject(new ArticleFilterButtonObject(2, "Languages"));

                // filter.appendSubObject(new ArticleFilterButtonObject(0, keywords[0]));
                // filter.appendSubObject(new ArticleFilterButtonObject(1, keywords[1]));
                // filter.appendSubObject(new ArticleFilterButtonObject(2, keywords[2]));
                keywords.forEach((word, i) => {
                    filter.appendSubObject(new ArticleFilterButtonObject(i, word));
                });
                break;

            case "Education":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------EDUCATION-----------------")
                filter = this.returnSingleFilterBar(2);
                keywords = this.returnEducationTypes()
                // filter.appendSubObject(new ArticleFilterButtonObject(0, "IT"));
                // filter.appendSubObject(new ArticleFilterButtonObject(1, "Accounting"));
                // filter.appendSubObject(new ArticleFilterButtonObject(0, keywords[0]));
                // filter.appendSubObject(new ArticleFilterButtonObject(1, keywords[1]));
                keywords.forEach((word, i) => {
                    filter.appendSubObject(new ArticleFilterButtonObject(i, word));
                });
                break;

            case "Experience":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------EXPERIENCE-----------------")
                filter = this.returnSingleFilterBar(3);
                keywords = this.returnExperienceTypes();

                filter.appendSubObject(new TileFilterButtonObject(99, "All"));
                keywords.forEach((word, i) => {
                    filter.appendSubObject(new TileFilterButtonObject(i, word));
                });
                break;

            case "Portfolio":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------PORTFOLIO-----------------")
                filter = this.returnSingleFilterBar(4);
                keywords = this.returnPortfolioTypes();

                filter.appendSubObject(new TileFilterButtonObject(99, "All"));
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
        //console.log(`func = ${"prepareSectionSubObjects"} ||  key = ${key}`);

        let section = null; // Set the element to null for the switch function
        let info;   // Relevant resume data
        let index; let title; let data; let isActive;
        switch (key) {
            case "About":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------INTRODUCTION-----------------")
                info = this.dict("about");
                section = this.returnSingleSection(0);
                section.appendSubObject(new IntroductionArticleObject(index=0, title="About Me",    data=info,              isActive=false));
                section.appendSubObject(new IntroductionArticleObject(index=1, title="Key Skills",  data=info["keySkills"], isActive=false));
                break;

            case "Skills":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------SKILLS-----------------")
                info = this.dict("skills");
                section = this.returnSingleSection(1);
                // section.appendSubObject(new SkillArticleObject(index=0, title="Technical", data=info["technical"],  isActive=false));
                // section.appendSubObject(new SkillArticleObject(index=1, title="Soft",      data=info["soft"],       isActive=false));
                // section.appendSubObject(new SkillArticleObject(index=2, title="Languages", data=info["languages"],  isActive=false));
                section.appendSubObject(new SkillArticleObject(index=0, title="Technical", data=info["technical"],  isActive=false));
                section.appendSubObject(new SkillArticleObject(index=1, title="Languages", data=info["languages"],  isActive=false));
                section.appendSubObject(new SkillArticleObject(index=2, title="Soft",      data=info["soft"],       isActive=false));
                break;

            case "Education":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------EDUCATION-----------------")
                section = this.returnSingleSection(2);

                const listComputerJobs = [];
                const listAccountingJobs = [];
                
                info = this.dict("education");
                info.forEach((element, i) => {
                    if (element.tags.includes("IT")) {
                        const newEntry = `${element.degree} - ${element.institution}`
                        listComputerJobs.push(newEntry)
                    } else if (element.tags.includes("Finance")) {
                        const newEntry = `${element.degree} - ${element.institution}`
                        listAccountingJobs.push(newEntry)
                    }
                });

                section.appendSubObject(new EducationArticleObject(index=0, title="IT",         data=listComputerJobs,      isActive=false));
                section.appendSubObject(new EducationArticleObject(index=1, title="Finance",    data=listAccountingJobs,    isActive=false));
                break;

            case "Experience":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------EXPERIENCE-----------------")
                section = this.returnSingleSection(3);
                this.dict("experience").forEach((job, i) => {
                    section.appendSubObject(new ExperienceTileObject(i, title="placehold", data=job, isActive=false));
                });
                break;

            case "Portfolio":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------PORTFOLIO-----------------")
                section = this.returnSingleSection(4);
                this.dict("portfolio").forEach((project, i) => {
                    section.appendSubObject(new PortfolioTileObject(index=i, title="placehold", data=project, isActive=false));
                });
                break;
                
            default:
                console.error("Unknown section key: " + key);
        };
    };
};

export default FrontPageObject;