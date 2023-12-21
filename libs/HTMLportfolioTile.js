import HTMLportfolioOverlay from './HTMLportfolioOverlay.js'

class HTMLportfolioTile {
    #parentElement;
    #templateTileElement;
    #logoPath = "imgLogos/";
    
    constructor() {
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templateTileElement = `
            <div class="tile"">
                <h3 class="projectName"></h3>
                <p class="summarySmall">dskdfdsm dsfn,.we fdslewjring ,ds,sd f dfde rqw</p>
                <div class="icon-container">
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
    get logoPath() {
        return this.#logoPath;
    };

    renderToPage(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages) {
        const tile = document.createElement('div');
        tile.innerHTML = this.templateTileElement;

        tile.querySelector('.projectName').textContent = projectName;
        tile.querySelector('.summarySmall').textContent = summarySmall;

        const iconContainer = tile.querySelector('.icon-container');
        projectLangs.forEach(lang => {
            const logoPath = `${this.#logoPath}${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            iconContainer.appendChild(langLogo);
        });
        

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
            const overlayClass = new HTMLportfolioOverlay(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages, iconContainer);
            overlayClass.createElement()
            overlayClass.renderToPage()
        });

        this.parentElement.appendChild(tile);
    }

}

export default HTMLportfolioTile;
