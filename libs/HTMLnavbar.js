class NavLink {
    constructor(index, text, isActive = false) {
        this.index = index;
        this.text = text;
        this.isActive = isActive;
        this.element = this.createLinkElement();
    }

    createLinkElement() {
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.index = this.index;
        link.textContent = this.text;
        link.classList.add('nav-link');
        if (this.isActive) {
            link.classList.add('activated');
        }
        return link;
    };

    setText(text) {
        this.text = text;
        this.element.textContent = text;
    };

    toggleOn() {
        this.isActive = true;
        this.element.classList.add('activated');
    };

    toggleOff() {
        this.isActive = false;
        this.element.classList.remove('activated');
    };


}





class NavBar {
    #className;             // The name of the class
    #headings;              // List of the Navbar names
    #links;                 // Contains each of the NavLink() objects
    // #parentObject;              // The object that contains this class
    #element;               // The DOM element of this class
    #indexCurrent;          // Which NavLink() object should be displayed on screen
    constructor(headings) {
        this.#className = "NavBar";
        this.#headings = headings
        this.#links = [];
        // this.#parentObject = parentObject;
        this.#element = this.createElement();
        this.#indexCurrent = 0;
        this.addInfoToElement();

        this.addLink(0, this.#headings[0], true);
        this.addLink(1, this.#headings[1]);
        this.addLink(2, this.#headings[2]);
        this.addLink(3, this.#headings[3]);
        this.addLink(4, this.#headings[4]);
    };
    get className() {
        return this.#className;
    };
    get headings() {
        return this.#headings;
    };
    get links() {
        return this.#links;
    };
    // get parentObject() {
    //     return this.#parentObject;
    // };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get indexCurrent() {
        return this.#indexCurrent;
    };
    set indexCurrent(value) {
        this.#indexCurrent = value;
        this.toggleNavLink(); // Call toggleActiveSection whenever index changes
    };


    toggleNavLink() {
        this.links.forEach((link, index) => {
            if (index === this.#indexCurrent) {
                link.toggleOn();
            } else {
                link.toggleOff();
            }
        });
    };


    createElement() {
        const navElement = document.createElement('nav');
        navElement.innerHTML = `
            <h1 class="${this.className.toLowerCase()}-title for-mobile"></h1>
            <div class="container for-navbar-links"></div>
            <a href="#" class="navbar-icon for-mobile">
                <i class="fa fa-bars"></i>
            </a>
        `;
        return navElement;
    };

    addInfoToElement() {
        const linkContainer = this.element.querySelector('.for-navbar-links');
        this.links.forEach(link => {
            linkContainer.appendChild(link.element);
        });
    };

    addLink(index, text, isActive = false) {
        const link = new NavLink(index, text, isActive);
        this.links.push(link);
        const linkContainer = this.element.querySelector('.for-navbar-links');
        linkContainer.appendChild(link.element);
    };

    returnLink(index) {
        return this.links[index];
    };
};

export default NavBar;