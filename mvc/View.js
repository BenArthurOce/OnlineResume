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

import StaticGetIcon from '../views/StaticGetIcon.js';


class View {
    constructor() {
        this.searchTimeout = null;
    };

    returnActiveHeading(data) {
        return data["heading"];
    };

    returnActiveFilterBar(data) {
        return data["filterBar"];
    };

    returnActiveFilterButton(data) {
        return data["filterButtons"];
    };

    returnActiveSection(data) {
        return data["state"]["section"];
    };

    returnActiveSubObjects(data) {
        return data["subObjects"];
    };

    returnActiveFilterTags(data) {
        return Array.from(data["filterTags"]);
    };

    returnActiveOverlay(data) {
        return data["activeOverlay"]
    }


    async init() {
        console.log("VIEW: init" + "\n" + "----------")
        this.app = document.querySelector('#wrapper');
        this._initLocalListeners();
    };


//****************************
//*** Main Render Function ***
//****************************

    async commenceRender(data) {
        console.log("VIEW: commenceRender" + "\n" + "--------------------")

        //  (0 of 5)
        //  Clear entire HTML
        //        
        this.app.innerHTML = null;

        //  (1 of 5)
        //  Palette
        //
        this.palette = await this.createPalette(data.palette);

        //  (2 of 5)
        //  Navigation
        //
        this.navigationBar = await this.createNavigation(data.navigationBar)

        //  (3 of 5)
        //  Title
        //
        const heading = await this.createHeading(data);

        //  (4 of 5)
        //  Filter
        //
        // console.log(data)
        this.filter = await this.createFilter(data);

        //  (5 of 5)
        //  Sections
        //
        this.section = await this.createSection(data);

        //
        //  Render
        //
        this.app.append(this.palette.element, this.navigationBar.element, heading.element, this.filter.element, this.section.element);
        this.updateColorScheme(this.palette.currentCSSName);

        //
        //  Bind Palette
        //
        this.palette.element.addEventListener("change", () => {
            this.palette.callback()
        });

        //
        //  Bind Navigation bar
        //
        this.navigationBar.links.forEach((link, i) => {
            link.element.addEventListener("click", () => {
                link.callback()
            });
        });

        //
        //  Bind Filter bar
        //
        this.filter.buttons.forEach((button, i) => {
            button.element.addEventListener("click", () => {
                button.callback()
            });
        });

        //
        //  Bind Tile Clicks
        //
        if (this.section.classType === "Experience" || this.section.classType === "Portfolio") {
            this.section.subObjects.forEach((subObject, i) => {

                subObject.element.addEventListener("click", (event) => {

                    if (this.section.classType === "Experience") {
                        subObject.callback()
                    };

                    if (this.section.classType === "Portfolio") {
                        subObject.callback()
                    };
                });
            });
        }

        //
        //  Complete
        //
        console.log("--------------rendering finished--------------")

        //
        //  For testing - Active Overlays
        //

        const overlay = this.returnActiveOverlay(data)
        // console.log(this.returnActiveOverlay(data))

        if (overlay) {
            let index; let data; let isActive; let newOverlay;
            if (this.section.classType === "Experience") {

                newOverlay = new ExperienceOverlayView(
                    index = overlay.index
                  , data = overlay.data
                  , isActive = true
                );
            };

            if (this.section.classType === "Portfolio") {

                newOverlay = new PortfolioOverlayView(
                  index = overlay.index
                , data = overlay.data
                , isActive = true
                );
            };
          this.app.append(newOverlay.element)
        }


        // const newIcon1 = StaticGetIcon.generateElement("Internet")
        // const newIcon2= StaticGetIcon.generateElement("Calendar")
        // const newIcon3 = StaticGetIcon.generateElement("Location")
        // const newIcon4 = StaticGetIcon.generateElement("Building")
        // const newIcon5 = StaticGetIcon.generateElement("Exclamation")
        // const newIcon6 = StaticGetIcon.generateElement("Profile")
        // const newIcon7 = StaticGetIcon.generateElement("All")
        // // console.log(newIcon)

        const newIcon0 = StaticGetIcon.generateDisplayIconElement("JavaScript")

        

        // const newIcon1  = StaticGetIcon.generateLinkIconElement("All", "https://www.google.com/")
        // const newIcon2  = StaticGetIcon.generateLinkIconElement("Github", "https://www.google.com/")
        // const newIcon3  = StaticGetIcon.generateLinkIconElement("All", "https://www.google.com/")
        // const newIcon4  = StaticGetIcon.generateLinkIconElement("Exclamation", "https://www.google.com/")
        // const newIcon5  = StaticGetIcon.generateLinkIconElement("All", "https://www.google.com/")
        // const newIcon6  = StaticGetIcon.generateLinkIconElement("Location", "https://www.google.com/")
        // const newIcon7  = StaticGetIcon.generateLinkIconElement("All", "https://www.google.com/")

        // const newIcon8 = StaticGetIcon.generateButtonElement("Exclamation")
        // const newIcon9 = StaticGetIcon.generateButtonElement("Shallamah Goolamah")
        // this.app.append(newIcon0) 
        // this.app.append(newIcon1) 
        // this.app.append(newIcon2)
        // this.app.append(newIcon3)
        // this.app.append(newIcon4)
        // this.app.append(newIcon5)
        // this.app.append(newIcon6)
        // this.app.append(newIcon7)
        // this.app.append(newIcon8)
        // this.app.append(newIcon9)

    };





//****************************
//******** Callbacks *********
//****************************

//****** View() event that is the PaletteView() callback function. Triggers when the dropdown box changes value ******
    onPaletteChangeClick(buttonClicked) {
        console.log("VIEW: onPaletteChangeClick");
        const optionClicked = event.target.value
        this.handlePaletteChange(optionClicked);
    }

//****** View() event that is the FilterButtonView() callback function. Triggers when the object element is clicked ******
    onFilterButtonClick(buttonClicked) {
        // console.log("VIEW: onFilterButtonClick");
        if (buttonClicked.classType === "Article") {
            this.handleArticleFilter(buttonClicked)
        } else if (buttonClicked.classType === "Tile") {
            this.handleTileFilter(buttonClicked)
        }
        else {
            throw new Error ("click handler failed for filter button")
        }
    };

//****** View() event that is the NavLinkView() callback function. Triggers when the object element is clicked ******
    onNavigationButtonClick(buttonClicked) {
        // console.log("VIEW: onNavigationButtonClick");
        this.handleIndexChange(buttonClicked.index)
    };


//****** View() event that is the TileView() callback function. Triggers when the object element is clicked ******
    onExperienceTileClick(tileClicked) {
        console.log("VIEW: onExperienceTileClick");
        // let index; let data; let isActive;

        // const newOverlay = new ExperienceOverlayView(
        //       index = tileClicked.index
        //     , data = tileClicked.data
        //     , isActive = true
        // );
        // this.app.append(newOverlay.element)
        this.handleOverlayStart(tileClicked.index)
    };

//****** View() event that is the TileView() callback function. Triggers when the object element is clicked ******
    onPortfolioTileClick(tileClicked) {
        console.log("VIEW: onPortfolioTileClick");
        // let index; let data; let isActive;

        // const newOverlay = new PortfolioOverlayView(
        //       index = tileClicked.index
        //     , data = tileClicked.data
        //     , isActive = true
        // );
        // this.app.append(newOverlay.element)
        this.handleOverlayStart(tileClicked.index)
    };


//****************************
//****** Binding Events ******
//****************************

