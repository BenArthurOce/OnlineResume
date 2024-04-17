import JSONReader from '../data/JSONReader.js';
import Dictionary from '../data/Dictionary.js';

import NavBarObject from './NavbarObject.js';
import NavLinkObject from './NavlinkObject.js';

import {IntroductionFilterBarObject, EducationFilterBarObject, SkillFilterBarObject, ExperienceFilterBarObject, PortfolioFilterBarObject} from './FilterBarObject.js';
import {ArticleFilterButtonObject, TileFilterButtonObject} from "./FilterButtonObject.js"

import {IntroductionSectionObject, EducationSectionObject, SkillSectionObject, ExperienceSectionObject, PortfolioSectionObject} from "./SectionObject.js";
import {IntroductionArticleObject, SkillArticleObject, EducationArticleObject} from "./ArticleObject.js"
import {ExperienceTileObject, PortfolioTileObject} from "./TileObject.js"
import {ExperienceOverlayObject, PortfolioOverlayObject} from "./OverlayObject.js"

import PaletteObject from './PaletteObject.js';


class FrontPageObject {

    #dictionary;            // Entire class that holds the dictionary of resume data. Can be called by using the method "dict()"
    #paletteObject;         // Reads colours.css and returns a list of selectable styles
    #sectionKeys;           // [Description Required]
    #navigationTitles;      // [Description Required]
    #navigationBar;         // The NavBarObject()
    #allFilterBars;         // An array of all the FilterBarObject()
    #allSections;           // An array of all the SectionObject()
    #searchTimeout;         // [Description Required]
    #index;                 // [Description Required]
    #overlaysExperience
    #overlaysPortfolio


    constructor() {
        this.#dictionary        = new Dictionary();
        this.#paletteObject     = null
        this.#sectionKeys       = ['About', 'Skills', 'Education', 'Experience', 'Portfolio'];
        this.#navigationTitles  = ['About', 'Skills', 'Education', 'Experience', 'Portfolio'];
        this.#navigationBar     = null
        this.#allFilterBars     = null;
        this.#allSections       = null;
        this.#searchTimeout     = null;
        this.#index             = 0;

        this.#overlaysExperience = [];
        this.#overlaysPortfolio = [];
        clearTimeout(null)
    };
    get navigation() {
        return this.#navigationBar;
    };
    get palette() {
        return this.#paletteObject;
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

    async getPalette() {
        return this.#paletteObject;
    };

    async getNavigation() {
        return this.#navigationBar;
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
        return Array.from(new Set(this.dict("education").flatMap(education => education.tags)));
    };

    returnExperienceTypes() {
        return Array.from(new Set(this.dict("experience").flatMap(experience => experience.tags)));
    };

    returnPortfolioTypes() {
        return Array.from(new Set(this.dict("portfolio").flatMap(project => project.projectTags)));
    };

    returnExperienceOverlays() {
        return this.#overlaysExperience;
    };

    returnPortfolioOverlays() {
        return this.#overlaysPortfolio;
    };


//****** Starts the class ******
//****** Transforms the JSON file into a dictionary class, creates all the resume website objects that are used in Model() ******
    async init() {
        console.log("FRONTPAGE:   init");
        await this.initDictionary();
        clearTimeout(this.#searchTimeout);
        this.#paletteObject = await this.createPaletteObject();       // Creates the Colour Palette
        this.#navigationBar = await this.createNavigationBar();       // Creates the Navigation Bar
        this.#allSections   = await this.createSectionObjects();      // Creates the main content objects - a Section()
        this.#allFilterBars = await this.createFilterBarObjects();    // Creates the filter bar that is paired with each Section()

        //Using information in the SectionObject() class, run switch functions that allow the filterbars and subobjects of that SectionObject() to be populated
        this.#allSections.forEach((section) => {
            this.prepareFilterButtonObjects(section.classType);
            this.prepareSectionSubObjects(section.classType);
            this.prepareOverlayObjects(section.classType)
        });
    };

//****** Creates and populates the Dictionary attribute in this class ******
    async initDictionary() {
        console.log("FRONTPAGE:   initDictionary");
        const filepath = './data/ResumeData.json';
        const jsonData = await this.readJSONFile(filepath);
        Object.entries(jsonData).forEach(([key, value]) => this.#dictionary.set(key, value));

    };    

    async readJSONFile(filePath) {
        console.log("FRONTPAGE:   readJSONFile");
        const jsonReader = new JSONReader(filePath);
        await jsonReader.readJSONSync();
        return jsonReader.getData();
    };


//****** Creates the Navigation Bar and the links inside it ******
    async createPaletteObject() {
        console.log("FRONTPAGE:   createPaletteObject");
        const palette = new PaletteObject();
        await palette.init()
        return palette;
    };


//****** Creates the Navigation Bar and the links inside it ******
    async createNavigationBar() {
        console.log("FRONTPAGE:   createNavigationBar");
        let index; let title; let isActive;
        const navbar = new NavBarObject();
        this.#navigationTitles.forEach((heading, i) => {
            navbar.appendLink(new NavLinkObject(
                              index=i
                            , title=heading
                            , isActive=false
                        ))
        });
        return navbar;
    };


