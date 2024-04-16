//

import StaticGetIcon from "./StaticGetIcon.js";

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
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.element = this.generateElement();

        if (index === undefined|| title === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("ArticleFilterButtonView: parameter declared is null/undefined")
        }

        if (isActive) {this.toggleOn()} else {this.toggleOff()};
    };

//****** Prepares the HTML element ******
    // generateElement() {
    //     const newElement = document.createElement('div');
    //     newElement.innerHTML = `
    //         <li role="button" class="filter-button for-article for-mobile">${this.title}</li>
    //     `.trim();
    //     return newElement.firstElementChild
    // };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            ${StaticGetIcon.generateButtonElement(this.title, "medium").outerHTML}      
        `.trim();
        return newElement.firstElementChild
    };
};


class TileFilterButtonView extends FilterButtonView {
    constructor(index, title, isActive, callback) {
        super(index, title, isActive, callback);
        this.classType = "Tile";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.element = this.generateElement();

        if (index === undefined|| title === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("TileFilterButtonView: parameter declared is null/undefined")
        }

        if (isActive) {this.toggleOn()} else {this.toggleOff()};
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            ${StaticGetIcon.generateButtonElement(this.title, "medium").outerHTML}      
        `.trim();
        return newElement.firstElementChild
    };
};

export {ArticleFilterButtonView, TileFilterButtonView};