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
    constructor(index, title) {
        this.#className = "FilterButton";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#isActive = false;
        this.#element = null;  
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
    constructor(index, title) {
        super(index, title);
        this.classType = "Article";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <li role="button" dataParent="${this.id}" dataFilter="${this.title}" class="filter-button for-article for-mobile">${this.title}</li>
         `;
         return newElement.firstElementChild
    };
};

 
//  //****** Creates a HTML element
//  createElement() {
//     const newElement = document.createElement('div');
//     newElement.innerHTML = `
//             <menu id="${this.id}" class="menu-filter for-article for-mobile">
//                 <ul class="filter-list for-article for-mobile">
//                     <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
//                     <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
//                     <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="${this.subHeadings[2].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[2].toLowerCase()}</li>
//                 </ul>
//             </menu>
//     `.trim();
//     this.element = newElement.firstChild
// };


class TileFilterButtonView extends FilterButtonView {
    constructor(index, title) {
        super(index, title);
        this.classType = "Tile";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
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
            "All":              `<li role="button" dataParent="${this.id}" dataFilter="tile" class="filter-button for-tile for-pc for-mobile" title="All">All</li>`
            ,"Programming":     `<li role="button" dataParent="${this.id}" dataFilter="Programming" class="filter-button for-tile for-pc for-mobile" title="Information Technology"><i class="sidebar-icon fa fa-desktop icon"></i></li>`
            ,"HelpDesk":        `<li role="button" dataParent="${this.id}" dataFilter="HelpDesk" class="filter-button for-tile for-pc for-mobile" title="Information Technology"><i class="sidebar-icon fa fa-desktop icon"></i></li>`
            ,"Accounting":      `<li role="button" dataParent="${this.id}" dataFilter="Accounting" class="filter-button for-tile for-pc for-mobile" title="Accounting"><i class="sidebar-icon fa fa-dollar icon"></i></li>`
            ,"CustomerService": `<li role="button" dataParent="${this.id}" dataFilter="CustomerService" class="filter-button for-tile for-pc for-mobile" title="Customer Services"><i class="sidebar-icon fa fa-bell icon"></i></li>`
            ,"UserInterface":   `<li role="button" dataParent="${this.id}" dataFilter="UserInterface" class="filter-button for-tile for-pc for-mobile" title="User Interfaces"><i class="sidebar-icon fa fa-desktop icon"></i></li>`
            ,"Web":             `<li role="button" dataParent="${this.id}" dataFilter="Web" class="filter-button for-tile for-pc for-mobile" title="Web"><i class="sidebar-icon fa fa-globe icon"></i></li>`
            ,"Database":        `<li role="button" dataParent="${this.id}" dataFilter="Database" class="filter-button for-tile for-pc for-mobile" title="Databases"><i class="sidebar-icon fa fa-database icon"></i></li>`
            ,"Logic":           `<li role="button" dataParent="${this.id}" dataFilter="Logic" class="filter-button for-tile for-pc for-mobile" title="Logic"><i class="sidebar-icon fa fa-puzzle-piece icon"></i></li>`
            ,"Games":           `<li role="button" dataParent="${this.id}" dataFilter="Games" class="filter-button for-tile for-pc for-mobile" title="Games"><i class="sidebar-icon fa fa-gamepad icon"></i></li>`
            ,"Efficiency":      `<li role="button" dataParent="${this.id}" dataFilter="Efficiency" class="filter-button for-tile for-pc for-mobile" title="Efficiency"><i class="sidebar-icon fa fa-car icon"></i></li>`
            ,"DataSets":        `<li role="button" dataParent="${this.id}" dataFilter="DataSets" class="filter-button for-tile for-pc for-mobile" title="DataSets"><i class="sidebar-icon fa fa-table icon"></i></li>`
            ,"Finance":         `<li role="button" dataParent="${this.id}" dataFilter="Finance" class="filter-button for-tile for-pc for-mobile" title="Finance"><i class="sidebar-icon fa fa-dollar icon"></i></li>`
        };
        return filterOptions[title]
    };
};

export {ArticleFilterButtonView, TileFilterButtonView};