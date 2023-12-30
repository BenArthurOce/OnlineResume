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

        this.#company = company;
        this.#address = address;
        this.#position = position;
        this.#period = period;
        this.#softwares = softwares;
        this.#duties = duties;
        
        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            #expDiag {
                display: none;   /* Default display is non visible. Display is modified when class becomes "active" */
                position: fixed;  /* Positions the overlay relative to the browser window and does not scroll with the page */
                top: 0;
                left: 0;
                margin-left: 20%;   /* navigation sidebar is currently at 20%. The overlay does not overlap the sidebar*/
                width: 80%;         /* navigation sidebar is currently at 20%. The overlay does not overlap the sidebar*/
                height: 95%;        /* Set at 100% to cover whole screen. Reduced by 5% to include the "Close" button at the bottom */
                background: rgba(0, 0, 0, 0.7);     /* Sets transparent background */
                color: #fff;
                justify-content: center;    /* Centers the child elements horizontally */
                align-items: center;        /* Centers the child elements vertically */
                
            }
            
            #expDiag.active {
                display: flex;      /* Overlay becomes visible when is active*/
            }
            
            #infoWrapper {
                font-family: 'Arial', sans-serif;
                padding: 2% 5%;     /* padding on the top/bottom and left/right of the wrapper.*/
                gap: 40px;
                display: flex;
                flex-direction: row;
                justify-content: center;    /* Centers the child elements horizontally */
                align-items: center;        /* Centers the child elements vertically */
                flex: 1 1 0px;
            }
            
            
            #expInfoOverlay, #expDutiesOverlay, #expSoftwaresOverlay {
                padding: 20px;
                /* min-height: 300px; */
                flex-basis: 30%;
            
            }
            
            
            #expInfoOverlay, #expDutiesOverlay, #expSoftwaresOverlay {
                padding: 20px;
                background-color: #2ecc71;
                flex: 1; /* Updated to make all child elements take up equal space */
            }   
            
            
            #closeBtn {
                cursor: pointer;
                color: #e74c3c;
                position: absolute;
                top: 90%;
                left: 50%;
                transform: translateX(-50%);         /* Centers the button horizontally.*/
                font-weight: bold;
                font-size: 20px;
            }
           
        `;
        document.head.appendChild(style);
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
