class HTMLeduskills {
    #parentElement;
    #templateEduElement;
    #institution;
    #degree
    constructor(institution, degree, hardskills, softskills) {
        this.#parentElement = document.querySelector("#myEducationsSkills");
        this.#institution = institution;
        this.#degree = degree
    };
    get parentElement() {
        return this.#parentElement;
    };
    get institution() {
        return this.#institution;
    };
    get degree() {
        return this.#degree;
    };

    createElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <span class="institution"></span>
        <h3 class="degree"></h3>
        `;
        this.tile = newElement.cloneNode(true);
    };

    applyInfoToElement() {
        // Add Tags for active classes
        this.tile.classList.add('tile', 'active');

        this.tile.querySelector('.institution').textContent = this.institution;
        this.tile.querySelector('.degree').textContent = this.degree;
    };

    renderToPage() {
        this.createElement();
        this.applyInfoToElement();
        // this.addEventListeners();
        this.parentElement.appendChild(this.tile);
    };
};

export default HTMLeduskills