//

class PaletteView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #options;                       //  Array containing the colour options
    #element;                       //  HTML Element
    constructor() {
        this.#className = "Palette";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#options = [];
        this.#element = this.generateElement();
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get options() {
        return this.#options;
    };
    get element() {
        return this.#element;
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
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
        return newElement.firstElementChild
    };
};
export default PaletteView;

