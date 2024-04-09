// 

class SectionObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Position reference number
    #subObjects;                    //  Article() or Tile() objects contained in this section
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor(index) {
        this.#className = "Section";
        this.#classType = null;
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = index;
        this.#subObjects = [];
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
    get subObjects() {
        return this.#subObjects;
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

//****** Adds an article / tile ******
    appendSubObject(object) {
        this.subObjects.push(object)
    };
};


class IntroductionSectionObject extends SectionObject {
    constructor(index) {
        super(index);
        this.classType = "About";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class SkillSectionObject extends SectionObject {
    constructor(index) {
        super(index);
        this.classType = "Skills";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class EducationSectionObject extends SectionObject {
    constructor(index) {
        super(index);
        this.classType = "Education";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class ExperienceSectionObject extends SectionObject {
    constructor(index) {
        super(index);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class PortfolioSectionObject extends SectionObject {
    constructor(index) {
        super(index);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};

export {IntroductionSectionObject, EducationSectionObject, SkillSectionObject, ExperienceSectionObject, PortfolioSectionObject}