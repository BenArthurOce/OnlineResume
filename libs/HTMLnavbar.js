class NavBar {
    #elementNavbar;
    #parentElement;

    constructor() {
        this.#parentElement = document.querySelector("#wrapper");
        this.#elementNavbar = '';

        this.createElement();
        this.renderToPage();
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

    get allNavLinks() {
        return this.elementNavbar.querySelectorAll('nav a');
    }

    createElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
             <a href="#" data-index="0" class="active">Introduction</a>
             <a href="#" data-index="1" class="inactive">Education</a>
             <a href="#" data-index="2" class="inactive">Skills</a>
             <a href="#" data-index="3" class="inactive">Experience</a>
             <a href="#" data-index="4" class="inactive">Portfolio</a>
         `;
        this.elementNavbar = newElement.cloneNode(true);
    }

    renderToPage() {
        // Append the created elements to the wrapper
        this.parentElement.appendChild(this.elementNavbar);
    }

    // Toggle function to turn an <a> element on or off
    // toggleNavLink(index) {
    //     const allLinks = this.allNavLinks;
    //     if (index >= 0 && index < allLinks.length) {
    //         allLinks.forEach((link, i) => {
    //             link.classList.toggle('active', i === index);
    //         });
    //     }
    // }

    setActiveSection(sectionIndex) {
        this.allNavLinks.forEach((link, index) => {
            if (index === sectionIndex) {
                link.classList.add('active');
                link.classList.remove('inactive');
            } else {
                link.classList.remove('active');
                link.classList.add('inactive');
            }
        });
    };

}

export default NavBar;
