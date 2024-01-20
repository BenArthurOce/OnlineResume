class NavBar {
    #elementNavbar;
    #parentElement;

    constructor() {
        this.#parentElement = document.querySelector("#wrapper");
        this.#elementNavbar = '';

        this.createElement();
        this.renderToPage();
        this.setupEventListeners();
    }

    get parentElement() {
        return this.#parentElement;
    }

    get elementNavbar() {
        return this.#elementNavbar;
    }

    set elementNavbar(value) {
        this.#elementNavbar = value;
    }

    get hamburgerIcon() {
        return this.elementNavbar.querySelector('.mobile-nav-icon');
    }

    get navLinkContainer() {
        return this.elementNavbar.querySelector('.nav-links-container');
    }

    get allNavLinks() {
        return this.elementNavbar.querySelectorAll('nav > .nav-links-container > a');
    }

    toggleActive(index) {
        this.allNavLinks[index].classList.toggle('activated');
    };

    createElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
            <div class="nav-links-container">
                <a href="#" data-index="0" class="activated">About Me</a>
                <a href="#" data-index="1" class="">Skills</a>
                <a href="#" data-index="2" class="">Education</a>
                <a href="#" data-index="3" class="">Experience</a>
                <a href="#" data-index="4" class="">Portfolio</a>
            </div>
            <a href="#" class="mobile-nav-icon">
                <i class="fa fa-bars"></i>
            </a>
         `;
        this.elementNavbar = newElement.cloneNode(true);
    }

    renderToPage() {
        // Append the created elements to the wrapper
        this.parentElement.appendChild(this.elementNavbar);
    };

    setActiveElement(sectionIndex) {
        this.allNavLinks.forEach((link, index) => {
            if (index === sectionIndex) {
                link.classList.add('activated');
            } else {
                link.classList.remove('activated');
            }
        });
    };

    displayHamburgerMenu() {
        if (this.navLinkContainer.style.display === "block") {
            this.navLinkContainer.style.display = "none";
        } else {
            this.navLinkContainer.style.display = "block";
        }
    }

    setupEventListeners() {
        this.hamburgerIcon.addEventListener('click', () => {
            this.displayHamburgerMenu();
        });
    }

}



export default NavBar;
