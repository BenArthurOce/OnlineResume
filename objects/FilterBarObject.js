// 

class FilterBarObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Position reference number
    #buttons;                       //  Filter buttons that go into this class object
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor(index) {
        this.#className = "FilterBar";
        this.#classType = null;
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = index;
        this.#buttons = [];
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
    get buttons() {
        return this.#buttons;
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

//****** Adds a filter button to this object ******
    appendSubObject(object) {
        this.buttons.push(object)
    };
};

class IntroductionFilterBarObject extends FilterBarObject {
    constructor(index) {
        super(index);
        this.classType = "About";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class EducationFilterBarObject extends FilterBarObject {
    constructor(index) {
        super(index);
        this.classType = "Education";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class SkillFilterBarObject extends FilterBarObject {
    constructor(index) {
        super(index);
        this.classType = "Skills";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class ExperienceFilterBarObject extends FilterBarObject {
    constructor(index) {
        super(index);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class PortfolioFilterBarObject extends FilterBarObject {
    constructor(index) {
        super(index);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


export {IntroductionFilterBarObject, EducationFilterBarObject, SkillFilterBarObject, ExperienceFilterBarObject, PortfolioFilterBarObject}