    bindOnLoad(handler) {
        console.log("VIEW: bindOnLoad");
        this.handleOnLoad = handler;
    };

    bindPaletteChange(handler) {
        // console.log("VIEW: bindPaletteChange");
        this.handlePaletteChange = handler;
    };

    bindTileFilter(handler) {
        // console.log("VIEW: bindTileFilter");
        this.handleTileFilter = handler;       
    };

    bindArticleFilter(handler) {
        // console.log("VIEW: bindArticleFilter");
        this.handleArticleFilter = handler;       
    };

    bindIndexChange(handler) {
        // console.log("VIEW: bindIndexChange");
        this.handleIndexChange = handler;
    };

    updateColorScheme(newColour) {
        // console.log("VIEW: updateColorScheme");
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };

    bindOverlayStart(handler) {
        console.log("VIEW: bindOverlayStart");
        this.handleOverlayStart = handler;
    };


//****************************
//****** Create Elements *****
//****************************

//****** Creates a dropdown box which allows the user to change the colour style of the page ******
    async createPalette(paletteObj) {
        console.log("VIEW: createPalette");
        let palette
        let index; let styles; let callback;

        palette = new PaletteView (
            index = paletteObj.index
          , styles = paletteObj.styles
          , callback = this.onPaletteChangeClick.bind(this, paletteObj)
        );

        return palette
    };


//****** Creates an object to display the name of the current Section that the user is on ******
    async createHeading(data) {
        console.log("VIEW: createHeading");
        const heading = this.returnActiveHeading(data)
        return new HeadingView(heading)
    };


//****** Creates the Navigation bar and the navigation links inside it ******
    async createNavigation(object) {
        console.log("VIEW: createNavigation");
        let displayHeading;
        let index; let title; let isActive; let callback;
        const navbar = new NavBarView(displayHeading = object.displayHeading);
        object.links .forEach((link, i) => {
            navbar.appendLink(new NavLinkView(
                                      index = link.index
                                    , title = link.title
                                    , isActive = link.isActive
                                    , callback = this.onNavigationButtonClick.bind(this, link)
                                ));
        });
        return navbar;
    };


//****** Creates the Filter Bar, and the Filter buttons ******
    async createFilter(data) {
        console.log("VIEW: createFilter");

        let filter = null; // Set the element to null for the switch function
        const key = this.returnActiveHeading(data)
        const activeBar = this.returnActiveFilterBar(data)
        let index; let title; let isActive; let callback;

        switch (key) {
            case "Introduction":
                //console.log("-----------------CREATE FILTER------------------")
                //console.log("-----------------INTRODUCTION-------------------")
                filter = new IntroductionFilterBarView(0);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(
                                          index=button.index
                                        , title = button.title
                                        , isActive = button.isActive
                                        , callback = this.onFilterButtonClick.bind(this, button)
                                    ));
                });
                break;

            case "Skills":
                //console.log("-----------------CREATE FILTER------------------")
                //console.log("--------------------SKILLS----------------------")
                filter = new SkillsFilterBarView(1);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(
                                          index = button.index
                                        , title = button.title
                                        , isActive = button.isActive
                                        , callback = this.onFilterButtonClick.bind(this, button)
                                    ));
                });
                break;

            case "Education":
                // console.log("-----------------CREATE FILTER------------------")
                // console.log("-------------------EDUCATION--------------------")
                filter = new EducationFilterBarView(2);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(
                                          index = button.index
                                        , title = button.title
                                        , isActive = button.isActive
                                        , callback = this.onFilterButtonClick.bind(this, button)
                                    ));
                });
                break;

            case "Experience":
                //console.log("-----------------CREATE FILTER------------------")
                //console.log("--------------------EXPERIENCE------------------")
                filter = new ExperienceFilterBarView(3);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(
                                          index=button.index
                                        , title=button.title
                                        , isActive=button.isActive
                                        , callback=this.onFilterButtonClick.bind(this, button)
                                    ));
                });
                break;
                
            case "Portfolio":
                //console.log("-----------------CREATE FILTER------------------")
                //console.log("--------------------PORTFOLIO-------------------")
                filter = new PortfolioFilterBarView(4);
                activeBar.buttons.forEach((button, i) => {
                    filter.appendSubObject(new TileFilterButtonView(
                                          index = button.index
                                        , title = button.title
                                        , isActive = button.isActive
                                        , callback = this.onFilterButtonClick.bind(this, button)
                                    ));
                });
                break;

            default:
                console.error("Unknown filter key: " + key);
        };

        filter.toggleOn()
        return filter
    };


