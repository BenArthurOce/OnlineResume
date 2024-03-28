// class NavLink {
//     constructor(index, text, isActive = false) {
//         this.index = index;
//         this.text = text;
//         this.isActive = isActive;
//         this.element = this.createLinkElement();
//     }

//     createLinkElement() {
//         const link = document.createElement('a');
//         link.href = '#';
//         link.dataset.index = this.index;
//         link.textContent = this.text;
//         link.classList.add('nav-link');
//         if (this.isActive) {
//             link.classList.add('activated');
//         }
//         return link;
//     };

//     setText(text) {
//         this.text = text;
//         this.element.textContent = text;
//     };

//     toggleOn() {
//         this.isActive = true;
//         this.element.classList.add('activated');
//     };

//     toggleOff() {
//         this.isActive = false;
//         this.element.classList.remove('activated');
//     };


// }





// class NavBar {
//     #className;             // The name of the class
//     #headings;              // List of the Navbar names
//     #links;                 // Contains each of the NavLink() objects
//     // #parentObject;              // The object that contains this class
//     #element;               // The DOM element of this class
//     #indexCurrent;          // Which NavLink() object should be displayed on screen
//     constructor(headings) {
//         this.#className = "NavBar";
//         this.#headings = headings
//         this.#links = [];
//         // this.#parentObject = parentObject;
//         this.#element = this.createElement();
//         this.#indexCurrent = 0;
//         this.addInfoToElement();

//         this.addLink(0, this.#headings[0], true);
//         this.addLink(1, this.#headings[1]);
//         this.addLink(2, this.#headings[2]);
//         this.addLink(3, this.#headings[3]);
//         this.addLink(4, this.#headings[4]);
//     };
//     get className() {
//         return this.#className;
//     };
//     get headings() {
//         return this.#headings;
//     };
//     get links() {
//         return this.#links;
//     };
//     // get parentObject() {
//     //     return this.#parentObject;
//     // };
//     get element() {
//         return this.#element;
//     };
//     set element(value) {
//         this.#element = value;
//     };
//     get indexCurrent() {
//         return this.#indexCurrent;
//     };
//     set indexCurrent(value) {
//         this.#indexCurrent = value;
//         this.toggleNavLink(); // Call toggleActiveSection whenever index changes
//     };


//     toggleNavLink() {
//         this.links.forEach((link, index) => {
//             if (index === this.#indexCurrent) {
//                 link.toggleOn();
//             } else {
//                 link.toggleOff();
//             }
//         });
//     };


//     createElement() {
//         const navElement = document.createElement('nav');
//         navElement.innerHTML = `
//             <h1 class="${this.className.toLowerCase()}-title for-mobile"></h1>
//             <div class="container for-navbar-links"></div>
//             <a href="#" class="navbar-icon for-mobile">
//                 <i class="fa fa-bars"></i>
//             </a>
//         `;
//         return navElement;
//     };

//     addInfoToElement() {
//         const linkContainer = this.element.querySelector('.for-navbar-links');
//         this.links.forEach(link => {
//             linkContainer.appendChild(link.element);
//         });
//     };

//     addLink(index, text, isActive = false) {
//         const link = new NavLink(index, text, isActive);
//         this.links.push(link);
//         const linkContainer = this.element.querySelector('.for-navbar-links');
//         linkContainer.appendChild(link.element);
//     };

//     returnLink(index) {
//         return this.links[index];
//     };
// };




class NavBar {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #element;                       //  HTML Element
    constructor() {
        this.#className = "NavBar";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#element = this.generateElement();
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
    get element() {
        return this.#element;
    };

    generateElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
            <h1 class="navbar-title for-mobile"></h1>
            <div class="container for-navbar-links">
                <a href="#" data-index="0" class="nav-link activated">About Me</a>
                <a href="#" data-index="1" class="nav-link">Skills</a>
                <a href="#" data-index="2" class="nav-link">Education</a>
                <a href="#" data-index="3" class="nav-link">Experience</a>
                <a href="#" data-index="4" class="nav-link">Portfolio</a>
            </div>
            <a href="#" class="navbar-icon for-mobile">
                <i class="fa fa-bars"></i>
            </a>
         `;
        return newElement.cloneNode(true);
    };


};
export default NavBar;