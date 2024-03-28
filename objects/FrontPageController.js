import FrontPageModel from './FrontPageModel.js';
import FrontPageView from './FrontPageView.js';

class FrontPageController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init() {
        await this.model.init();
        this.view.renderNavBar(['About Me', 'Skills', 'Education', 'Experience', 'Portfolio']);
        // Other initialization tasks
    }

    // Implement other controller logic as needed
}

export default FrontPageController;
