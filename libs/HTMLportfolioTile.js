import HTMLportfolioOverlay from './HTMLportfolioOverlay.js'

class HTMLportfolioTile {
    #parentElement;
    #templateTileElement;
    #logoPath = "imgLogos/";


    constructor(parentElement) {
        this.#parentElement = parentElement;
        this.#templateTileElement = document.createElement('div');
    
        this.#templateTileElement.innerHTML = `
                <h3 class="projectName"></h3>
                <p class="summarySmall"></p>
                <div class="icon-container">
        `;

        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .tile {
                width: 200px;
                height: 200px;
                background-color: #3498db;
                color: #fff;
                cursor: pointer;
                padding: 10px;
                box-sizing: border-box;
                transition: background-color 0.3s ease, color 0.3s ease;
                display: none;
                flex-direction: column; 
                justify-content: flex-start; /* Align items at the top */
                align-items: center;
                font-weight: bold;
                position: relative; /* relative positioning for absolute positioning of icons */
                opacity: 0; /* Initially set opacity to 0 */
                transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
            }

            .tile.active {
                display: flex;
                opacity: 1;
            }
            
            .projectName {
                padding: 0;
                margin-bottom: 10px; /* distance between the title of the project, and the description below it */
            }
            
            .tile .icon-container {
                position: absolute;
                bottom: 0;
                left: 0;
                margin-bottom: 5px;
                margin-left: 10px;
            }
            
            .lang-logo {
                height: 32px;
                width: 32px;
                margin-right: 10px; /* space between each icon */
            }
            
            .tile:hover {
                background-color: #2980b9;
                color: #000;
            }
            
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
    }

    get templateTileElement() {
        return this.#templateTileElement;
    }

    set templateTileElement(value) {
        this.#templateTileElement = value;
    }
    get logoPath() {
        return this.#logoPath;
    };

    renderToPage(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages) {
        const tile = this.#templateTileElement.cloneNode(true);

        tile.classList.add('tile', 'active');
        // console.log(projectTags)

        projectTags.forEach((tag, i) => {
            tile.classList.add(tag);
        });

        tile.querySelector('.projectName').textContent = projectName;
        tile.querySelector('.summarySmall').textContent = summarySmall;

        const iconContainer = tile.querySelector('.icon-container');
        projectLangs.forEach(lang => {
            const logoPath = `${this.logoPath}${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            iconContainer.appendChild(langLogo);
        });
        

        // // Tile changes colour when moused over
        // tile.addEventListener('mouseover', function () {
        //     this.querySelector('.tile').classList.add('hover');
        // });

        // // Tile changes colour when moused over
        // tile.addEventListener('mouseout', function () {
        //     this.querySelector('.tile').classList.remove('hover');
        // });

        // More details of the project are displayed when tile is clicked
        tile.addEventListener('click', function () {
            const overlayClass = new HTMLportfolioOverlay(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages, iconContainer);
            overlayClass.createElement()
            overlayClass.renderToPage()
        });

        this.parentElement.appendChild(tile);
    };


    filterTiles(searchTerm) {
        const allTiles = document.querySelectorAll('#myPortfolio .tile');

        allTiles.forEach(tile => {
            tile.classList.remove('active');
        });


        allTiles.forEach(tile => {

            // Get the tags of the div
            var tags2 = Array.from(tile.classList)

            // Print out the tags
            // console.log("Tags of the div:", tags2);


            // You should add data-tags attribute to your template
            const tags = tile.dataset.tags ? tile.dataset.tags.split(' ') : [];

            if (tags2.includes(searchTerm)) {
                tile.classList.add('active');
            }
        });
    }
}

export default HTMLportfolioTile;
