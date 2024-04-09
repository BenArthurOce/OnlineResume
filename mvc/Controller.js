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

        this.model.bindIndexChanged(this.onIndexChanged.bind(this));
        this.view.bindIndexChange(this.handleIndexChange.bind(this));


        this.model.bindArticleFiltered(this.onArticleFiltered.bind(this));
        this.view.bindArticleFilter(this.handleArticleFilter.bind(this));
        // this.view.bindButtonPress(this.handleButtonPress.bind(this));

        this.model.bindTileFiltered(this.onTileFiltered.bind(this));
        this.view.bindTileFilter(this.handleTileFilter.bind(this));
        // Pass controller's handler to view's method
        // this.view.bindTestButtonPress(this.handleButtonPress2.bind(this));


        // this.view.testBindButtonPress(this.handleButtonPress2.bind(this)); // Use testBindButtonPress here



        this.handleIndexChange(0);
        this.onIndexChanged(this.model.data);

        // you now have the ability to set subobjects to true/false

        // You need to remove the Set() objects
        // throw new Error ("stop code here")

    };

    onTileFiltered(modelData) {
        console.log("CONTROLLER: onTileFiltered")
        // console.log(modelData)
        this.view.commenceRender(modelData);
    };

    handleTileFilter(subObject) {
        console.log("CONTROLLER: handleTileFilter")
        // console.log(subObject)

        // subObject.isActive = true

        // console.log(this)

        // console.log(this.model.data.active)

        this.model.filterStateTiles(subObject)
    };

    // bindActiveSubObjectChanged

    onArticleFiltered(modelData) {
        console.log("CONTROLLER: onArticleFiltered")
        // console.log(modelData)
        this.view.commenceRender(modelData);
    };

    handleArticleFilter(subObject) {
        console.log("CONTROLLER: handleArticleFilter")
        // console.log(subObject)

        // subObject.isActive = true

        // console.log(this)

        // console.log(this.model.data.active)

        this.model.filterStateArticles(subObject)
    };

    onIndexChanged(modelData) {
        console.log("CONTROLLER: onIndexChanged")
        this.view.commenceRender(modelData);
    };




    handleIndexChange(index) {
        console.log("CONTROLLER: handleIndexChange");
        const currentInx = this.model.data.index;
        const numSections = this.model.data.count;

        if (index === "-1") {
            let a = currentInx;
            let b = (a - 1 + numSections) % numSections;
            this.indexView = b;
            console.log("VIEW: decrementActiveNumber");
        } else if (index === "+1") {
            let a = currentInx;
            let b = (a + 1 + numSections) % numSections;
            this.indexView = b;
            console.log("VIEW: incrementActiveNumber");
        }
        else {
            this.indexView = index;
        }

        this.model.changeIndex(this.indexView);
    };
};
export default Controller