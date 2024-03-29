// 

// import NavlinkObject from "./NavlinkObject.js";

class NavbarObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  The part of the resume data from Dictionary()
    #links;                          //  List of Links
    constructor(data) {
        this.#className = "Navbar";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#data = data;
        this.#links = [];
        this.addLinks();
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
    get links() {
        return this.#links;
    };

//****** Command to make this Object "visible" 
    toggleOn() {
        this.isActive = true;
    };

//****** Command to make this Object "invisible" 
    toggleOff() {
        this.isActive = false;
    };

//****** 
    addLinks() {

    };
};

export default NavbarObject