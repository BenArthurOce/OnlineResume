class HTMLcompetency {
    #templateCompElement;
    constructor() {
        this.#templateCompElement = `
        <article class="template-competency-article">
            <div class="competency-software-container">
                <h3 class="competencySoftware"></h3>
            </div>
            <div class="competencyScore-container"></div>
      </article>
      `;
    };
    get templateCompElement() {
        return this.#templateCompElement;
    };

    renderToPage(parentElement) {
        const newCompElement = document.createElement('div');
        newCompElement.innerHTML = this.templateCompElement;
        parentElement.appendChild(newCompElement);
    }
};

export default HTMLcompetency