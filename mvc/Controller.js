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

        this.model.bindOnLoaded(this.onLoaded.bind(this));
        this.view.bindOnLoad(this.handleOnLoad.bind(this));

        this.model.bindPaletteChanged(this.onPaletteChanged.bind(this));
        this.view.bindPaletteChange(this.handlePaletteChange.bind(this));

        this.model.bindArticleFiltered(this.onArticleFiltered.bind(this));
        this.view.bindArticleFilter(this.handleArticleFilter.bind(this));

        this.model.bindTileFiltered(this.onTileFiltered.bind(this));
        this.view.bindTileFilter(this.handleTileFilter.bind(this));

        this.model.bindIndexChanged(this.onIndexChanged.bind(this));
        this.view.bindIndexChange(this.handleIndexChange.bind(this));

        this.model.bindOverlayStarted(this.onOverlayStarted.bind(this));
        this.view.bindOverlayStart(this.handleOverlayStart.bind(this));

        this.model.bindOverlayClosed(this.onOverlayClosed.bind(this));
        this.view.bindOverlayClose(this.handleOverlayClose.bind(this));

        // Manually activate so the app displays the first section
        this.handleIndexChange(0);


        // this.handleOnLoad()

    };


//****** On Change ******

    onLoaded(modelData) {
        console.log("CONTROLLER: onLoaded")
        this.view.commenceRender(modelData);
    };

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

    onOverlayStarted(modelData) {
        console.log("CONTROLLER: onOverlayStarted")
        this.view.commenceRender(modelData);
    };

    onOverlayClosed(modelData) {
        console.log("CONTROLLER: onOverlayClosed")
        this.view.commenceRender(modelData);
    };


//****** Handle Change ******
    handleOnLoad() {
        console.log("CONTROLLER: handleOnLoad")
        this.model.testFunction()
    };

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

    handleOverlayStart(overlay) {
        console.log("CONTROLLER: handleOverlayStart")
        this.model.overlayStart(overlay)
    };

    handleOverlayClose(overlay) {
        console.log("CONTROLLER: handleOverlayClose")
        this.model.overlayClose(overlay)
    };

};

export default Controller