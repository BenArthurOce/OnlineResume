class NavBar {
    #elementNavbar
    #parentElement;
    constructor() {
        this.#parentElement = document.querySelector("#wrapper");
        this.#elementNavbar = ''
        
        this.createElement();
        this.renderToPage();

    };
    get parentElement() {
        return this.#parentElement;
    };
    get elementNavbar() {
        return this.#elementNavbar;
    };
    set elementNavbar(value) {
        this.#elementNavbar = value;
    };
    get allNavLinks() {
        return this.elementNavbar.querySelectorAll('nav a')
    }

    createElement() {
        const newElement = document.createElement('nav');
        newElement.innerHTML = `
             <a href="#" data-index="0" class="active">Introduction</a>
             <a href="#" data-index="1" class="">Education and Skills</a>
             <a href="#" data-index="2" class="">Experience</a>
             <a href="#" data-index="3" class="">Portfolio</a>
         `;
        this.elementNavbar = newElement.cloneNode(true);
    };


    renderToPage() {
        // Append the created elements to the wrapper
        this.parentElement.appendChild(this.elementNavbar);
    };
};

export default NavBar