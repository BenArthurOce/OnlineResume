import NavBarView from '../views/NavbarView.js'
import NavLinkView from '../views/NavlinkView.js';
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'


import {IntroductionFilterBarView, EducationFilterBarView, SkillsFilterBarView, ExperienceFilterBarView, PortfolioFilterBarView} from '../views/FilterBarView.js'
import {ArticleFilterButtonView, TileFilterButtonView} from '../views/FilterButtonView.js';

import {IntroductionArticleView, SkillArticleView, EducationArticleView} from '../views/ArticleView.js';
import {ExperienceTileView, PortfolioTileView} from '../views/TileView.js';

import PaletteView from '../views/PaletteView.js';
import HeadingView from '../views/HeadingView.js';

import { ExperienceOverlayView,  PortfolioOverlayView } from '../views/OverlayView.js';


class View {
    constructor() {
        this.searchTimeout = null;
    };

    returnActiveHeading(data) {
        return data["state"]["heading"];
    };

    returnActiveFilterBar(data) {
        return data["state"]["filterBar"];
    };

    returnActiveFilterButton(data) {
        return data["state"]["filterButtons"];
    };

    returnActiveSection(data) {
        return data["state"]["section"];
    };

    returnActiveSubObjects(data) {
        return data["state"]["subObjects"];
    };

    returnActiveFilterTags(data) {
        return Array.from(data["state"]["filterTags"]);
    };




    async init() {
        console.log("VIEW: init" + "\n" + "----------")
        this.app = document.querySelector('#wrapper');
        this.updateColorScheme("forest");
        this._initLocalListeners();

    };


    //******
    //****** Function that is called to start Rendering the View ******
    //******
    commenceRender(data) {
        ////console.log("VIEW: commenceRender")
        ////console.log("---------\n------------")


        //
        //  Function to set string to Proper Case
        //
        function toProperCase(str) {
            return str.toLowerCase().replace(/\b\w/g, function(char) {
                return char.toUpperCase();
            });
        };

        this.app.innerHTML = null;
        const index = data[`index`];
        const keys = Object.keys(data.filterBars);
        const keysUp = keys.map(key => toProperCase(key))
        const key = keys[data.index]


        //  (1 of 5)
        //  Palette
        //
        const palette = this.createPalette();
        this.attachPaletteChangeEvent()

        //  (2 of 5)
        //  Navigation
        //
        this.navigationBar = this.createNavigation(data["state"].navigationBar)


        //  (3 of 5)
        //  Title
        //
        const heading = this.createHeading(data);

        //  (4 of 5)
        //  Filter
        //
        this.filter = this.createFilter( data);
        // this.filter.buttons.forEach(button => {
        //     button.bindFilterButton(this.handleButtonPress2.bind(this));
        // });
        // this.attachFilterEvents();

        // //console.log(this.filter.buttons)

        this.filter.buttons.forEach((button, i) => {      
            // button.element.addEventListener("click", (event) => {

            //     this.handleFilterClick(button)
            // });
        });

        //  (5 of 5)
        //  Sections
        //
        this.section = this.createSection(data);

        // Tile Event listeners for overlay
        if (this.section.classType === "Experience" || this.section.classType === "Portfolio") {
            this.section.subObjects.forEach((subObject, i) => {

                subObject.element.addEventListener("click", (event) => {

                    if (this.section.classType === "Experience") {
                        const newOverlay = new ExperienceOverlayView(0, subObject)
                        this.app.append(newOverlay.element)
                    };

                    if (this.section.classType === "Portfolio") {
                        const newOverlay = new PortfolioOverlayView(0, subObject)
                        this.app.append(newOverlay.element)
                    };
                });
            });
        }

        //
        //  Render
        //
        this.app.append(palette.element, this.navigationBar.element, heading.element, this.filter.element, this.section.element);




        // Bind
        this.filter.buttons.forEach((button, i) => {

            button.element.addEventListener("click", () => {
                // this.handleIndexChange(button.index)
                button.callback()
            });
            // element.bind()
            // console.log(element)

            // this.view.bindButtonPress(this.handleButtonPress.bind(this));

            // element.testBindButtonPress(this.handleButtonPress2.bind(this))

        });

        // To do
        // Have each of the filter button elements have a trigger
        // The trigger needs to go to the controller, and just the model
        // We're looking for certain subObjects to be "state" or "inactive"
        // and then the view will render the model, but also keeping these items in mind

        // console.log(data)
        // console.log(data.returnSingleNavLink(1))
        // throw new Error ("stop code here")
    };


