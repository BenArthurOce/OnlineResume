class HTMLportfolio {
    #parentElement;
    #templatePortElement;
    constructor() {
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templatePortElement = `
        <article>
        <div class="portfolio-caption-container">
          <span class="projectlang"></span>
            <h3 class="projectname"></h3>
            <h4 class="projecturl"><a href="">Github Link</a></h4>
            <p class="projectdesc"></p>
        </div>
        <div class="portfolio-image-container">
            <div class="image-slideshow-container">
              <a class="prev"></a>
              <a class="next"></a>
            </div>
        </div>
        <div class="mobile-allicon-container">
          <i class="mob-icon fa-image" onclick="openSlideshow(0)"></i>
          <i class="mob-icon fa-github"></i>
        </div>
      </article>
      `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templatePortElement() {
        return this.#templatePortElement;
    };

    renderToPage(projectname, projectlang, projectdesc, projecturl, projectimages) {
        const newPortElement = document.createElement('div');
        newPortElement.innerHTML = this.templatePortElement;

        newPortElement.querySelector('.projectname').textContent = projectname;
        newPortElement.querySelector('.projectlang').textContent = projectlang;
        newPortElement.querySelector('.projectdesc').textContent = projectdesc;
        newPortElement.querySelector('.projecturl').textContent = projecturl;
        // newPortElement.querySelector('.projectimages').textContent = projectimages;

        this.parentElement.appendChild(newPortElement);
    };

};

export default HTMLportfolio