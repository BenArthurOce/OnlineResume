class HTMLeducation {
    #templateEduElement;
    constructor() {
        this.#templateEduElement = `
        <article>
            <span class="institution"></span>
            <h3 class="degree"></h3>
        </article> 
      `;
    };
    get templateEduElement() {
        return this.#templateEduElement;
    };

    renderToPage(parentElement) {
        const newEduElement = document.createElement('div');
        newEduElement.innerHTML = this.templateEduElement;
        parentElement.appendChild(newEduElement);
    }
};

export default HTMLeducation