"use strict";


// 

class ArrowView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    #callback;                       //  
    constructor(index, callback) {
        this.#className = "Section";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index
        this.#isActive = true
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

//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
    };
};


//
//  PrevArrowView
//
class PrevArrowView extends ArrowView {
    constructor(index, callback) {
        super(index, callback);
        this.classType = "Prev";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <button class="arrow prev">❮</button>
        `.trim();
        return newElement.firstElementChild
    };
};


//
//  NextArrowView
//
class NextArrowView extends ArrowView {
    constructor(index, callback) {
        super(index, callback);
        this.classType = "Next";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.element = this.generateElement();
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <button class="arrow next">❯</button>
        `.trim();
        return newElement.firstElementChild
    };
};


export {PrevArrowView, NextArrowView}