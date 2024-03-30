"use strict";


// 

class SectionView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #subObjects;                    //  Article() or Tile() objects contained in this section
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  The part of the resume data from Dictionary()
    constructor(index) {
        this.#className = "Section";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index
        this.#subObjects = [];
        this.#isActive = false
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
    get subObjects() {
        return this.#subObjects;
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

//****** Adds an article / tile ******
    appendSubObject(object) {
        this.subObjects.push(object)
        const elToAppend = this.element.querySelector(`.container`)
        elToAppend.appendChild(object.element)
    };
};


class IntroductionSectionView extends SectionView {
    constructor(index) {
        super(index);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <section id="${this.id}" class="section-display activated">
                <div id="${this.id}-article-container" class="container for-article">
                </div>
            </section>
        `.trim();
        return newElement.firstElementChild
    };
};


class SkillSectionView extends SectionView {
    constructor(index) {
        super(index);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.id}-article-container" class="container for-article">
                </div>
            </section>
        `.trim();
        return newElement.firstElementChild
    };
};


class EducationSectionView extends SectionView {
    constructor(index) {
        super(index);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.id}-article-container" class="container for-article">
                </div>
            </section>
        `.trim();
        return newElement.firstElementChild
    };
};


class ExperienceSectionView extends SectionView {
    constructor(index) {
        super(index);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.id}-tile-container" class="container for-tile">
                </div>
            </section>
        `.trim();
        return newElement.firstElementChild
    };
};


class PortfolioSectionView extends SectionView {
    constructor(index) {
        super(index);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.id}-tile-container" class="container for-tile">
                </div>
            </section>
        `.trim();
        return newElement.firstElementChild
    };
};

export {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView}