import HTMLexpOverlay from './HTMLexpOverlay.js'

class HTMLexpTile {
    #parentElement;
    #templateTileElement;
    // #logoPath = "imgLogos/";
    
    constructor() {
        this.#parentElement = document.querySelector("#myExperience");
        this.#templateTileElement = `
            <div class="tile"">
                <h3 class="company"></h3>
                <p class="position">dskdfdsm dsfn,.we fdslewjring ,ds,sd f dfde rqw</p>
                </div>
            </div>
        `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateTileElement() {
        return this.#templateTileElement;
    };
    // get logoPath() {
    //     return this.#logoPath;
    // };

    renderToPage(company, address, position, period, softwares, duties) {
        const tile = document.createElement('div');
        tile.innerHTML = this.templateTileElement;

        tile.querySelector('.company').textContent = company;
        tile.querySelector('.position').textContent = address;
  

        // Tile changes colour when moused over
        tile.addEventListener('mouseover', function () {
            this.querySelector('.tile').classList.add('hover');
        });
        
        // Tile changes colour when moused over
        tile.addEventListener('mouseout', function () {
            this.querySelector('.tile').classList.remove('hover');
        });

        // More details of the project are displayed when tile is clicked
        tile.addEventListener('click', function () {
            const overlayClass = new HTMLexpOverlay(company, address, position, period, softwares, duties);
            overlayClass.createElement()
            overlayClass.renderToPage()
        });

        this.parentElement.appendChild(tile);
    }

}

export default HTMLexpTile;