//****** Creates the Section, which displays the main content of the page. Sections contain subObjects which are either Articles or Tiles ******
    async createSection(information) {
        console.log("VIEW: createSection");

        const key = this.returnActiveHeading(information)
        const activeSubObjects = this.returnActiveSubObjects(information);

        let section = null; // Set the element to null for the switch function
        let index; let title; let data; let isActive; let callback

        switch (key) {
            case "Introduction":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("-----------------INTRODUCTION-------------------")
                section = new IntroductionSectionView(information);
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new IntroductionArticleView(
                                          index = article.index
                                        , title = article.title
                                        , data = article.data
                                        , isActive = article.isActive
                                    ));
                });
                break;

            case "Skills":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("--------------------SKILLS----------------------")
                section = new SkillSectionView(information);
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new SkillArticleView(
                                          index = article.index
                                        , title = article.title
                                        , data = article.data
                                        , isActive = article.isActive
                                    ));
                });
                break;

            case "Education":
                // console.log("-----------------CREATE SECTION-----------------")
                // console.log("-------------------EDUCATION--------------------")
                section = new EducationSectionView(information);
                const articleNames = this.returnActiveFilterTags(information)
                activeSubObjects.forEach((article, i) => {
                    section.appendSubObject(new EducationArticleView(
                                          index=article.index
                                        , title = articleNames[i]
                                        , data = article.data
                                        , isActive = article.isActive
                                    ))
                });
                break;
                
            case "Experience":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("--------------------EXPERIENCE------------------")
                section = new ExperienceSectionView(information);
                activeSubObjects.forEach((tile, i) => {
                    section.appendSubObject(new ExperienceTileView(
                                          index = tile.index
                                        , title = "tile.title"
                                        , data = tile.data
                                        , isActive = tile.isActive
                                        , callback = this.onExperienceTileClick.bind(this, tile)
                                    ));
                });
                break;

            case "Portfolio":
                //console.log("-----------------CREATE SECTION-----------------")
                //console.log("--------------------PORTFOLIO-------------------")
                section = new PortfolioSectionView(information);
                activeSubObjects.forEach((tile, i) => {
                    section.appendSubObject(new PortfolioTileView(
                                          index = tile.index
                                        , title = "tile.title"
                                        , data = tile.data
                                        , isActive = tile.isActive
                                        , callback = this.onPortfolioTileClick.bind(this, tile)
                                    ));
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
        console.log("VIEW: _initLocalListeners")

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