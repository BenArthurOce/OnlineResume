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
        this.init();
    };

    returnActiveHeading(data) {
        return data["active"]["heading"];
    };

    returnActiveFilterBar(data) {
        return data["active"]["filterBar"];
    };

    returnActiveFilterButton(data) {
        return data["active"]["filterButtons"];
    };

    returnActiveSection(data) {
        return data["active"]["section"];
    };

    returnActiveSubObjects(data) {
        return data["active"]["subObjects"];
    };

    returnActiveFilterTags(data) {
        return Array.from(data["active"]["filterTags"]);
    };




    async init() {
        //console.log("VIEW: init" + "\n" + "----------")
        this.app = document.querySelector('#wrapper');
        this.updateColorScheme("forest");
        this._initLocalListeners();

    };


    //******
    //****** Function that is called to start Rendering the View ******
    //******
    commenceRender(data) {
        //console.log("VIEW: commenceRender")
        //console.log("---------\n------------")


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
        const navigationBar = this.createNavigation(keysUp)
        navigationBar.links[index].toggleOn()

        navigationBar.links.forEach((link, i) => {
            link.element.addEventListener("click", (event) => {
                this.handleIndexChange(link.index)
            });
        });

        //  (3 of 5)
        //  Title
        //
        const heading = this.createHeading(data);

        //  (4 of 5)
        //  Filter
        //
        this.filter = this.createFilter( data);
        // this.attachFilterEvents();

        // console.log(this.filter.buttons)

        this.filter.buttons.forEach((button, i) => {      
            button.element.addEventListener("click", (event) => {

                this.handleFilterClick(button)
            });
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
        this.app.append(palette.element, navigationBar.element, heading.element, this.filter.element, this.section.element);
    };


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
    createNavigation(keys) {
        const navbar = new NavBarView();
        keys.forEach((key, i) => {
            navbar.appendLink(new NavLinkView(i, key));
        });
        return navbar;
    };


//****** Creates the Filter Bar, and the Filter buttons ******
    createFilter(data) {
        // console.log(`VIEW: createFilter`);
        let filter = null; // Set the element to null for the switch function
        const key = this.returnActiveHeading(data)
        const activeBar = this.returnActiveFilterBar(data)

        switch (key) {
            case "Introduction":
                console.log("-----------------INTRODUCTION-----------------")
                filter = new IntroductionFilterBarView(0);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title))
                });
                break;

            case "Skills":
                console.log("-----------------SKILLS-----------------")
                filter = new SkillsFilterBarView(1);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title))
                });
                break;

            case "Education":
                console.log("-----------------EDUCATION-----------------")
                filter = new EducationFilterBarView(2);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(button.index, button.title))
                });
                break;

            case "Experience":
                console.log("-----------------EXPERIENCE-----------------")
                filter = new ExperienceFilterBarView(3);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(button.index, button.title))
                });
                break;
                
            case "Portfolio":
                console.log("-----------------PORTFOLIO-----------------")
                filter = new PortfolioFilterBarView(4);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(button.index, button.title))
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
    createSection(data) {
        console.log(`VIEW: createSection`);
        let section = null; // Set the element to null for the switch function


        const key = this.returnActiveHeading(data);

        const activeSection = this.returnActiveSection(data);
        const activeSubObjects = this.returnActiveSubObjects(data);
        // throw new Error ("stop the code here")

        switch (key) {
            case "Introduction":
                console.log("-----------------INTRODUCTION-----------------")
                section = new IntroductionSectionView(data);
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new IntroductionArticleView(article.index, article.title, article.data))
                });
                break;

            case "Skills":
                console.log("-----------------SKILLS-----------------")
                section = new SkillSectionView(data);
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new SkillArticleView(article.index, article.title, article.data))
                });
                break;

            case "Education":
                console.log("-----------------EDUCATION-----------------")
                section = new EducationSectionView(data);

                const obj3_0 = data["sectionSubObjs"]["education"][0]
                const obj3_1 = data["sectionSubObjs"]["education"][1]

                section.appendSubObject(new EducationArticleView(0, obj3_0.title, obj3_0.data));
                section.appendSubObject(new EducationArticleView(1, obj3_1.title, obj3_1.data));
                break;
                
            case "Experience":
                console.log("-----------------EXPERIENCE-----------------")
                section = new ExperienceSectionView(data);
                activeSubObjects.forEach((tile, i) => {
                    section.appendSubObject(new ExperienceTileView(tile.index, null, tile.data))
                });
                break;

            case "Portfolio":
                console.log("-----------------PORTFOLIO-----------------")
                section = new PortfolioSectionView(data);
                activeSubObjects.forEach((tile, i) => {
                    section.appendSubObject(new PortfolioTileView(tile.index, null, tile.data))
                });
                break;
            default:
                console.error("Unknown section key: " + key);
        };
        section.toggleOn()
        return section
    };


//****** Refer to the local events that change the index number. Refer to the Controller and the Model ******
    bindIndexChange(handler) {
        //console.log("VIEW: bindIndexChange")
        this.handleIndexChange = handler;
    };


//****** Changes the index number of the page based on if the left or right arrow is pressed. ******
    _initLocalListeners() {
        //console.log("VIEW: _initLocalListeners")
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