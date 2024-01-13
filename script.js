"use strict"

import ResumeData from "./libs/factoryResumeData.js";
import {FrontPageNEW, FrontPageWithResumeData} from "./libs/FrontPage.js";


const classResumeData = new ResumeData;
const frontpage = new FrontPageNEW();

// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducations, myExperiences, myPortfolio} = resumeData

    // Code to Add Education
    // Code to Add Skills


    for (const {company, address, position, period, tags, softwares, duties} of myExperiences) {
        frontpage.addExperienceTile(company, address, position, period, tags, softwares, duties)
    };

    for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        frontpage.addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages)
    };
    
    frontpage.initSlideshowElements()
    frontpage.addEventListeners()

});

