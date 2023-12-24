class HTMLexpOverlay {
    #parentElement;
    #templateOverlayElement;
    #company;
    #address;
    #position;
    #period;
    #softwares;
    #duties


    constructor(company, address, position, period, softwares, duties) {
        this.#parentElement = document.querySelector("#myExperience");
        this.#templateOverlayElement = `
        <dialog id="expDiag">
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
         </dialog>
        `;

    //     <dialog id="expDiag">
    //     <div id="infoWrapper">
    //         <div id="portfolioInfo">
    //             <h2 id="projectTitleOlay"></h2>
    //             <p id="projectLangsOlay"></p>
    //             <p id="projectSummaryOlay"></p>
    //         </div>
    //         <div id="imageContainer">
    //             <div id="slideshowContainer">
    //                 <a class="prev">❮</a>
    //                 <a class="next">❯</a>
    //             </div>
    //         </div>
    //     <span id="closeBtn">Close</span>
    //     </div>
    //  </dialog>
    // `;
        this.#company = company;
        this.#address = address;
        this.#position = position;
        this.#period = period;
        this.#softwares = softwares;
        this.#duties = duties;
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
    get softwares() {
        return this.#softwares;
    };
    get duties() {
        return this.#duties;
    };


    createElement() {
        const overlayElement = document.createElement('div');
        overlayElement.innerHTML = this.templateOverlayElement;

        overlayElement.querySelector('.company').textContent = this.company;
        overlayElement.querySelector('.address').textContent = this.address;
        overlayElement.querySelector('.position').textContent = this.position;
        overlayElement.querySelector('.period').textContent = this.period;

        // Select the ul elements
        const softwaresUl = overlayElement.querySelector('.softwares');
        const dutiesUl = overlayElement.querySelector('.duties');

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
        overlayElement.querySelector('#closeBtn').onclick = () => {
            this.removeFromPage();
        };

        document.body.appendChild(overlayElement);
        
    };


    // Change the display attribute to show the overlay over the screen
    renderToPage() {
        document.body.querySelector('#expDiag').classList.add('active');
    };
  
    // Remove the overlay from the screen
    removeFromPage() {
        const overlayElement = document.body.querySelector('#expDiag');
        if (overlayElement) {
            const parentElement = overlayElement.parentNode;
            if (parentElement) {
                parentElement.parentNode.removeChild(parentElement);
            }
        }
    }

};
  
  export default HTMLexpOverlay;
