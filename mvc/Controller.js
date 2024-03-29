class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
      this.timeout = null
      this.init();
    }

    async init () {
        await this.model.init()
        // await this.view = view;
        clearTimeout(this.searchTimeout); 

        this.model.bindIndexChanged(this.onSectionDisplayChange)
        this.view.bindAdjIndexNumber(this.handleAdjIndex)


        // Display initial
        // this.onSectionDisplayChange(this.model.sections)
    };

    onSectionDisplayChange = (sections) => {
        this.view.renderNewSection(sections)
    };

    handleIncIndex = () => {
        this.model.incIndex()
    };

    handleDecIndex = () => {
        this.model.decIndex()
    };

    handleAdjIndex = (index) => {
        // In normal circumstances, you would do something like
        // this.model.MODELFUNCTION(param) to actually adjust things in the model, like adding new jobs or things like that
        // This is a static page with no new information being added or removed, so there is no need for that

        // So nothing actually needs to be done here?
        // this.model.adjIndex(index)
        // console.log(index)
        // console.log(this.model.index)
    };

  }
export default Controller