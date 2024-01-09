

class HTMLskillTile {
    #tile;
    #data;
    #parentElement;

    constructor(company, address, position, period, tags, softwares, duties) {
        this.#tile = ''
        this.#data = {
            company,
            address,
            position,
            period,
            tags,
            softwares,
            duties
        }
        this.#parentElement = document.querySelector("#myExperiences");
        const style = document.createElement('style');

    };
    get tile() {
        return this.#tile;
    };
    set tile(value) {
        this.#tile = value;
    };
    get data() {
        return this.#data;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get company() {
        return this.#data.company;
    };
    get address() {
        return this.#data.address;
    };
    get position() {
        return this.#data.position;
    };
    get period() {
        return this.#data.period;
    };
    get tags() {
        return this.#data.tags;
    };
    get softwares() {
        return this.#data.softwares;
    };
    get duties() {
        return this.#data.duties;
    };

    createElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="title">
                <i></i>
                <h4 class="position"></h4>
            </div>
            <h3 class="company"></h3>
        `;
        this.tile = newElement.cloneNode(true);
    };

    applyInfoToElement() {
        // Add Tags for active classes
        this.tile.classList.add('tile', 'active');

        // Add tags for job types
        this.tags.forEach((tag, i) => {
            this.tile.classList.add(tag);
        });

        this.tile.querySelector('.company').textContent = this.company;
        this.tile.querySelector('.position').textContent = this.position;

        // Add small icon in top left
        const iconClass = this.getIconClassBasedOnTag(this.tags[0]);
        this.tile.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
    };

    addEventListeners(){
        // Tile lights up when hovered over
        this.tile.addEventListener('mouseover', () => {
            this.tile.classList.add('hover');
        });

        // Tile returns to normal when mouse unhovers
        this.tile.addEventListener('mouseout', () => {
            this.tile.classList.remove('hover');
        });

        // When tile is clicked, an Overlay() will appear
        this.tile.addEventListener('click', () => {
            const overlayClass = new HTMLexpOverlay(this.tile, this.data);
            overlayClass.createElement();
            overlayClass.renderToPage();
        });
    };

    renderToPage() {
        this.createElement();
        this.applyInfoToElement();
        this.addEventListeners();
        this.parentElement.appendChild(this.tile);
    };

    // Helper method to get icon class based on the tag
    getIconClassBasedOnTag(tag) {
        switch (tag) {
            case "Programming":
                return 'fa-github';
            case "Accounting":
                return 'fa-money';
            case "CustomerService":
                return 'fa-bell';
            default:
                return '';
        }
    };

}

export default HTMLskillTile;
