"use strict"

import ResumeData from "./libs/factoryResumeData.js";
import {FrontPageNEW, FrontPageWithResumeData} from "./libs/FrontPage.js";


const classResumeData = new ResumeData;
const frontpage = new FrontPageNEW();

// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myEducations, mySkills, myExperiences, myPortfolio} = resumeData

    // Code to Add Education
    // Code to Add Skills

    // const {degree, institution} = myEducations
    // frontpage.addEducations(degree, institution);

    const {email, phone, linkedin, github, background, introduction} = aboutMe
    frontpage.addIntro(email, phone, linkedin, github, background, introduction)

    for (const {degree, institution, tags} of myEducations) {
        frontpage.addEducations(degree, institution, tags);
    };

    const {skillsKey, skillsLangages, skillsTechincal, skillsSoft} = mySkills
    frontpage.addSkills(skillsKey, skillsLangages, skillsTechincal, skillsSoft);

    for (const {company, address, position, period, extraInfo, tags, softwares, duties} of myExperiences) {
        frontpage.addExperienceTile(company, address, position, period, extraInfo, tags, softwares, duties)
    };


    for (const {projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        frontpage.addPortfolioTile(projectName, projectLangs, projectTags, summarySmall, summaryLarge, projectUrl, projectImages)
    };
    
    frontpage.initSlideshowElements()
    frontpage.addEventListeners()

});



