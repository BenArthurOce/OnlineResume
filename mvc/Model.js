import FrontPageObject from "../objects/FrontPageObject.js";



class Model {
    constructor() {
        this.frontpage = null
        this.searchTimeout = null;
        this.data = {}
        this.init();
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

            , "active" :            {
                                         "heading" :            null
                                        ,"filterBar" :          null
                                        ,"filterButtons" :      null
                                        ,"section" :            null
                                        ,"subObjects" :         null
                                        ,"filterTags" :         null

           }
        };
    };

    bindIndexChanged(callback) {
        console.log("MODEL: bindIndexChanged")
        this.onIndexChanged = callback;
    };

    _commit(data) {
        console.log("MODEL: _commit")
        this.onIndexChanged(data);
    };

    // This function is called by the Controller() handler: handleChangeIndex
    // Controller: handleChangeIndex is called by the View: bindChangeIndex
    changeIndex(index) {
        console.log("MODEL: changeIndex")
        
        const capitalizeFirstLetter = (input) => input.charAt(0).toUpperCase() + input.slice(1);

        // Make array of headers
        console.log("---setting header array and count----")
        const headerArray = Object.keys(this.data.sections)
        this.data['index'] = index;
        this.data['headings'] = headerArray.map(header => capitalizeFirstLetter(header))
        this.data['count'] = headerArray.length;


        // Set active data depending on index (this is what the model will read)
        console.log("---setting active data----")
        const sectionName = Object.keys(this.data.sections)[index];

        this.data['active']['heading']          = capitalizeFirstLetter(sectionName);
        this.data['active']['filterBar']        = this.data.filterBars[sectionName];
        this.data['active']['filterButtons']    = this.data.filterTags[sectionName];
        this.data['active']['section']          = this.data.sections[sectionName];
        this.data['active']['subObjects']       = this.data.sectionSubObjs[sectionName];
        this.data['active']['filterTags']       = this.data.filterTags[sectionName];
    
        this._commit(this.data);
    };
};

export default Model;