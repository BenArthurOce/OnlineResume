import FrontPage from "../objects/FrontPage.js"


class Model {
    constructor() {
        this.frontpage = null
        this.searchTimeout = null;
        this.sections = null
        this.navlinks = null
        this.filters = null
        this.indexNum = 0;
        this.init();
    };

    async init() {  
        this.frontpage = new FrontPage()

        await this.frontpage.init();
        clearTimeout(this.searchTimeout); 

        this.sections = this.frontpage.sections
        this.filters = this.frontpage.filters
    };

    incIndex() {
        this.indexNum += 1;
    };

    decIndex() {
        this.indexNum -= 1;
    };

    adjIndex(index) {
        this.indexNum = index
        // this.onTodoListChanged(this.todos)

    }

    bindIndexChanged(callback) {
        this.onSectionDisplayChange = callback
      }


};

export default Model;