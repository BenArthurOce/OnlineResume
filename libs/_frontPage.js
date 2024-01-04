import ResumeData from "./factoryResumeData.js";
import HTMLskill from "./HTMLskill.js";
import HTMLeducation from "./HTMLeducation.js";
import HTMLportfolioTile from "./HTMLportfolioTile.js";
import HTMLexpTile from "./HTMLexpTile.js";

import HTMLSectionSlideshow  from './HTMLsectionSideshow.js';


const wrapperElement = document.getElementById('wrapper')
const slideshowNEW = new HTMLSectionSlideshow(wrapperElement);
slideshowNEW.constructNavBarElement();



const classResumeData = new ResumeData;
const classSkill = new HTMLskill;
const classEdu = new HTMLeducation;
const classExpTile = new HTMLexpTile(document.querySelector("#myExperience"));
const classPortTile = new HTMLportfolioTile(document.querySelector("#myPortfolio"));



// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducation, myExperience, myPortfolio} = resumeData

    // classSkill.renderToPage()

    // for (const {degree, institution} of myEducation) {
    //     classEdu.renderToPage(degree, institution);
    // };


    for (const {company, address, position, period, tags, softwares, duties} of myExperience) {
        classExpTile.renderToPage(company, address, position, period, tags, softwares, duties);
    };


    for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        classPortTile.renderToPage(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
    };


    //
    // Experience Tile Filters
    //
    const allfilter = document.querySelectorAll("#myExperience .filter li")

    // Filters on the Exp tiles
    allfilter[0].addEventListener('click', function () {
        classExpTile.filterTiles("tile")
    });

    allfilter[1].addEventListener('click', function () {
        classExpTile.filterTiles(allfilter[1].dataset.filter)
    });

    allfilter[2].addEventListener('click', function () {
        classExpTile.filterTiles(allfilter[2].dataset.filter)
    });

    allfilter[3].addEventListener('click', function () {
        classExpTile.filterTiles(allfilter[3].dataset.filter)
    });


    //
    // Portfolio Tile Filters
    //
    const allfilterPortfolio = document.querySelectorAll("#myPortfolio .filter li")
    allfilterPortfolio[0].addEventListener('click', function () {
        classPortTile.filterTiles("tile")
    });

    allfilterPortfolio[1].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[1].dataset.filter)
    });

    allfilterPortfolio[2].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[2].dataset.filter)
    });

    allfilterPortfolio[3].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[3].dataset.filter)
    });

    allfilterPortfolio[4].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[4].dataset.filter)
    });

    allfilterPortfolio[5].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[5].dataset.filter)
    });

    allfilterPortfolio[6].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[6].dataset.filter)
    });

    allfilterPortfolio[7].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[7].dataset.filter)
    });

    allfilterPortfolio[8].addEventListener('click', function () {
        classPortTile.filterTiles(allfilterPortfolio[8].dataset.filter)
    });
});




// createElement() {
//     const overlayElement = document.createElement('div');
//     overlayElement.innerHTML = this.templateOverlayElement;

//     overlayElement.querySelector('#projectTitleOlay').textContent = this.projectName;
//     overlayElement.querySelector('#projectSummaryOlay').textContent = this.projectSumLarge;
                                                
//     this.projectLangs.forEach(lang => {
//         const logoPath = `imgLogos/${lang}.svg`;

//         // Create a new image element for each language
//         const langLogo = document.createElement('img');
//         langLogo.src = logoPath;
//         langLogo.alt = lang; // You can set alt text as the language name
//         langLogo.classList.add('lang-logo');

//         overlayElement.querySelector('#projectLangsOlay').appendChild(langLogo);
//     });

//     // Prepare slideshow
//     const imageContainer = overlayElement.querySelector('#slideshowContainer');

//     const showImage = (index) => {
//         const images = imageContainer.querySelectorAll('img');
//         images.forEach((img, i) => {
//             img.style.display = i === index ? 'block' : 'none';
//         });
//     };

//     const nextImage = () => {
//         this.currentImageIndex = (this.currentImageIndex + 1) % this.projectImages.length;
//         showImage(this.currentImageIndex);
//     };

//     const prevImage = () => {
//         this.currentImageIndex = (this.currentImageIndex - 1 + this.projectImages.length) % this.projectImages.length;
//         showImage(this.currentImageIndex);
//     };

//     overlayElement.querySelector('.prev').addEventListener('click', prevImage);
//     overlayElement.querySelector('.next').addEventListener('click', nextImage);

//     this.projectImages.forEach((image, index) => {
//         const img = document.createElement('img');
//         img.src = image;
//         img.style.display = index === 0 ? 'block' : 'none';
//         imageContainer.appendChild(img);
//     });

//     overlayElement.querySelector('#closeBtn').onclick = () => {
//         this.removeFromPage();
//     };

//     document.body.appendChild(overlayElement);
// };

// renderToPage() {
//     document.body.querySelector('#infoOverlay').classList.add('active');
// };

// removeFromPage() {
//     const overlayElement = document.body.querySelector('#infoOverlay');
//     if (overlayElement) {
//         const parentElement = overlayElement.parentNode;
//         if (parentElement) {
//             parentElement.parentNode.removeChild(parentElement);
//         }
//     }                                                                       
// }





// // fetch json resume data
// classResumeData.getJSONdata()
// .then(resumeData => {

//     // Get the headers of the JSON file, and then render each section to the page
//     const {aboutMe, myCompetencies, myEducation, myExperience, myPortfolio} = resumeData

//     for (const {competencySoftware, competencyScore} of myCompetencies) {
//         classComp.renderToPage(competencySoftware, competencyScore);
//     };

//     classSkill.renderToPage()

//     for (const {degree, institution} of myEducation) {
//         classEdu.renderToPage(degree, institution);
//     };


//     for (const {company, address, position, period, softwares, duties} of myExperience) {
//         classExpTile.renderToPage(company, address, position, period, softwares, duties);
//     };


//     for (const {projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
//         classPortTile.renderToPage(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages);
//     };


// });


// let visibleSectionIndex = -1;

// function handleScrollPosition() {

//     function getPosition(element) {
//         let xPosition = 0;
//         let yPosition = 0;
    
//         while (element) {
//             xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
//             yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
//             element = element.offsetParent;
//         };
    
//         return { x: xPosition, y: yPosition };
//     };


//     const sectionTitles = document.querySelectorAll('section h2');
//     const navTextElements = document.querySelectorAll('.navlink-container span');
//     const navIconElements = document.querySelectorAll('.navlink-container i');

//     // Find which h2 header has been passed
//     sectionTitles.forEach((sectionTitle, index) => {
//         const position = getPosition(sectionTitle);
//         const distance = position.y - window.scrollY;

//         if (distance >= 0 && distance < sectionTitle.clientHeight) {
//             visibleSectionIndex = index;
//         }
//     });

//     // Depending on which h2 element is passed, highlight the relevant navlink
//     navTextElements.forEach((navElement, index) => {
//         navElement.classList.toggle('active', index === visibleSectionIndex);
//     });

//     navIconElements.forEach((navElement, index) => {
//         navElement.classList.toggle('active', index === visibleSectionIndex);
//     });
// }

// document.addEventListener('scroll', handleScrollPosition);

