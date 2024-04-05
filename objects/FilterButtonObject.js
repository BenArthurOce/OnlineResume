// 

class FilterButtonObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Position reference number
    #title;                         //  Display name of the filter button, or reference key if its for tiles
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor(index, title) {
        this.#className = "FilterButton";
        this.#classType = null;
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#isActive = false;
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

//****** Command to make this Object "visible" 
    toggleOn() {
        this.isActive = true;
    };

//****** Command to make this Object "invisible" 
    toggleOff() {
        this.isActive = false;
    };
};


class ArticleFilterButtonObject extends FilterButtonObject {
    constructor(index, title) {
        super(index, title);
        this.classType = "Article";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
    };
};

class TileFilterButtonObject extends FilterButtonObject {
    constructor(index, title) {
        super(index, title);
        this.classType = "Tile";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
    };
};


export {ArticleFilterButtonObject, TileFilterButtonObject};