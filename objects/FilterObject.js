// 

class FilterObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  The part of the resume data from Dictionary()
    #headings;
    constructor(data, headings) {
        this.#className = "Filter";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#data = data;
        this.#headings = headings
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
    get data() {
        return this.#data;
    };
    get headings() {
        return this.#headings;
    };

    //****** Command to make this Object "visible" 
    toggleOn() {
        this.isActive = true;
    };

    //****** Command to make this Object "invisible" 
    toggleOff() {
        this.isActive = false;
    };
};

class IntroductionFilterObject extends FilterObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };
};


class EducationFilterObject extends FilterObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };
};


class SkillFilterObject extends FilterObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };
};


class ExperienceFilterObject extends FilterObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };
};


class PortfolioFilterObject extends FilterObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };
};


export {IntroductionFilterObject, EducationFilterObject, SkillFilterObject, ExperienceFilterObject, PortfolioFilterObject}

        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]