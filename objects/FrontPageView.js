import NavBarView from "../views/NavbarView";

class FrontPageView {
    constructor() {
        this.navBar = new NavBarView();
    }

    renderNavBar(links) {
        this.navBar.initNavBarLinks(links);
    }

    // Implement other view-related methods as needed
}

export default FrontPageView;
