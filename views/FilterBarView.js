//

class FilterBarView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;
    #buttons;                         //  Array containing the NavBarLinks (Added to the class in main View code)
    #isActive;
    #element;                       //  HTML Element
    constructor(index) {
        this.#className = "FilterBar";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#buttons = [];
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
    get buttons() {
        return this.#buttons;
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

//****** Adds a filter button ******
    appendSubObject(filterButton) {
        this.buttons.push(filterButton)
        const elToAppend = this.element.querySelector(`ul`)
        elToAppend.appendChild(filterButton.element)
    };

//****** Command to make this Object "visible" 
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" 
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };

};

//
//  Introduction
//
class IntroductionFilterBarView extends FilterBarView {
    constructor(index) {
        super(index);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <menu id="${this.id}" class="menu-filter for-article for-mobile">
                <ul class="filter-list for-article for-mobile"></ul>
            </menu>
        `.trim();
        return newElement.firstElementChild
    };
};


//
//  Education
//
class EducationFilterBarView extends FilterBarView {
    constructor(index) {
        super(index);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <menu id="${this.id}" class="menu-filter for-article for-mobile">
                <ul class="filter-list for-article for-mobile"></ul>
            </menu>
        `.trim();
        return newElement.firstElementChild
    };
};

//
//  Skills
//
class SkillsFilterBarView extends FilterBarView {
    constructor(index) {
        super(index);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <menu id="${this.id}" class="menu-filter for-article for-mobile">
                <ul class="filter-list for-article for-mobile"></ul>
            </menu>
        `.trim();
        return newElement.firstElementChild
    };
};

//
//  Experience
//
class ExperienceFilterBarView extends FilterBarView {
    constructor(index) {
        super(index);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                <ul class="filter-list for-tile for-pc for-mobile"></ul>
            </menu>
        `.trim();
        return newElement.firstElementChild
    };
};

//
//  Portfolio
//
class PortfolioFilterBarView extends FilterBarView {
    constructor(index) {
        super(index);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                <ul class="filter-list for-tile for-pc for-mobile"></ul>
            </menu>
        `.trim();
        return newElement.firstElementChild
    };
};


export {IntroductionFilterBarView, EducationFilterBarView, SkillsFilterBarView, ExperienceFilterBarView, PortfolioFilterBarView};

