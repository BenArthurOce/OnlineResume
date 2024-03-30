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
              "index": 0
            , "sections": this.frontpage.sections
            , "filters": this.frontpage.filters
        }

        // console.log(this.data["filters"])
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