//****** Creates the Section() objects and added to class ******
    async createSectionObjects() {
        console.log("FRONTPAGE:   createSectionObjects");
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
    async createFilterBarObjects() {
        console.log("FRONTPAGE:   createFilterBarObjects");
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
    async prepareFilterButtonObjects(key) {
        console.log("FRONTPAGE:   prepareFilterButtonObjects");
        //console.log(`func = ${"prepareFilterButtonObjects"} ||  key = ${key}`);
        let filter = null; // Set the element to null for the switch function
        let keywords = null
        let index; let title; let isActive;

        switch (key) {
            case "About":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------INTRODUCTION---------------------")
                filter = this.returnSingleFilterBar(0);
                keywords = this.returnIntroductionTypes()
                filter.appendSubObject(new ArticleFilterButtonObject(index=0, title="Introduction", isActive=false));
                filter.appendSubObject(new ArticleFilterButtonObject(index=1, title="Key Skills",   isActive=false));
                break;

            case "Skills":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("------------------SKILLS--------------------------")
                filter = this.returnSingleFilterBar(1);
                keywords = this.returnSkillsTypes()
                keywords.forEach((word, i) => {
                    filter.appendSubObject(new ArticleFilterButtonObject(
                                              index = i
                                            , title = word
                                            , isActive = false
                                        ));
                });
                break;

            case "Education":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("------------------EDUCATION-----------------------")
                filter = this.returnSingleFilterBar(2);
                keywords = this.returnEducationTypes()
                keywords.forEach((word, i) => {
                    filter.appendSubObject(new ArticleFilterButtonObject(
                                              index = i
                                            , title = word
                                            , isActive = false
                                        ));
                });
                break;

            case "Experience":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------EXPERIENCE-----------------------")
                filter = this.returnSingleFilterBar(3);
                keywords = this.returnExperienceTypes();

                filter.appendSubObject(new TileFilterButtonObject(
                                              index = 99
                                            , title = "All"
                                            , isActive = false
                                        ));

                keywords.forEach((word, i) => {
                    filter.appendSubObject(new TileFilterButtonObject(
                                              index = i
                                            , title = word
                                            , isActive = false
                                        ));
                });
                break;

            case "Portfolio":
                //console.log("----------FRONTPAGE - FILTER BUTTONS--------------")
                //console.log("-----------------PORTFOLIO------------------------")
                filter = this.returnSingleFilterBar(4);
                keywords = this.returnPortfolioTypes();

                filter.appendSubObject(new TileFilterButtonObject(
                                      index = 99
                                    , title = "All"
                                    , isActive = false
                                ));

                keywords.forEach((word, i) => {
                    filter.appendSubObject(new TileFilterButtonObject(
                                          index = i
                                        , title = word
                                        , isActive = false
                                    ));

                });
                break;

            default:
                console.error("Unknown section key: " + key);
        };
    };



//****** Create Articles and Tiles (SubObjects) for the Sections ******
    async prepareSectionSubObjects(key) {
        console.log("FRONTPAGE:   prepareSectionSubObjects");
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
                section.appendSubObject(new IntroductionArticleObject(index=0, title="About",    data=info,              isActive=false));
                section.appendSubObject(new IntroductionArticleObject(index=1, title="Key Skills",  data=info["keySkills"], isActive=false));
                break;

            case "Skills":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------SKILLS-----------------")
                info = this.dict("skills");
                section = this.returnSingleSection(1);
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
                    section.appendSubObject(new ExperienceTileObject(
                                              index = i
                                            , title = "placehold"
                                            , data = job
                                            , isActive = true
                                        ));
                });

                break;

            case "Portfolio":
                //console.log("----------FRONTPAGE - SUBOBJECTS--------------")
                //console.log("-----------------PORTFOLIO-----------------")
                
                section = this.returnSingleSection(4);
                this.dict("portfolio").forEach((project, i) => {
                    section.appendSubObject(new PortfolioTileObject(
                                              index = i
                                            , title = "placehold"
                                            , data = project
                                            , isActive = true
                                        ));
                });
                break;
                
            default:
                console.error("Unknown section key: " + key);
        };
    };



    //****** Create Overlays for the Experience and Portfolio tiles ******
    async prepareOverlayObjects(key) {
        console.log("FRONTPAGE:   prepareOverlayObjects");

        let index; let data; let isActive;
        switch (key) {
            case "About":
                break;

            case "Skills":
                break;

            case "Education":
                break;

            case "Experience":
                // console.log("----------FRONTPAGE - OVERLAYS--------------")
                // console.log("-----------------EXPERIENCE-----------------")
                this.dict("experience").forEach((job, i) => {
                    const newOverlay = new ExperienceOverlayObject(
                                          index = 1
                                        , data = job
                                        , isActive = false
                                    );
                    this.#overlaysExperience.push(newOverlay)
                });    
                break;

            case "Portfolio":
                // console.log("----------FRONTPAGE - OVERLAYS--------------")
                // console.log("-----------------PORTFOLIO-----------------")
                this.dict("portfolio").forEach((project, i) => {
                    const newOverlay = new ExperienceOverlayObject(
                                          index = 1
                                        , data = project
                                        , isActive = false
                                    );
                    this.#overlaysPortfolio.push(newOverlay)
                });    
                break;
                
            default:
                console.error("Unknown section key: " + key);
        };

    };

};

export default FrontPageObject;