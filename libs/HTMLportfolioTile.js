class HTMLportfolioTile {
    #currentImageIndex;
    #parentElement;
    #templatePortElement;
    constructor() {
        this.#currentImageIndex = 0;
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templatePortElement = `
        <article>
            <div class="tile" onclick="showInfo()">
                <h3 class="projectname"></h3>
                <p class="projectdesc"></p>
                <div class="icon-container">
                </div>
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
        const newElement = document.createElement('div');
        newElement.innerHTML = this.templatePortElement;

        newElement.querySelector('.projectname').textContent = projectname;
        // newElement.querySelector('.projectlang').textContent = projectlang;
        newElement.querySelector('.projectdesc').textContent = projectdesc;
        // newElement.querySelector('.projecturl').textContent = projecturl;

        this.parentElement.appendChild(newElement);
    };


    // render() {
    //     const tile = document.createElement('div');
    //     tile.classList.add('tile');
    //     tile.onclick = () => this.showInfo();

    //     const titleElement = document.createElement('h2');
    //     titleElement.textContent = this.title;

    //     const descriptionElement = document.createElement('p');
    //     descriptionElement.textContent = this.description;

    //     const iconContainer = document.createElement('div');
    //     iconContainer.classList.add('icon-container');

    //     // this.languages.forEach(language => {
    //     //     const icon = document.createElement('img');
    //     //     icon.src = `${language}-icon.png`;
    //     //     icon.alt = language;
    //     //     iconContainer.appendChild(icon);
    //     // });

    //     tile.appendChild(titleElement);
    //     tile.appendChild(descriptionElement);
    //     tile.appendChild(iconContainer);

    //     document.getElementById('app').appendChild(tile);
    // }

    // showInfo() {
    //     // Your existing showInfo logic goes here
    //     document.getElementById('projectTitle').innerText = this.title;
    //     document.getElementById('projectDescription').innerText = this.description;

    //     const languageIconsContainer = document.getElementById('languageIcons');
    //     languageIconsContainer.innerHTML = '';

    //     this.languages.forEach(language => {
    //         const icon = document.createElement('img');
    //         icon.src = `${language}-icon.png`; // Update with actual paths to your language icons
    //         icon.alt = language;
    //         languageIconsContainer.appendChild(icon);
    //     });

    //     document.getElementById('infoOverlay').style.display = 'flex';
    // }
}

// // Example usage
// const project1 = new ProjectTile('Project 1', 'Description for Project 1', ['html', 'css']);
// const project2 = new ProjectTile('Project 2', 'Description for Project 2', ['javascript', 'html', 'css']);
// // Add more projects as needed

// function hideInfo() {
//     document.getElementById('infoOverlay').style.display = 'none';
// }


export default HTMLportfolioTile;