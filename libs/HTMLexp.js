class HTMLexp {
    #templateExpElement;
    constructor() {
        this.#templateExpElement = `
          <article>
            <span class="period"></span>
            <h3 class="company"></h3>
            <h4 class="address"></h4>
            <h5 class="position"></h5>
            <h6>Software Used:</h6>
            <ul class="softwares"></ul> 
            <h6>Duties:</h6>
            <ul class="duties"></ul> 
          </article>
      `;
    };
    get templateExpElement() {
        return this.#templateExpElement;
    };

    renderToPage(parentElement) {
        const newExpElement = document.createElement('div');
        newExpElement.innerHTML = this.templateExpElement;
        parentElement.appendChild(newExpElement);
    }
};

export default HTMLexp