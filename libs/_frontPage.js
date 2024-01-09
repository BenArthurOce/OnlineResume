"use strict"

import ResumeData from "./factoryResumeData.js";
import HTMLskillTile from "./HTMLskillTile.js";
import HTMLeducation from "./HTMLeducation.js";
import HTMLportfolioTile from "./HTMLportfolioTile.js";
import HTMLexpTile from "./HTMLexpTile.js";


import HTMLSectionSlideshow  from './HTMLsectionSideshow.js';


const wrapperElement = document.getElementById('wrapper')
const slideshowNEW = new HTMLSectionSlideshow(wrapperElement);



const classResumeData = new ResumeData;

// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducations, myExperiences, myPortfolio} = resumeData

    for (const {degree, institution} of myEducations) {
        const eduTile = new HTMLeducation(degree, institution)
        eduTile.renderToPage();
    };

    // Code to Add Education
    // Code to Add Skills


    for (const {company, address, position, period, tags, softwares, duties} of myExperiences) {
        const expTile = new HTMLexpTile(company, address, position, period, tags, softwares, duties)
        expTile.renderToPage()
    };

    for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        const portTile = new HTMLportfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages);
        portTile.renderToPage()
    };
});