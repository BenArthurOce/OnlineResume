// 

class NavBarObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #links;                         //  Contains the NavLinkObjects
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor() {
        this.#className = "Navigation";
        this.#classType = "Bar";
        this.#mvcComponent = "Model";
        this.#links = [];
        this.#isActive = false;
        this.#id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
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
    get links() {
        return this.#links;
    };
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
    };


//****** Command to make this Object "visible"      NOTE: We only have one navigation bar. This should never be "toggled" on or off. However it might have some use during mobile sandwhich icon press
    toggleOn() {
        this.isActive = true;
    };

//****** Command to make this Object "invisible"     NOTE: We only have one navigation bar. This should never be "toggled" on or off. However it might have some use during mobile sandwhich icon press
    toggleOff() {
        this.isActive = false;
    };

//****** Adds a Navigation link object to this class.
    appendLink(navLink) {
        this.links.push(navLink)
    };
};

export default NavBarObject