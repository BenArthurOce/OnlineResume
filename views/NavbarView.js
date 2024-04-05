//

class NavBarView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #links;                         //  Array containing the NavBarLinks (Added to the class in main View code)
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor() {
        this.#className = "NavBar";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#links = [];
        this.#isActive = false;
        this.#element = this.generateElement();
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
    get links() {
        return this.#links;
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

//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };

//****** return a Navigation Link ******
    returnSingleNavigationLink(index) {
        return this.links[index];
    };

//****** Prepares the Navigation bar HTML element ******
    generateElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
            <h1 class="navbar-title for-mobile"></h1>
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

