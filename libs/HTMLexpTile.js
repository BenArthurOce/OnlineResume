import HTMLexpOverlay from './HTMLexpOverlay.js';

class HTMLexpTile {
    #parentElement;
    #templateTileElement;

    constructor(parentElement) {
        this.#parentElement = parentElement;
        this.#templateTileElement = document.createElement('div');

        this.#templateTileElement.innerHTML = `
            <div class="title">
                <i></i>
                <p class="position"></p>
            </div>
            <h3 class="company"></h3>
        `;

        const style = document.createElement('style');
        style.textContent = `

        .title {
            gap: 10px;
            display: flex;
            align-items: center; /* Align items vertically */
        }
    
        .title i {
            margin: 30px; /* Remove default margin for the position text */
            height: 30px;
            width: 30px;
        }
    
        .title p {
            margin: 0; /* Remove default margin for the position text */
            align-items: center;
            text-align: center;
        }


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
                display: none;
                flex-direction: column; 
                justify-content: flex-start;
                align-items: center;
                font-weight: bold;
                position: relative;
            }

            .tile.active {
                display: flex;
            }

            /* Title styles */
            .projectName {
                padding: 0;
                margin-bottom: 10px;
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
                margin-right: 10px;
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
    }

    get parentElement() {
        return this.#parentElement;
    }

    get templateTileElement() {
        return this.#templateTileElement;
    }

    set templateTileElement(value) {
        this.#templateTileElement = value;
    }

    renderToPage(company, address, position, period, tags, softwares, duties) {
        const tile = this.#templateTileElement.cloneNode(true);

        tile.classList.add('tile', 'active');

        tags.forEach((tag, i) => {
            tile.classList.add(tag);
        });

        tile.querySelector('.company').textContent = company;
        tile.querySelector('.position').textContent = position;

        switch (tags[0]) {
            case "Programming":
                tile.querySelector('i').className = 'sidebar-icon fa fa-github';
                break;
            case "Accounting":
                tile.querySelector('i').className = 'sidebar-icon fa fa-money';
                break;
            case "CustomerService":
                tile.querySelector('i').className = 'sidebar-icon fa fa-bell';
                break;
            default:
                break;
        }



        // tile.querySelector('i').classList.add('sidebar-icon fa fa-money')

        


        tile.addEventListener('mouseover', function () {
            this.classList.add('hover');
        });

        tile.addEventListener('mouseout', function () {
            this.classList.remove('hover');
        });

        tile.addEventListener('click', function () {
            const overlayClass = new HTMLexpOverlay(company, address, position, period, tags, softwares, duties);
            overlayClass.createElement();
            overlayClass.renderToPage();
        });

        this.parentElement.appendChild(tile);
    }

    filterTiles(searchTerm) {
        const allTiles = document.querySelectorAll('#myExperience .tile');

        allTiles.forEach(tile => {
            tile.classList.remove('active');
        });



        allTiles.forEach(tile => {

            // Get the tags of the div
            var tags2 = Array.from(tile.classList)

            // Print out the tags
            console.log("Tags of the div:", tags2);


            // You should add data-tags attribute to your template
            const tags = tile.dataset.tags ? tile.dataset.tags.split(' ') : [];

            if (tags2.includes(searchTerm)) {
                tile.classList.add('active');
            }
        });
    }
}

export default HTMLexpTile;
