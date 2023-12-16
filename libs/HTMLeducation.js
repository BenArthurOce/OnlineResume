class HTMLeducation {
    #parentElement;
    #templateEduElement;
    constructor() {
        this.#parentElement = document.querySelector("#myEducation");
        this.#templateEduElement = `
        <article>
            <span class="institution"></span>
            <h3 class="degree"></h3>
        </article> 
      `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateEduElement() {
        return this.#templateEduElement;
    };

    renderToPage(degree, institution) {
        const newEduElement = document.createElement('div');
        newEduElement.innerHTML = this.templateEduElement;

        newEduElement.querySelector('.degree').textContent = degree;
        newEduElement.querySelector('.institution').textContent = institution;


        this.parentElement.appendChild(newEduElement);
    };
};

export default HTMLeducation