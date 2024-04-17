//

import StaticGetIcon from "./StaticGetIcon.js";

class NavLinkView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of NavLink
    #title;                          //  Navbar Word
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    #callback;                      //  Function in the View() class that is ran when the element of this class is clicked
    constructor(index, title, isActive, callback) {
        this.#className = "Navigation";
        this.#classType = "Link";
        this.#mvcComponent = "View";
        this.#index = index;
        this.#title = title;
        this.#id = `${this.title.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#isActive = isActive;
        this.#element = this.generateElement();
        this.#callback = callback;

        if (index === undefined|| title === undefined || isActive === undefined || callback === undefined) {
            this.printToTerminal()
            throw new Error("ArticleObject: parameter declared is null/undefined")
        };

        if (isActive) {this.toggleOn()} else {this.toggleOff()};
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
        index       = ${this.index}
        title       = ${this.title}
        id          = ${this.id}
        isActive    = ${this.isActive}
        callback    = ${this.callback}`);
        console.log(this.data)
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        this.printToTerminal()
        newElement.innerHTML = `
        <a href="#" data-index="${this.index}" class="nav-link">
            <p class="for-pc">
                ${this.title}
            </p>
            <p class="for-mobile">
                ${StaticGetIcon.generateDisplayIconElement(this.title, "medium").outerHTML}
            </p>
            
        </a>
         `;
         return newElement.firstElementChild
    };

    // generateElement() {
    //     const newElement = document.createElement('div');
    //     newElement.innerHTML = `
    //     <a href="#" data-index="${this.index}" class="nav-link">${this.title}</a>
    //      `;
    //      return newElement.firstElementChild
    // };

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


export default NavLinkView;

