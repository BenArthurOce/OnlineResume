// 
class NavlinkObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #word;                          //  Navbar Word
    constructor(word) {
        this.#className = "Navlink";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#word = word;
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
    get word() {
        return this.#word;
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

export default NavlinkObject;