class HTMLportfolio {
    #templatePortElement;
    constructor() {
        this.#templatePortElement = `
        <article>
        <div class="portfolio-caption-container">
          <span class="project-lang"></span>
            <h3 class="project-name"></h3>
            <h4 class="project-url"><a href="">Github Link</a></h4>
            <p class="project-desc"></p>
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
    get templatePortElement() {
        return this.#templatePortElement;
    };

    renderToPage(parentElement) {
        const newPortElement = document.createElement('div');
        newPortElement.innerHTML = this.templatePortElement;
        parentElement.appendChild(newPortElement);
    }
};

export default HTMLportfolio