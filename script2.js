import FrontPageController from './objects/FrontPageController.js';
import FrontPageModel from './objects/FrontPageModel.js';
import FrontPageView from './objects/FrontPageView.js';




const model = new FrontPageModel();
const view = new FrontPageView();
const controller = new FrontPageController(model, view);

controller.init();
