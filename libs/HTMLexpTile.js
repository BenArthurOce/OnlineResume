import HTMLexpOverlay from './HTMLexpOverlay.js'

class HTMLexpTile {
    #parentElement;
    #templateTileElement;
    // #logoPath = "imgLogos/";
    
    constructor(parentElement) {
        this.#parentElement = parentElement
        this.#templateTileElement = `
            <div class="tile"">
                <h3 class="company"></h3>
                <p class="position">dskdfdsm dsfn,.we fdslewjring ,ds,sd f dfde rqw</p>
                </div>
            </div>
        `;

        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            
            /* Tile styles */
            .tile {
                width: 200px;
                height: 200px;
                background-color: #3498db;
                color: #fff;
                cursor: pointer;
                padding: 10px;
                box-sizing: border-box;
                transition: background-color 0.3s ease, color 0.3s ease;
                display: flex;
                flex-direction: column; 
                justify-content: flex-start; /* Align items at the top */
                align-items: center;
                font-weight: bold;
                position: relative; /* relative positioning for absolute positioning of icons */
            }
            
            /* Title styles */
            .projectName {
                padding: 0;
                margin-bottom: 10px; /* distance between the title of the project, and the description below it */
            }
            
            /* Container for language icons */
            .tile .icon-container {
                position: absolute;
                bottom: 0;
                left: 0;
                margin-bottom: 5px;
                margin-left: 10px;
            }
            
            /* Language icons */
            .lang-logo {
                height: 32px;
                width: 32px;
                margin-right: 10px; /* space between each icon */
            }
            
            /* Hover effect */
            .tile:hover {
                background-color: #2980b9;
                color: #000;
            }
            
            /* Responsive design */
            @media screen and (max-width: 600px) {
                .tile {
                    width: 100%;
                }
            }
                    
        `;
        document.head.appendChild(style);
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
