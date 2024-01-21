class NavBar {
    #element;
    #parentEl;
    #activeIndex
    #activeElName
    constructor(parentEl) {
        this.name = "NavBar";
        this.#parentEl = parentEl;
        this.#element = '';
        this.#activeIndex = 0
        this.#activeElName = ''

        this.createElement();
        this.renderToPage();
        this.addLocalEventListeners();
    }
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get parentEl() {
        return this.#parentEl;
    };
    get activeIndex() {
        return this.#activeIndex;
    };
    set activeIndex(value) {
        this.#activeIndex = value;
    };
    get activeElName() {
        return this.#activeElName;
    };
    set activeElName(value) {
        this.#activeElName = value;
    };
    get headerEl() {
        return this.element.querySelector(`.mob-section-title`)
    }
    get hamburgerIcon() {
        return this.element.querySelector('.mobile-nav-icon');
    }
    get linkContainerEl() {
        return this.element.querySelector('.nav-links-container');
    };
    get allLinkEl() {
        return this.element.querySelectorAll('nav > .nav-links-container > a');
    };


    createElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
            <h1 class="mob-section-title activated"></h1>
            <div class="nav-links-container">
                <a href="#" data-index="0" class="nav-link activated">About Me</a>
                <a href="#" data-index="1" class="nav-link">Skills</a>
                <a href="#" data-index="2" class="nav-link">Education</a>
                <a href="#" data-index="3" class="nav-link">Experience</a>
                <a href="#" data-index="4" class="nav-link">Portfolio</a>
            </div>
            <a href="#" class="mobile-nav-icon">
                <i class="fa fa-bars"></i>
            </a>
         `;
        this.element = newElement.cloneNode(true);
    };

    renderToPage() {
        // Append the created elements to the wrapper
        this.parentEl.appendChild(this.element);
    };

    addLocalEventListeners() {
        this.hamburgerIcon.addEventListener('click', () => { 
            // The mobile navbar grows to show all links
            this.linkContainerEl.classList.toggle('activated')

            // The mobile h1 header is temp removed while hamburger is open
            this.headerEl.classList.toggle('activated')
        });

        // When a navlink is clicked, close the hamburger menu
        this.allLinkEl.forEach((link, i) => {
            link.addEventListener('click', () => { 
                this.linkContainerEl.classList.remove('activated')
                this.headerEl.classList.add('activated')
            });  
        });
    };

    updateActiveLink() {
        // Reset all
        this.allLinkEl.forEach((link, i) => {link.classList.remove('activated')});

        // Activate the current link
        this.allLinkEl[this.activeIndex].classList.add('activated')
    };

    updateActiveName(sectionNames) {
        this.activeElName = sectionNames[this.activeIndex];
        this.headerEl.innerHTML = this.activeElName;
    };


};



export default NavBar;