    onFilterButtonClick(buttonClicked) {
        console.log("VIEW: onFilterButtonClick");
        if (buttonClicked.classType === "Article") {
            this.handleArticleFilter(buttonClicked)
        } else if (buttonClicked.classType === "Tile") {
            this.handleTileFilter(buttonClicked)
        }
        else {
            throw new Error ("click handler failed for filter button")
        }
    };


    bindTileFilter(handler) {
        console.log("VIEW: bindTileFilter");
        this.handleTileFilter = handler;       
    };

    bindArticleFilter(handler) {
        console.log("VIEW: bindArticleFilter");
        this.handleArticleFilter = handler;       
    };



//****** Refer to the local events that change the index number. Refer to the Controller and the Model ******
    bindIndexChange(handler) {
        console.log("VIEW: bindIndexChange");
        this.handleIndexChange = handler;
        // console.log(handler)
        // console.log(this.handleIndexChange)
    };




    // _initLocalListeners() {
    //     ////console.log("VIEW: _initLocalListeners")
    //     document.addEventListener('keydown', (event) => {
    //         if (event.key === 'ArrowLeft') {
    //             this.handleIndexChange("-1")
    //         } else if (event.key === 'ArrowRight') {
    //             this.handleIndexChange("+1")
    //         }
    //     });
    // };




//****** Creates a dropdown box which allows the user to change the colour style of the page ******
    createPalette() {
        return new PaletteView()
    };


    attachPaletteChangeEvent() {

        // OLD VERSION CODE
        // // ColourPalette
        // this.paletteEl.addEventListener('change', () => {
        //     const newColour = document.body.querySelector(`#paletteSelector`).value;
        //     this.updateColorScheme(newColour);
        // });
    };


    updateColorScheme(newColour) {
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };


//****** Creates an object to display the name of the current Section that the user is on ******
    createHeading(data) {
        const heading = this.returnActiveHeading(data)
        return new HeadingView(heading)
    };


//****** Creates the Navigation bar and the navigation links inside it ******
    createNavigation(object) {
        const navbar = new NavBarView();
        object.links .forEach((link, i) => {
            navbar.appendLink(new NavLinkView(i, link.word));
        });

        navbar.links.forEach((link, i) => {
            link.element.addEventListener("click", (event) => {
                this.handleIndexChange(link.index)
            });
        });

        return navbar;
    };



//****** Creates the Filter Bar, and the Filter buttons ******
    createFilter(data) {
        let filter = null; // Set the element to null for the switch function
        const key = this.returnActiveHeading(data)
        const activeBar = this.returnActiveFilterBar(data)

        //console.log(`func = ${"VIEW:   createFilter"} ||  key = ${key}`);


        switch (key) {
            case "Introduction":
                //console.log("-----------------CREATE FILTER-----------------")
                //console.log("-----------------INTRODUCTION-----------------")
                filter = new IntroductionFilterBarView(0);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title, this.onFilterButtonClick.bind(this, button)))
                });
                break;

            case "Skills":
                //console.log("-----------------CREATE FILTER-----------------")
                //console.log("-----------------SKILLS-----------------")
                filter = new SkillsFilterBarView(1);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title, this.onFilterButtonClick.bind(this, button)))
                });
                break;

            case "Education":
                //console.log("-----------------CREATE FILTER-----------------")
                //console.log("-----------------EDUCATION-----------------")
                filter = new EducationFilterBarView(2);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title, this.onFilterButtonClick.bind(this, button)))
                });
                break;

            case "Experience":
                //console.log("-----------------CREATE FILTER-----------------")
                //console.log("-----------------EXPERIENCE-----------------")
                filter = new ExperienceFilterBarView(3);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(button.index, button.title, this.onFilterButtonClick.bind(this, button)))
                });
                break;
                
            case "Portfolio":
                //console.log("-----------------CREATE FILTER-----------------")
                //console.log("-----------------PORTFOLIO-----------------")
                filter = new PortfolioFilterBarView(4);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(button.index, button.title, this.onFilterButtonClick.bind(this, button)))
                });
                break;

            default:
                console.error("Unknown filter key: " + key);
        };

        filter.toggleOn()
        return filter
    };


