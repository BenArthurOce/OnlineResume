class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.timeout = null
    }

    async init() {
        console.log("CONTROLLER: init" + "\n" + "----------")
        await this.model.init();
        await this.view.init();

        clearTimeout(this.searchTimeout);

        this.model.bindPaletteChanged(this.onPaletteChanged.bind(this));
        this.view.bindPaletteChange(this.handlePaletteChange.bind(this));

        this.model.bindArticleFiltered(this.onArticleFiltered.bind(this));
        this.view.bindArticleFilter(this.handleArticleFilter.bind(this));

        this.model.bindTileFiltered(this.onTileFiltered.bind(this));
        this.view.bindTileFilter(this.handleTileFilter.bind(this));

        this.model.bindIndexChanged(this.onIndexChanged.bind(this));
        this.view.bindIndexChange(this.handleIndexChange.bind(this));

        // Manually activate so the app displays the first section
        this.handleIndexChange(0);

    };


//****** On Change ******
    onPaletteChanged(modelData) {
        console.log("CONTROLLER: onPaletteChanged")
        this.view.commenceRender(modelData);
    };

    onArticleFiltered(modelData) {
        console.log("CONTROLLER: onArticleFiltered")
        this.view.commenceRender(modelData);
    };

    onTileFiltered(modelData) {
        console.log("CONTROLLER: onTileFiltered")
        this.view.commenceRender(modelData);
    };

    onIndexChanged(modelData) {
        console.log("CONTROLLER: onIndexChanged")
        this.view.commenceRender(modelData);
    };


//****** Handle Change ******
    handlePaletteChange(style) {
        console.log("CONTROLLER: handlePaletteChange")
        this.model.changeColour(style)
    };

    handleArticleFilter(subObject) {
        console.log("CONTROLLER: handleArticleFilter")
        this.model.filterStateArticles(subObject)
    };

    handleTileFilter(subObject) {
        console.log("CONTROLLER: handleTileFilter")
        this.model.filterStateTiles(subObject)
    };

    handleIndexChange(input) {
        console.log("CONTROLLER: handleIndexChange");
    
        const oldIndex = this.model.state.index;
        const numSections = this.model.data.count;
        let newIndex;
    
        if (input === "-1") {
            newIndex = oldIndex - 1;
        } else if (input === "+1") {
            newIndex = oldIndex + 1;
        } else {
            newIndex = parseInt(input); // Convert input to integer if it's not already
        }
    
        // Handle cycling of index if it goes beyond the upper or lower bounds
        if (newIndex < 0) {
            newIndex = numSections - 1; // Wrap around to the last index
        } else if (newIndex >= numSections) {
            newIndex = 0; // Wrap around to the first index
        }

        this.model.changeIndex(newIndex);
    };


};

export default Controller