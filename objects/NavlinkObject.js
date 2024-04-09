// 
class NavLinkObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #title;                          //  Navbar Word
    #isActive;                      //  true = is supposed to be shown to user, false = meant to be invis
    constructor(index, title, isActive) {
        this.#className = "Navigation";
        this.#classType = "Link";
        this.#mvcComponent = "Model";
        this.#index = index;
        this.#title = title;
        this.#id = `${this.title.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#isActive = isActive;

        if (index === undefined|| title === undefined || isActive === undefined) {
            this.printToTerminal()
            throw new Error("ArticleObject: parameter declared is null/undefined")
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
    get title() {
        return this.#title;
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
        index       = ${this.index}
        title       = ${this.title}
        id          = ${this.id}
        isActive    = ${this.isActive}`);
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

export default NavLinkObject;