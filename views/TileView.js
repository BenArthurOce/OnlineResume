

//

class TileView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #text;                          //  String displayed on screen
    #heading;                       //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, text, heading) {
        this.#className = "TileView";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#text = text;
        this.#heading = heading;
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
    get text() {
        return this.#text;
    };
    get heading() {
        return this.#heading;
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

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <div class="tile activated for-experience">
            <div class="icon-container">
		        <i class="icon"></i>
		    </div>
            <p class="position">${"placeholder"}</p>
            <p class="company">${"placeholder"}</p>
        </div>
         `;
        return newElement.firstElementChild
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


class ExperienceTileView extends TileView {
    constructor(index, text, heading) {
        super(index, text, heading);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();

        // console.log(this.text)
        // console.log(this.heading)
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <div class="tile activated for-experience">
                <div class="icon-container">
                    <i class="icon"></i>
                </div>
                <p class="position">${"placeholder position"}</p>
                <p class="company">${"placeholder company"}</p>
            </div>
        `.trim();
        return tempEl.firstChild;
    };
};


class PortfolioTileView extends TileView {
    constructor(index) {
        super(index);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <div class="tile activated for-portfolio">
                <div class="container for-icons"></div>
                <p class="projectName">${"placeholder Project"}</p>
                <p class="projectSumSmall">${"placeholder Project Sum"}</p>
            </div>
        `.trim();
        return tempEl.firstChild;
    };
};





export {ExperienceTileView, PortfolioTileView};
