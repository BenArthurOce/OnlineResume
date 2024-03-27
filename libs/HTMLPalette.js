class HTMLPalette {
    #element;
    // #parentObject;
    #selectedPalette;
    constructor() {
        this.name = "HTMLPalette";
        this.element = null;
        // this.#parentObject = parentObject;
        this.#selectedPalette = "forest"; // Default palette
        this.initPalette();
    }
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    // get parentObject() {
    //     return this.#parentObject;
    // };
    get selectedPalette() {
        return this.#selectedPalette;
    };
    set selectedPalette(value) {
        this.#selectedPalette = value;
    };

    initPalette() {
        this.createPaletteElement();
        // this.renderToPage();
    };

    createPaletteElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <div>
            <label for="paletteSelector">Select Color Palette:</label>
            <select id="paletteSelector">
                    <option value="forest">Forest Style</option>

                    <option value="blue-refreshing">Blue Refreshing</option>
                    <option value="modernity-bloom">Modernity Bloom</option>
                    <option value="pink-pastels">Pink Pastels</option>
                    <option value="pink-unique">Pink Unique</option>
                    <option value="eclectic-peaceful">Eclectic Peaceful</option>


                    <option value="neutrals">Modern Neutrals</option>
                    <option value="light">Light Tones</option>
                    <option value="ocean">Ocean Blues</option>
                    <option value="pastel">Pastel Delight</option>
                    <option value="earthy-warm">Earthy Warmth</option>
                    <option value="neutral-gray">Neutral Grays</option>
                    <option value="cool-blue">Cool Blues</option>
                    <option value="sunset-glow">Sunset Glow</option>
                    <option value="royal-elegance">Royal Elegance</option>
                    <option value="vintage-charm">Vintage Charm</option>
                    <option value="deep-ocean">Deep Ocean</option>
                    <option value="romantic-reds">Romantic Reds</option>
                    <option value="mystic-mauves">Mystic Mauves</option>
                    <option value="coastal-breeze">Coastal Breeze</option>
                    <option value="elegant-plum">Elegant Plum</option>
                    <option value="citrus-splash">Citrus Splash</option>
                    <option value="dark-mystery">Dark Mystery</option>
                    <option value="striking-citrus">Striking Citrus</option>
            </select>
        </div>
        `.trim();
        this.element = tempEl.firstChild;
    };

    // renderToPage() {
    //     this.parentObject.appendChild(this.element);
    // };

    setSelectedPalette(palette) {
        if (this.colorPalettes.includes(palette)) {
            this.selectedPalette = palette;
            this.renderToPage();
        } else {
            console.error(`Palette "${palette}" not found.`);
        };
    };

    
};

export default HTMLPalette;