//****** Compares the "title" attribute of the clicked filter button, and makes section subObjects active/inactive depending on if their content matches the "title" attribute ******
    handleFilterClick(button) {

        // Set all section subObjects to be off when a filter button is pressed
        this.section.subObjects.map(subObject => subObject.toggleOff())

        // Turn all the filter buttons off
        this.filter.buttons.map(button => button.toggleOff())


        if (button.classType === "Article") {

            // If the button title attribute matches the subObject title attribute, turn the subObject on
            this.section.subObjects.forEach(subObject => subObject.title === button.title ? subObject.toggleOn() : null);

            // And turn the filter button on
            button.toggleOn()
            return;
        };

        if (button.classType === "Tile") {

            // Special Case if the "All" button was pressed
            if (button.title === "All") {
                this.section.subObjects.map(subObject => subObject.toggleOn())
            }
            // If A tile has a tag that matches the title attribute of the button pressed, turn that subObject on
            else {
                this.section.subObjects.forEach(subObject => subObject.tags.includes(button.title) ? subObject.toggleOn() : null);
            }

            // And turn the filter button on
            button.toggleOn()
            return;
        };

        // Error if neither of the if statements ran
        throw new Error ("handleFilterClick failed to detect a filter input button")
        
    };


//****** Creates the Section, which displays the main content of the page. Sections contain subObjects which are either Articles or Tiles ******
    createSection(information) {

        let filter = null; // Set the element to null for the switch function
        const key = this.returnActiveHeading(information)
        const activeSection = this.returnActiveSection(information);
        const activeSubObjects = this.returnActiveSubObjects(information);
        //console.log(`func = ${"VIEW:   createSection"} ||  key = ${key}`);

        let section = null; // Set the element to null for the switch function

        let index; let title; let data; let isActive;

        // throw new Error ("stop the code here")

        switch (key) {
            case "Introduction":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("-----------------INTRODUCTION-----------------")
                section = new IntroductionSectionView(information);
                activeSubObjects.forEach((article, i) => {
                    // console.log(article)
                    section.appendSubObject(new IntroductionArticleView(index=article.index, title=article.title, data=article.data, isActive=article.isActive));
                });
                break;

            case "Skills":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("-----------------SKILLS-----------------")
                section = new SkillSectionView(information);
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new SkillArticleView(index=article.index, title=article.title, data=article.data, isActive=article.isActive));
                });
                break;

            case "Education":
                // console.log("-----------------CREATE SECTION-----------------")
                // console.log("-----------------EDUCATION-----------------")
                section = new EducationSectionView(information);

                const articleNames = this.returnActiveFilterTags(information)
                // console.log(articleNames)
                // console.log(activeSubObjects)

                // console.log(data)


                // section.appendSubObject(new EducationArticleView(0, articleNames[0], obj3_0.data));
                // section.appendSubObject(new EducationArticleView(1, articleNames[1], obj3_1.data));

                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new EducationArticleView(article.index, articleNames[i], article.data, article.isActive))
                });
                break;
                
            case "Experience":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("-----------------EXPERIENCE-----------------")
                section = new ExperienceSectionView(information);
                activeSubObjects.forEach((tile, i) => {
                    // console.log(tile)
                    // console.log(tile.isActive)
                    section.appendSubObject(new ExperienceTileView(index=tile.index, title="tile.title", data=tile.data, isActive=tile.isActive));
                });
                break;

            case "Portfolio":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("-----------------PORTFOLIO-----------------")
                section = new PortfolioSectionView(information);
                activeSubObjects.forEach((tile, i) => {
                    section.appendSubObject(new PortfolioTileView(index=tile.index, title="tile.title", data=tile.data, isActive=tile.isActive));
                });
                break;
            default:
                console.error("Unknown section key: " + key);
        };
        section.toggleOn()
        return section
    };





//****** Changes the index number of the page based on if the left or right arrow is pressed. ******
    _initLocalListeners() {
        ////console.log("VIEW: _initLocalListeners")
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.handleIndexChange("-1")
            } else if (event.key === 'ArrowRight') {
                this.handleIndexChange("+1")
            }
        });
    };



};

export default View;