class HTMLcompetency {
    #parentElement;
    #templateCompElement;
    constructor() {
        this.#parentElement = document.querySelector("#myCompetencies");
        this.#templateCompElement = `
        <article class="template-competency-article">
            <div class="competency-software-container">
                <h3 class="competencySoftware"></h3>
            </div>
            <div class="competencyScore-container"> <div class="competencyScore"></div></div>
        </article>
      `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateCompElement() {
        return this.#templateCompElement;
    };

    renderToPage(competencySoftware, competencyScore) {
        const newCompElement = document.createElement('div');
        newCompElement.innerHTML = this.templateCompElement;

        newCompElement.querySelector('.competencySoftware').textContent = competencySoftware;
        newCompElement.querySelector('.competencyScore').textContent = competencyScore;

        this.parentElement.appendChild(newCompElement);
    };
};

export default HTMLcompetency