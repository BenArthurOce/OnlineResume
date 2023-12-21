import HTMLportfolioOverlay from './HTMLportfolioOverlay.js'

class HTMLportfolioTile {
    #parentElement;
    #templateTileElement;
    
    constructor() {
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templateTileElement = `
            <div class="tile"">
                <h2 class="projectname"></h2>
                <p class="projectdesc"></p>
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

    renderToPage(projectname, projectdesc, projectlangs, projecturl, projectimages) {
        const tile = document.createElement('div');
        tile.innerHTML = this.templateTileElement;

        tile.querySelector('.projectname').textContent = projectname;
        tile.querySelector('.projectdesc').textContent = projectdesc;


        tile.addEventListener('mouseover', function () {
            this.querySelector('.tile').classList.add('hover');
        });
        
        tile.addEventListener('mouseout', function () {
            this.querySelector('.tile').classList.remove('hover');
        });

        tile.addEventListener('click', function () {
            const overlayClass = new HTMLportfolioOverlay(projectname, projectdesc, projectlangs, projecturl, projectimages);
            overlayClass.createElement()
            overlayClass.renderToPage()
            // overlayClass.renderToPage();
            console.log("tile clicked")
            // this.showInfo(projectname, projectdesc, projectlangs, projecturl, projectimages);
        });

        this.parentElement.appendChild(tile);
    }

}





export default HTMLportfolioTile;
