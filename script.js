"use strict";
import Model from "./mvc/Model.js";
import View from "./mvc/View.js";
import Controller from "./mvc/Controller.js";


// import FrontPage from "./libs/FrontPage.js";
// const myNewPage = new FrontPage();





const app = new Controller(new Model(), new View())