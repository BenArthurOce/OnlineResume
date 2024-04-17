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
            throw new Error("NavBarView: parameter declared is null/undefined")
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
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
    };

//****** return a Navigation Link ******
    returnSingleNavigationLink(index) {
        return this.links[index];
    };


//****** Prepares the Navigation bar HTML element ******
    generateElement() {
        // terms.setAttribute(‘id’,‘para-1’);

        const newElement = document.createElement('nav');
        newElement.setAttribute("id","top-nav-view");

        newElement.innerHTML = `
        <div class="container">
        </div>
         `;
        return newElement.cloneNode(true);
    };


//****** Adds a Navigation link object to this class. Appends the link element to the navigation bar element ******
    appendLink(navLink) {
        this.links.push(navLink)
        const elToAppend = this.element.querySelector(`.container`)
        elToAppend.appendChild(navLink.element)
    };
};
export default NavBarView;

