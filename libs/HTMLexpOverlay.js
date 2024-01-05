class HTMLexpOverlay {
    #parentElement;
    #templateOverlayElement;
    #company;
    #address;
    #position;
    #period;
    #tags;
    #softwares;
    #duties;
    #pageElements;

    constructor(company, address, position, period, tags, softwares, duties) {
        this.#parentElement = document.querySelector("#myExperiences");
        this.#company = company;
        this.#address = address;
        this.#position = position;
        this.#period = period;
        this.#tags = tags;
        this.#softwares = softwares;
        this.#duties = duties;

        this.#templateOverlayElement = document.createElement('dialog');


        this.#templateOverlayElement.innerHTML = `
        <div id="infoWrapper">
        <div id="expInfoOverlay">
            <h3">JobTitle</h3>
            <span class="period"></span>
            <h3 class="company"></h3>
            <h4 class="address"></h4>
            <h5 class="position"></h5>
        </div>
        <div id="expDutiesOverlay">
            <h3">Duties</h3>
            <ul class="duties"></ul> 
        </div>
        <div id="expSoftwaresOverlay">
            <h3">Softwares</h3>
            <ul class="softwares"></ul> 
        </div>
        <span id="closeBtn">Close</span>
        </div>
        `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateOverlayElement() {
        return this.#templateOverlayElement;
    };
    get company() {
        return this.#company;
    };
    get address() {
        return this.#address;
    };
    get position() {
        return this.#position;
    };
    get period() {
        return this.#period;
    };
    get tags() {
        return this.#tags;
    };
    get softwares() {
        return this.#softwares;
    };
    get duties() {
        return this.#duties;
    };


    constructOverlayElement() {
        this.overlay = this.templateOverlayElement.cloneNode(true);
        this.overlay.querySelector('.company').textContent = this.company;
        this.overlay.querySelector('.address').textContent = this.address;
        this.overlay.querySelector('.position').textContent = this.position;
        this.overlay.querySelector('.period').textContent = this.period;

        // Select the ul elements
        const softwaresUl = this.overlay.querySelector('.softwares');
        const dutiesUl = this.overlay.querySelector('.duties');

        // Loop through each software and duty and create li elements
        this.softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        this.duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });


        // Closes the overlay
        this.overlay.querySelector('#closeBtn').onclick = () => {
            this.removeFromPage();
        };

        document.body.appendChild(this.overlay);
    }


    // Change the display attribute to show the overlay over the screen
    renderToPage() {
        document.body.querySelector('dialog').classList.add('active');
    };
  
    // Remove the overlay from the screen
    removeFromPage() {
        this.overlay.remove();
    }

};
  
  export default HTMLexpOverlay;
