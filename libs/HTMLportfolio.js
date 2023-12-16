class HTMLportfolio {
    #currentImageIndex;
    #parentElement;
    #templatePortElement;
    constructor() {
        this.#currentImageIndex = 0;
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
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value;
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

        const imageContainer = newPortElement.querySelector('.image-slideshow-container');

        //
        // Image slideshow, left and right arrows
        //
        const showImage = (index) => {
            const images = imageContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % projectimages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + projectimages.length) % projectimages.length;
            showImage(this.currentImageIndex);
        };

        // Attach event listeners to the arrows
        newPortElement.querySelector('.prev').addEventListener('click', prevImage);
        newPortElement.querySelector('.next').addEventListener('click', nextImage);

        // Add each image to the gallery element
        projectimages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });

        this.parentElement.appendChild(newPortElement);
    }

};

export default HTMLportfolio;