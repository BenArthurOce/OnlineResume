// In each section, there are sub items that contain resume information, either ArticleObject() or TileObject()

class TileView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #title;                         //  Heading
    #data;                          //  Detailed information about the Job/Project
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    #callback;                      //  Function in the View() class that is ran when the element of this class is clicked
    constructor(index, title, data, isActive, callback) {
        this.#className = "Tile";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#data = data;
        this.#isActive = isActive;
        this.#element = null;
        this.#callback = callback;
        
        if (index === undefined|| title === undefined || data === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("TileView: parameter declared is null/undefined")
        }

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
    get data() {
        return this.#data;
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
        data        = (See Below)
        isActive    = ${this.isActive}
        element     = ${this.element}
        callback    = ${this.callback}
        `);
        console.log(this.data)
    };


//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };
};


//
//  Experience
//
class ExperienceTileView extends TileView {
    constructor(index, title, data, isActive, callback) {
        super(index, title, data, isActive, callback);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;

        this.company    = this.data[`company`];
        this.address    = this.data[`address`];
        this.position   = this.data[`position`];
        this.period     = this.data[`period`];
        this.extraInfo  = this.data[`extraInfo`]
        this.tags       = this.data[`tags`]
        this.softwares  = this.data[`softwares`]
        this.duties     = this.data[`duties`]

        this.element = this.generateElement();
        if (isActive) {this.toggleOn()} else {this.toggleOff()}
    };

//****** Prepares the HTML element - An Experience Tile ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="tile activated for-experience">
                <div class="container for-icons">
                    ${this.addIcon(this.data.tags[0])}
                </div>
                <p class="position">${this.position}</p>
                <p class="company">${this.company}</p>
            </div>
        `.trim();
        return newElement.firstElementChild
    };


//****** Adds a single FontAwesome Icon based on the first tag in the JSON data ******
    addIcon(key) {
        const iconTypes = {
             "Government":      `<i class="sidebar-icon fa fa-building icon"></i>`
            ,"Programming":     `<i class="sidebar-icon fa fa-code icon"></i>`
            ,"HelpDesk":        `<i class="sidebar-icon fa fa-desktop icon"></i>`
            ,"Accounting":      `<i class="sidebar-icon fa fa-dollar icon"></i>`
            ,"CustomerService": `<i class="sidebar-icon fa fa-bell icon"></i>`
        }
        if (key in iconTypes) {
            return iconTypes[key];
        } else {
            throw new Error(`Title '${key}' not found in addIcon`);
        }
    };
};


//
//  Portfolio
//
class PortfolioTileView extends TileView {
    constructor(index, title, data, isActive, callback) {
        super(index, title, data, isActive, callback);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;

        this.projectName        = this.data[`projectName`];
        this.projectLangs       = this.data[`projectLangs`];
        this.tags        = this.data[`projectTags`];
        this.summarySmall       = this.data[`summarySmall`];
        this.summaryLarge       = this.data[`summaryLarge`]
        this.projectUrl         = this.data[`projectUrl`]
        this.projectImages      = this.data[`projectImages`]

        this.element = this.generateElement();
        if (isActive) {this.toggleOn()} else {this.toggleOff()}
    };

//****** Prepares the HTML element - A Portfolio Tile ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="tile activated for-portfolio">
                <div class="container for-icons">
                    ${this.addProgrammingLogos()}
                </div>
                <p class="projectName">${this.projectName}</p>
                <p class="projectSumSmall">${this.summarySmall}</p>
            </div>
        `.trim();
        return newElement.firstElementChild
    };

//****** Adds programming logos to the portfolio tile ******
    addProgrammingLogos() {
        return this.projectLangs.map(language => `<img src="${`imgLogos/${language}.svg`}" alt="${language}" class="program-icon">`).join('');
    };
};

export {ExperienceTileView, PortfolioTileView};