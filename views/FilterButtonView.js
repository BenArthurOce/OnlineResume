//

class FilterButtonView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #data;                          //  
    // #heading;                       //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, data) {
        this.#className = "TileView";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        // this.#heading = heading;
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
    get data() {
        return this.#data;
    };
    // get heading() {
    //     return this.#heading;
    // };
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
    constructor(index, data) {
        super(index, data);
        this.classType = "";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.element = this.generateElement();
        // this.applyInfoToElement()
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <a href="#" data-index="${this.index}" class="nav-link">${"placeholder"}</a>
         `;
         return newElement.cloneNode(true);
    };
};


class TileFilterButtonView extends FilterButtonView {
    constructor(index, data) {
        super(index, data);
        this.classType = "";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <a href="#" data-index="${this.index}" class="nav-link">${"placeholder"}</a>
         `;
         return newElement.cloneNode(true);
    };
};

export {ArticleFilterButtonView, TileFilterButtonView};