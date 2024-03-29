//

class FilterButtonView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #index;                         //  Index order of NavLink
    #text;                          //  String displayed on screen
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, text) {
        this.#className = "FilterButton";
        this.#classType = "FilterButtonView";
        this.#mvcComponent = "View";
        this.#text = text
        this.#index = index;
        this.#element = this.generateElement();
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get text() {
        return this.#text;
    };
    get index() {
        return this.#index;
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

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <a href="#" data-index="${this.index}" class="nav-link">${this.text}</a>
         `;
         return newElement.cloneNode(true);
    };

// //****** Command to make this Object "visible" ******
//     toggleOn() {
//         this.isActive = true;
//         this.element.classList.add("activated")
//     };

// //****** Command to make this Object "invisible" ******
//     toggleOff() {
//         this.isActive = false;
//         this.element.classList.remove("activated")
//     };

// //******  ******
//     toggle() {
//         this.isActive = !this.isActive
//         this.element.classList.toggle("activated")
//     };
};


export default FilterButtonView;

