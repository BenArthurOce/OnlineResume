class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.timeout = null
        this.init();
    }

    async init() {
        console.log("CONTROLLER: init" + "\n" + "----------")
        await this.model.init()

        clearTimeout(this.searchTimeout);

        this.model.bindIndexChanged(this.onIndexChanged.bind(this));
        this.view.bindIndexChange(this.handleIndexChange.bind(this));

        this.onIndexChanged(this.model.data);
    };


    onIndexChanged(data) {
        console.log("CONTROLLER: onIndexChanged")
        this.view.commenceRender(data);
    };


    handleIndexChange(index) {
        console.log("CONTROLLER: handleIndexChange");
        const currentInx = this.model.data.index;
        const numSections = this.model.data.sections.length;

        if (index === -1) {
            let a = currentInx;
            let b = (a - 1 + numSections) % numSections;
            this.indexView = b;
            console.log("VIEW: decrementActiveNumber");
        } else if (index === 1) {
            let a = currentInx;
            let b = (a + 1 + numSections) % numSections;
            this.indexView = b;
            console.log("VIEW: incrementActiveNumber");
        }

        this.model.changeIndex(this.indexView);
    };
};
export default Controller