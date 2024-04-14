// Whenever a Tile() is clicked, an Overlay() will appear to give more detailed information about the job/project

class OverlayObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index number of overlay. Will match with the Tile()
    #data;                          //  String displayed on screen
    #isActive;                      //  DOM element displays a different attribute if active
    constructor(index, data, isActive) {
        this.#className = "Overlay";
        this.#classType = null
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        this.#isActive = isActive;

        if (index === undefined || data === undefined || isActive === undefined) {
            this.printToTerminal()
            throw new Error("OverlayObject: parameter declared is null/undefined")
        }
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
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
    };

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className   = ${this.className}
        classType   = ${this.classType}
        mvcType     = ${this.mvcComponent}
        id          = ${this.id}
        index       = ${this.index}
        data        = (See Below)
        isActive    = ${this.isActive}
        `);
        console.log(this.data)
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


class ExperienceOverlayObject extends OverlayObject {
    constructor(index, data, isActive) {
        super(index, data, isActive);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};


class PortfolioOverlayObject extends OverlayObject {
    constructor(index, data, isActive) {
        super(index, data, isActive);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
    };
};

export {ExperienceOverlayObject, PortfolioOverlayObject}