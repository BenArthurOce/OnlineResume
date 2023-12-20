class HTMLportfolioTile {
    #currentImageIndex;
    #parentElement;
    #templatePortElement;
    #overlayElement;
    
    constructor() {
        this.#currentImageIndex = 0;
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templatePortElement = `
            <div class="tile"">
                <h2 class="projectname"></h2>
                <p class="projectdesc"></p>
                <div class="icon-container">
                </div>
            </div>
        `;
        this.#overlayElement = `
            <section id="infoOverlay">
                <div id="infoWrapper">

                    <article id="infoContent">
                        <h2 id="projectTitleOlay"></h2>
                        <p id="projectdescOlay"></p>
                        <div id="languageIcons" class="icon-container">
                        </div>
                    </article>

                    <article class="image-slideshow-container">
                            <a class="prev"></a>
                            <a class="next"></a>
                    </article>

                    <article class="mobile-allicon-container">
                        <i class="mob-icon fa-image" onclick="openSlideshow(0)"></i>
                        <i class="mob-icon fa-github"></i>
                    </article>

                </div>
                <span id="closeBtn">Close</span>
            </section>
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
    get overlayElement() {
        return this.#overlayElement;
    };

    renderToPage(projectname, projectdesc, projectlangs, projecturl, projectimages) {
        const newElement = document.createElement('div');
        newElement.innerHTML = this.#templatePortElement;

        newElement.querySelector('.projectname').textContent = projectname;
        newElement.querySelector('.projectdesc').textContent = projectdesc;

        newElement.querySelector('.tile').onclick = () => this.showInfo(projectname, projectdesc, projectlangs, projecturl, projectimages);

        this.#parentElement.appendChild(newElement);
    }

    showInfo(projectname, projectdesc, projectlangs, projecturl, projectimages) {
        const overlayElement = document.createElement('div');
        overlayElement.innerHTML = this.#overlayElement;

        overlayElement.querySelector('#projectTitleOlay').textContent = projectname;
        overlayElement.querySelector('#projectdescOlay').textContent = projectdesc;




        const imageContainer = overlayElement.querySelector('.image-slideshow-container');

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
        // Attach event listeners to the arrows
        overlayElement.querySelector('.prev').addEventListener('click', prevImage);
        overlayElement.querySelector('.next').addEventListener('click', nextImage);

        // Add each image to the gallery element
        projectimages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });

        // Handle language icons if needed
        // const languageIconsContainer = overlayElement.querySelector('#languageIcons');
        // languages.forEach(language => {
        //     const icon = document.createElement('img');
        //     icon.src = `${language}-icon.png`; // Update with actual paths to your language icons
        //     icon.alt = language;
        //     languageIconsContainer.appendChild(icon);
        // });

        //wrapper of the entire doc
        // const wrapper =  document.body.querySelector('.wrapper')
        // console.log(wrapper)

        overlayElement.querySelector('#closeBtn').onclick = () => {
            document.body.removeChild(overlayElement);
        };

        document.body.appendChild(overlayElement);
        overlayElement.querySelector('#infoOverlay').style.display = 'flex';
    }

    hideInfo() {
        const overlayElement = document.querySelector('#infoOverlay');
        if (overlayElement) {
            overlayElement.style.display = 'none';
        }
    }
}

export default HTMLportfolioTile;
