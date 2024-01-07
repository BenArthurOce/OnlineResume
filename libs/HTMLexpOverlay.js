class HTMLexpOverlay {
    #parentElement;
    #expTile;
    #expData;

    constructor(expTile, expData) {
        this.overlay = ''
        this.#parentElement = document.querySelector("#myExperiences");
        this.#expTile = expTile;
        this.#expData = expData;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get expTile() {
        return this.#expTile;
    };
    get expData() {
        return this.#expData;
    };

    createElement() {
        const newElement = document.createElement('dialog');
        newElement.innerHTML = `
            <div class="infoWrapper">
                <article>
                    <h3">JobTitle</h3>
                    <span class="period"></span>
                    <h3 class="company"></h3>
                    <h4 class="address"></h4>
                    <h5 class="position"></h5>
                </article>
                <article>
                    <h3">Duties</h3>
                    <ul class="duties"></ul> 
                </article>
                <article>
                    <h3">Softwares</h3>
                    <ul class="softwares"></ul> 
                </article>
                <span class="closeBtn">Close</span>
            </div>
        `;
        this.overlay = newElement.cloneNode(true);
    };

    applyInfoToElement() {
        this.overlay.querySelector('.company').textContent = this.expData.company;
        this.overlay.querySelector('.address').textContent = this.expData.address;
        this.overlay.querySelector('.position').textContent = this.expData.position;
        this.overlay.querySelector('.period').textContent = this.expData.period;   
        
        // Select the ul elements
        const softwaresUl = this.overlay.querySelector('.softwares');
        const dutiesUl = this.overlay.querySelector('.duties');

        // Loop through each software and duty and create li elements
        this.expData.softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        this.expData.duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });
    };

    addEventListeners() {
        // On pressing the close button, deletes the overlay
        this.overlay.querySelector('.closeBtn').onclick = () => {
            document.body.querySelector('#prev').classList.remove('disabled');
            document.body.querySelector('#next').classList.remove('disabled');
            this.overlay.remove();
        };
    };

    renderToPage() {
        this.createElement();
        this.applyInfoToElement();
        this.addEventListeners();
        document.body.appendChild(this.overlay);

        // Change the display attribute to show the overlay over the screen
        document.body.querySelector('#prev').classList.add('disabled');
        document.body.querySelector('#next').classList.add('disabled');
        document.body.querySelector('dialog').classList.add('active');
    };  
};
  
  export default HTMLexpOverlay;
