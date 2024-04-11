//

class NavBarView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #links;                         //  Array containing the NavBarLinks (Added to the class in main View code)
    #displayHeading;                //  For mobile, the current active section name
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(displayHeading) {
        this.#className = "Navigation";
        this.#classType = "Bar";
        this.#mvcComponent = "View";
        this.#links = [];
        this.#displayHeading = displayHeading;
        this.#id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#isActive = false; // Maybe not needed for NavBarView
        this.#element = this.generateElement();

        if (displayHeading === undefined) {
            this.printToTerminal()
            throw new Error("ArticleView: parameter declared is null/undefined")
        }
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get id() {
        return this.#id;
    };
    get links() {
        return this.#links;
    };
    get displayHeading() {
        return this.#displayHeading;
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

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className       = ${this.className}
        classType       = ${this.classType}
        mvcType         = ${this.mvcComponent}
        id              = ${this.id}
        links           = ${this.links}
        displayHeading  = ${this.displayHeading}
        isActive        = ${this.isActive}`);
    };

//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        //this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        //this.element.classList.remove("activated")
    };

//****** return a Navigation Link ******
    returnSingleNavigationLink(index) {
        return this.links[index];
    };

//****** Prepares the Navigation bar HTML element ******
    generateElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
            <h1 class="navbar-title for-mobile">${this.displayHeading}</h1>
            <div class="container for-navbar-links">

            </div>
            <a href="#" class="navbar-icon for-mobile">
                <i class="fa fa-bars"></i>
            </a>
         `;
        return newElement.cloneNode(true);
    };


//****** Adds a Navigation link object to this class. Appends the link element to the navigation bar element ******
    appendLink(navLink) {
        this.links.push(navLink)
        const elToAppend = this.element.querySelector(`.container.for-navbar-links`)
        elToAppend.appendChild(navLink.element)
    };
};
export default NavBarView;

