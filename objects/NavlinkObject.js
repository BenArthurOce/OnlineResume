// 
class NavLinkObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #word;                          //  Navbar Word
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor(word) {
        this.#className = "Navigation";
        this.#classType = "Link";
        this.#mvcComponent = "Model";
        this.#isActive = false;
        this.#word = word;
        this.#id = `${this.#word.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
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
    get word() {
        return this.#word;
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
};

export default NavLinkObject;