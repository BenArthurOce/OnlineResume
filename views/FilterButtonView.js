//

class FilterButtonView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #title;                         //  Display name of the filter button, or reference key if its for tiles
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    #callback;                      //  Function in the View() class that is ran when the element of this class is clicked
    constructor(index, title, isActive, callback) {
        this.#className = "FilterButton";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#isActive = isActive;
        this.#element = null;
        this.#callback = callback;
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    set classType(value) {
        this.#classType = value;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get id() {
        return this.#id;
    };
    set id(value) {
        this.#id = value;
    };
    get index() {
        return this.#index;
    };
    get title() {
        return this.#title;
    };
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get callback() {
        return this.#callback;
    };

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className   = ${this.className}
        classType   = ${this.classType}
        mvcType     = ${this.mvcComponent}
        id          = ${this.id}
        index       = ${this.index}
        title       = ${this.title}
        isActive    = ${this.isActive}
        callback    = ${this.callback}`);
    };

// //****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

// //****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };
};


class ArticleFilterButtonView extends FilterButtonView {
    constructor(index, title, isActive, callback) {
        super(index, title, isActive, callback);
        this.classType = "Article";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();

    
        if (this.isActive) {this.toggleOn()} else {this.toggleOff()}

        if (index === undefined|| title === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("ArticleFilterButtonView: parameter declared is null/undefined")
        }
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <li role="button" dataParent="${this.id}" dataFilter="${this.title}" class="filter-button for-article for-mobile">${this.title}</li>
        `.trim();
        return newElement.firstElementChild
    };

};


class TileFilterButtonView extends FilterButtonView {
    constructor(index, title, isActive, callback) {
        super(index, title, isActive, callback);
        this.classType = "Tile";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();

        if (this.isActive) {this.toggleOn()} else {this.toggleOff()}

        if (index === undefined|| title === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("TileFilterButtonView: parameter declared is null/undefined")
        }
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            ${this.selectTileGraphic(this.title)}
        `.trim();
        return newElement.firstElementChild
    };

//****** takes the "this.title" attribute to create a tile HTML object ******
    selectTileGraphic(title) {
        const filterOptions = {
            "All":              `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="All">All</li>`
            ,"Government":      `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Government"><i class="sidebar-icon fa fa-building icon"></i></li>`
            ,"Programming":     `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Programming"><i class="sidebar-icon fa fa-code icon"></i></li>`
            ,"HelpDesk":        `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="HelpDesk"><i class="sidebar-icon fa fa-desktop icon"></i></li>`
            ,"Accounting":      `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Accounting"><i class="sidebar-icon fa fa-dollar icon"></i></li>`
            ,"CustomerService": `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Customer Services"><i class="sidebar-icon fa fa-bell icon"></i></li>`
            ,"UserInterface":   `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="User Interfaces"><i class="sidebar-icon fa fa-desktop icon"></i></li>`
            ,"Web":             `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Web"><i class="sidebar-icon fa fa-globe icon"></i></li>`
            ,"Database":        `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Databases"><i class="sidebar-icon fa fa-database icon"></i></li>`
            ,"Logic":           `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Logic"><i class="sidebar-icon fa fa-puzzle-piece icon"></i></li>`
            ,"Games":           `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Games"><i class="sidebar-icon fa fa-gamepad icon"></i></li>`
            ,"Efficiency":      `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Efficiency"><i class="sidebar-icon fa fa-car icon"></i></li>`
            ,"DataSets":        `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="DataSets"><i class="sidebar-icon fa fa-table icon"></i></li>`
            ,"Finance":         `<li role="button" dataParent="${this.id}" dataFilter=${this.title} class="filter-button for-tile for-pc for-mobile" title="Finance"><i class="sidebar-icon fa fa-dollar icon"></i></li>`
        };
        if (title in filterOptions) {
            return filterOptions[title];
        } else {
            throw new Error(`Title '${title}' not found in filterOptions`);
        }
    };
};

export {ArticleFilterButtonView, TileFilterButtonView};