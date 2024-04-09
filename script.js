"use strict";
import Model from "./mvc/Model.js";
import View from "./mvc/View.js";
import Controller from "./mvc/Controller.js";

const app = new Controller(new Model(), new View())
app.init();