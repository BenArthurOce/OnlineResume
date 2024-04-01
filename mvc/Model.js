import FrontPage from "../objects/FrontPage.js"


class Model {
    constructor() {
        this.frontpage = null
        this.searchTimeout = null;
        this.init();
    };

    async init() {
        console.log("MODEL: init" + "\n" + "----------")
        this.frontpage = new FrontPage()

        await this.frontpage.init();
        clearTimeout(this.searchTimeout);


        this.data = {
              "index" :         0
            , "count" :         this.frontpage.sections.length

            , "filterBars" :    {
                                    "introduction" :    this.frontpage.filters[0]
                                    ,"skills" :         this.frontpage.filters[1]
                                    ,"education" :      this.frontpage.filters[2]
                                    ,"experience" :     this.frontpage.filters[3]
                                    ,"portfolio" :      this.frontpage.filters[4]
                                }

            , "sections" :      {
                                    "introduction" :    this.frontpage.sections[0].data
                                    ,"skills" :         this.frontpage.sections[1].data
                                    ,"education" :      this.frontpage.sections[2].data
                                    ,"experience" :     this.frontpage.sections[3].data
                                    ,"portfolio" :      this.frontpage.sections[4].data
                                }

            , "filterTags" :    {
                                     "introduction" :   Array.from(this.returnIntroductionTypes())
                                    ,"skills" :         Array.from(this.returnSkillsTypes())
                                    ,"education" :      Array.from(this.returnEducationTypes())
                                    ,"experience" :     Array.from(this.returnExperienceTypes())
                                    ,"portfolio" :      Array.from(this.returnPortfolioTypes())
                                }


        }
    };

    returnIntroductionTypes() {
        return new Set(["Introduction", "SkillsKey"]);
    };

    returnSkillsTypes() {
        return new Set(Object.keys(this.frontpage.sections[1].data).map(key => key.charAt(0).toUpperCase() + key.slice(1)));
    };

    returnEducationTypes() {
        return new Set(this.frontpage.sections[2].data.flatMap(education => education.tags));
    };

    returnExperienceTypes() {
        return new Set(this.frontpage.sections[3].data.flatMap(experience => experience.tags));
    };

    returnPortfolioTypes() {
        return new Set(this.frontpage.sections[4].data.flatMap(portfolio => portfolio.projectTags))
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
        this.data['index'] = index;
        this._commit(this.data);
    }
};

export default Model;