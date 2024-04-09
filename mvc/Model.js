import FrontPageObject from "../objects/FrontPageObject.js";



class Model {
    constructor() {
        this.frontpage = null
        this.searchTimeout = null;
        this.data = {}
    };

    async init() {
        console.log("MODEL: init" + "\n" + "----------")
        this.frontpage = new FrontPageObject()

        await this.frontpage.init();
        clearTimeout(this.searchTimeout);


        this.data = {
              "index" :             -1
            , "count" :             -1
            , "headings" :          []

            , "filterBars" :        {
                                        "introduction" :    this.frontpage.returnSingleFilterBar(0)
                                        ,"skills" :         this.frontpage.returnSingleFilterBar(1)
                                        ,"education" :      this.frontpage.returnSingleFilterBar(2)
                                        ,"experience" :     this.frontpage.returnSingleFilterBar(3)
                                        ,"portfolio" :      this.frontpage.returnSingleFilterBar(4)
                                    }

            , "sections" :          {
                                        "introduction" :    this.frontpage.returnSingleSection(0)
                                        ,"skills" :         this.frontpage.returnSingleSection(1)
                                        ,"education" :      this.frontpage.returnSingleSection(2)
                                        ,"experience" :     this.frontpage.returnSingleSection(3)
                                        ,"portfolio" :      this.frontpage.returnSingleSection(4)
                                    }

            , "sectionSubObjs" :    {
                                        "introduction" :    this.frontpage.returnSingleSection(0).subObjects
                                        ,"skills" :         this.frontpage.returnSingleSection(1).subObjects
                                        ,"education" :      this.frontpage.returnSingleSection(2).subObjects
                                        ,"experience" :     this.frontpage.returnSingleSection(3).subObjects
                                        ,"portfolio" :      this.frontpage.returnSingleSection(4).subObjects
                                    }   

            , "filterTags" :        {
                                         "introduction" :   this.frontpage.returnIntroductionTypes()
                                        ,"skills" :         this.frontpage.returnSkillsTypes()
                                        ,"education" :      this.frontpage.returnEducationTypes()
                                        ,"experience" :     this.frontpage.returnExperienceTypes()
                                        ,"portfolio" :      this.frontpage.returnPortfolioTypes()
                                    }

            , "state" :            {
                                         "navigationBar" :      this.frontpage.navigation
                                        ,"heading" :            null
                                        ,"filterBar" :          null
                                        ,"filterButtons" :      null
                                        ,"section" :            null
                                        ,"subObjects" :         null
                                        ,"filterTags" :         null

                                    }
        };

    };

    returnSingleNavLink(index) {
        return this.data["state"]["navigationBar"][index]
    };


    // This function is called by the Controller() handler: handleChangeIndex
    // Controller: handleChangeIndex is called by the View: bindChangeIndex
    changeIndex(index) {
        console.log("MODEL: changeIndex")
        
        const capitalizeFirstLetter = (input) => input.charAt(0).toUpperCase() + input.slice(1);

        // Make array of headers
        // console.log("---setting header array and count----")
        const headerArray = Object.keys(this.data.sections)
        this.data['index'] = index;
        this.data['headings'] = headerArray.map(header => capitalizeFirstLetter(header))
        this.data['count'] = headerArray.length;


        // Set state data depending on index (this is what the model will read)
        // console.log("---setting state data----")
        const sectionName = Object.keys(this.data.sections)[index];

        this.data['state']['heading']          = capitalizeFirstLetter(sectionName);
        this.data['state']['filterBar']        = this.data.filterBars[sectionName];
        this.data['state']['filterButtons']    = this.data.filterTags[sectionName];
        this.data['state']['section']          = this.data.sections[sectionName];
        this.data['state']['subObjects']       = this.data.sectionSubObjs[sectionName];
        this.data['state']['filterTags']       = this.data.filterTags[sectionName];



        this.data['state']['navigationBar'].links.map(link => link.toggleOff())
        this.data['state']['navigationBar'].links[index].toggleOn()

    
        this._commitIndex(this.data);
    };


    filterStateArticles(object) {
        console.log("MODEL: filterStateArticles")

        this.data['state']['filterBar'].buttons.map(button => button.toggleOff())
        this.data['state']['subObjects'].map(button => button.toggleOff())

        const index = object.index

        this.data['state']['filterBar'].buttons[index].isActive = true
        this.data['state']['subObjects'][index].isActive = true

        this._commitSubObjectActive(this.data);

    };

    filterStateTiles(object) {
        console.log("MODEL: filterStateTiles")

        this.data['state']['filterBar'].buttons.map(button => button.toggleOff())
        this.data['state']['subObjects'].map(button => button.toggleOff())

        const title = object.title  // This is what the tiles will be filtered on

        // If "All" is picked, then reveal all tiles
        if (object.title === "All") {
            this.data['state']['subObjects'].map(button => button.toggleOn())
        }
        else {
            this.data['state']['subObjects'].forEach((tile, i) => {
                // console.log(i)
                if (tile.tags.includes(title)) {
                    // console.log("yes");
                    tile.toggleOn();
                } else {
                    // console.log("no");
                }
            });
        }

        this._commitSubObjectActive(this.data);
    };


    bindArticleFiltered(callback) {
        console.log("MODEL: bindArticleFiltered")
        this.onActiveSubObjectChanged = callback
    };

    bindTileFiltered(callback) {
        console.log("MODEL: bindTileFiltered")
        this.onActiveSubObjectChanged = callback
    };

    _commitSubObjectActive(data) {
        console.log("MODEL: _commitSubObjectActive")
        this.onActiveSubObjectChanged(data);        
    }

    _commitIndex(data) {
        console.log("MODEL: _commitIndex")
        this.onIndexChanged(data);
    };


    bindIndexChanged(callback) {
        console.log("MODEL: bindIndexChanged")
        this.onIndexChanged = callback;
    };

};

export default Model;