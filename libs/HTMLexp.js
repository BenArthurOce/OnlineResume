class HTMLexp {
    #parentElement;
    #templateExpElement;
    constructor() {
        this.#parentElement = document.querySelector("#myExperience");
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
    get parentElement() {
        return this.#parentElement;
    };
    get templateExpElement() {
        return this.#templateExpElement;
    };

    renderToPage(company, address, position, period, softwares, duties) {
        const newExpElement = document.createElement('div');
        newExpElement.innerHTML = this.templateExpElement;

        newExpElement.querySelector('.company').textContent = company;
        newExpElement.querySelector('.address').textContent = address;
        newExpElement.querySelector('.position').textContent = position;
        newExpElement.querySelector('.period').textContent = period;

        // Select the ul elements
        const softwaresUl = newExpElement.querySelector('.softwares');
        const dutiesUl = newExpElement.querySelector('.duties');

        // Loop through each software and duty and create li elements
        softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });

        this.parentElement.appendChild(newExpElement);
    };
};

export default HTMLexp