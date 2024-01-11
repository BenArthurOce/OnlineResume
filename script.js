"use strict"

import ResumeData from "./libs/factoryResumeData.js";

import FrontPage  from './libs/_frontPage.js';
// import HTMLportfolioTile from "./libs/HTMLportfolioTile.js";
// import HTMLexpTile from "./libs/HTMLexpTile.js";



// import NavBar from './libs/HTMLnavbar.js';



// const wrapperElement = document.getElementById('wrapper')

// const navbarElementNEW = new NavBar;
// const slideshowNEW = new HTMLSectionSlideshow(wrapperElement);



const classResumeData = new ResumeData;
const front = new FrontPage
// const navBar = new NavBar;
// const slideshow = new HTMLSectionSlideshow;

// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducations, myExperiences, myPortfolio} = resumeData

    // for (const {degree, institution} of myEducations) {
    //     const eduTile = new HTMLeducation(degree, institution)
    //     eduTile.renderToPage();
    // };

    // Code to Add Education
    // Code to Add Skills


    for (const {company, address, position, period, tags, softwares, duties} of myExperiences) {
        front.addExperienceTile(company, address, position, period, tags, softwares, duties)
    };

    for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        front.addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages)
    };
    
});