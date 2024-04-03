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
        this.init()
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
        const heading = this.createHeading(toProperCase(key));

        //  (4 of 5)
        //  Filter
        //
        this.filter = this.createFilter(toProperCase(key), data);
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
        this.section = this.createSection(toProperCase(key), data);

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
    createHeading(heading) {
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
    createFilter(key, data) {
        let filter = null; // Set the element to null for the switch function

        const tileKey = ["All", "Programming", "Accounting", "CustomerService"]
        const portKey = ["All", "UserInterface", "Web", "Database", "Logic", "Games", "Efficiency", "DataSets", "Finance"]

        switch (key) {
            case "Introduction":
                filter = new IntroductionFilterBarView(data.filterTags['introduction']);
                filter.appendSubObject(new ArticleFilterButtonView(0, "About Me"))
                filter.appendSubObject(new ArticleFilterButtonView(1, "Key Skills"))
                break;
            case "Skills":
                filter = new SkillsFilterBarView(data.filterTags['skills']);
                Array.from(data.filterTags['skills']).forEach((element, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(i, element))
                });
                break;
            case "Education":
                filter = new EducationFilterBarView(data.filterTags['education']);
                Array.from(data.filterTags['education']).forEach((element, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(i, element))
                });
                break;
            case "Experience":
                filter = new ExperienceFilterBarView(data.filterTags['experience']);
                filter.appendSubObject(new TileFilterButtonView(0, "All"))
                Array.from(data.filterTags['experience']).forEach((element, i) => {
                    // filter.appendSubObject(new TileFilterButtonView(i, element, tileKey[i]))
                    filter.appendSubObject(new TileFilterButtonView(i, element))
                });
                break;
            case "Portfolio":
                filter = new PortfolioFilterBarView(data.filterTags['portfolio']);
                filter.appendSubObject(new TileFilterButtonView(0, "All"))
                Array.from(data.filterTags['portfolio']).forEach((element, i) => {
                    // filter.appendSubObject(new TileFilterButtonView(i, element, portKey[i]))
                    filter.appendSubObject(new TileFilterButtonView(i, element))
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

        if (button.classType === "Article") {

            // If the button title attribute matches the subObject title attribute, turn the subObject on
            this.section.subObjects.forEach(subObject => subObject.title === button.title ? subObject.toggleOn() : null);
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
            return;
        };

        // Error if neither of the if statements ran
        throw new Error ("handleFilterClick failed to detect a filter input button")
        
    };


//****** Creates the Section, which displays the main content of the page. Sections contain subObjects which are either Articles or Tiles ******
    createSection(key, data) {
        const keyyy = key.toLowerCase()
        let section = null; // Set the element to null for the switch function


        const sectionData = data
        // console.log(sectionData)


        let headings = data.filterBars[keyyy].headings
        let info = data.sections[keyyy]

        // console.log(info)

        switch (key) {
            case "Introduction":
                section = new IntroductionSectionView(data);
                section.appendSubObject(new IntroductionArticleView(0, "About Me", info["introduction"]));
                section.appendSubObject(new IntroductionArticleView(1, "Key Skills", info["skillsKey"]));
                break;
            case "Skills":
                section = new SkillSectionView(data);
                Array.from(headings).forEach((heading, i) => {
                    section.appendSubObject(new SkillArticleView(i, heading, Object.values(info)[i]))
                });
                break;
            case "Education":
                section = new EducationSectionView(data);
                Array.from(headings).forEach((heading, i) => {
                    section.appendSubObject(new EducationArticleView(i, heading, data))
                });
                // Need additional code to add the educations
                break;
            case "Experience":
                section = new ExperienceSectionView(data);
                info.forEach((experience, i) => {
                    section.appendSubObject(new ExperienceTileView(i, Object.values(info)[i]))
                });
                break;
            case "Portfolio":
                section = new PortfolioSectionView(data);
                info.forEach((portfolio, i) => {
                    section.appendSubObject(new PortfolioTileView(i, Object.values(info)[i]))
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