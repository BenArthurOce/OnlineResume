'use strict';

//This code successfully adds "competicies"
$(document).ready(function() {
  $.getJSON('resumeDataJSON.json', function(data) {

    // Number of competencies
    const numberOfCompetencies = data['my-competencies']['competency'].length;

    console.log("Number of competencies: " + numberOfCompetencies);

    const section = $("#competencies");   //Establish <section>
    const template = $("template");       //Establish <template>
    const templateContent = template.html();

    // Add copies of the template to the section
    for (let i = 0; i < numberOfCompetencies; i++) {
      section.append(templateContent);
    }
  });
});



$(document).ready(function () {
  // Optimize scroll event by using debounce to reduce the frequency of function calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  /******************************/
  /**** Scrolling Nav Bar ********/
  /******************************/
  function getVisibleSection() {
    let minDistance = Infinity;
    let visibleSectionIndex = -1;

    $('section h2').each(function (index) {
      const rect = $(this).get(0).getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (distance < minDistance) {
        minDistance = distance;
        visibleSectionIndex = index;
      }
    });

    return visibleSectionIndex;
  }

  function updateActiveNavigation() {
    const visibleSectionIndex = getVisibleSection();

    $('.navlink-container span').each(function (index) {
      $(this).closest('span').toggleClass('active', index === visibleSectionIndex);
    });
  }

  $(document).on('scroll', debounce(updateActiveNavigation, 200));


/******************************/
/******** JSON to HTML ********/
/******************************/
$.getJSON('resumeDataJSON.json', function (resumeData) {
    console.log('Fetching: resumeDataJSON.json');

    //
    // PERSONAL INFO
    //
    const personalInfo = resumeData['personal-info'];

    // PERSONAL INFO HTML ELEMENTS
    const personalInfoElements = {
      email: $('.email-icon'),
      linkedin: $('.linkedin-icon'),
      github: $('.github-icon'),
      background: $('.my-background'),
      introduction: $('.my-introduction'),
    };

    // Update HTML elements with personal info data
    personalInfoElements.background.text(personalInfo['my-background']);
    personalInfoElements.introduction.text(personalInfo['my-introduction']);

    // Add links to social media icons
    personalInfoElements.linkedin.click(function () {
      window.location.href = personalInfo['personal-linkedin'];
    });

    personalInfoElements.email.click(function () {
      window.location.href = personalInfo['personal-email'];
    });

    personalInfoElements.github.click(function () {
      window.location.href = personalInfo['personal-github'];
    });

    //
    // COMPETENCIES
    //
    const myCompetencies = resumeData['my-competencies'];
    const competencies = myCompetencies['competency'];

    // COMPETENCIES HTML ELEMENTS
    const competencyElements = {
      competencySoftware: $('.competency-software'),
      competencyScoreDisplayDivs: $('.competency-score-container'),
    };

    competencies.forEach(function (competency, i) {
      const singleSoftware = competency['competency-software'];
      const singleScore = competency['competency-score'];

      // Update HTML elements for this competency
      competencyElements.competencySoftware.eq(i).text(singleSoftware);

      const competencyLevel = parseInt(singleScore); // Convert to an integer
      const levelDiv = competencyElements.competencyScoreDisplayDivs.eq(i);
      levelDiv.html(''); // Clear previous circles

      for (let i = 0; i < 10; i++) {
        const circle = $('<div>').addClass('circle');
        if (i < competencyLevel) {
          circle.addClass('active');
        }
        levelDiv.append(circle);
      }
    });

    //
    // EDUCATION
    //
    const educationHistory = resumeData['education-history'];
    const educations = educationHistory['education'];

    // EDUCATION HTML ELEMENTS
    const educationElements = {
      degree: $('.degree'),
      institution: $('.institution'),
    };

    educations.forEach(function (education, i) {
      const degree = education['degree'];
      const institution = education['institution'];

      // Update HTML elements for this education
      educationElements.degree.eq(i).text(degree);
      educationElements.institution.eq(i).text(institution);
    });

    //
    // EXPERIENCE
    //
    const experienceHistory = resumeData['experience-history'];
    const jobs = experienceHistory['job'];

    // EXPERIENCE HTML ELEMENTS
    const experienceElements = {
      company: $('.company'),
      address: $('.address'),
      position: $('.position'),
      period: $('.period'),
      softwares: $('.softwares'),
      duties: $('.duties'),
    };

    jobs.forEach(function (job, i) {
      const company = job['company'];
      const address = job['address'];
      const position = job['position'];
      const period = job['period'];
      const softwares = job.softwares.software.map(function (s) {
        return s.trim();
      });
      const duties = job.duties.duty.map(function (d) {
        return d.trim();
      });

      // Update HTML elements for this job
      experienceElements.company.eq(i).text(company);
      experienceElements.address.eq(i).text(address);
      experienceElements.position.eq(i).text(position);
      experienceElements.period.eq(i).text(period);

      experienceElements.softwares.eq(i).html(''); // Clear previous items
      softwares.forEach(function (s) {
        const li = $('<li>').text(s);
        experienceElements.softwares.eq(i).append(li);
      });

      experienceElements.duties.eq(i).html(''); // Clear previous items
      duties.forEach(function (d) {
        const li = $('<li>').text(d);
        experienceElements.duties.eq(i).append(li);
      });
    });

    //
    // PORTFOLIO
    //
    const portfolioHistory = resumeData['portfolio-history'];
    const projects = portfolioHistory['project'];

    // PORTFOLIO HTML ELEMENTS
    const portfolioElements = {
      projectName: $('.project-name'),
      projectLang: $('.project-lang'),
      projectDesc: $('.project-desc'),
      projectUrl: $('.project-url a'),
      mobileGithubIcons: $('.mob-icon.fa-github'),
      projectImages: $('.image-slideshow-container'),
    };

    console.log(portfolioElements)
    projects.forEach(function (project, i) {
      const name = project['project-name'];
      const lang = project['project-lang'];
      const url = project['project-url'];
      const desc = project['project-desc'];
      const images = project.project_images.project_image.map(function (j) {
        return j.trim();
      });

      // Update HTML elements for this project
      portfolioElements.projectName.eq(i).text(name);
      portfolioElements.projectLang.eq(i).text(lang);
      portfolioElements.projectDesc.eq(i).text(desc);

      // Add GitHub link to the element (desktop)
      portfolioElements.projectUrl.eq(i).attr('href', url);
      portfolioElements.projectUrl.eq(i).attr('target', '_blank'); // Open in new window

      // Add Github link to project icon (mobile)
      portfolioElements.mobileGithubIcons.eq(i).click(function () {
        window.open(url, '_blank');
      });


        // Update Image Lists
        portfolioElements.projectImages[i].innerHTML = ''; // Clear previous images
        images.forEach(s => {
            const img = document.createElement('img');
            img.src = s;
            img.addEventListener('click', () => imageWasClicked());
            portfolioElements.projectImages[i].appendChild(img);
        });
        updateDisplayedImage();
        });
        createGallery();
    });



/******************************/
/****** Image Functions *******/
/******************************/
function createGallery() {
    console.log("Function: createGallary")
  
    const galleries = document.querySelectorAll('.image-slideshow-container');
    const currentImageIndexes = new Array(galleries.length).fill(0);
  
    // Hide all images except the first one when the page loads
    galleries.forEach(gallery => {
      const images = gallery.querySelectorAll('img');
      images.forEach((image, index) => {
        image.style.display = index === 0 ? 'block' : 'none';
      });
    });
  
    document.addEventListener("click", event => {
        console.log("EventListener: createGallary")
      const target = event.target;
      if (target.tagName === "IMG") {
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const gallery = target.closest('.image-slideshow-container');
        const galleryIndex = Array.from(galleries).indexOf(gallery);
        const images = gallery.querySelectorAll('img');
  
        if (x < rect.width / 2) {
          currentImageIndexes[galleryIndex] = (currentImageIndexes[galleryIndex] - 1 + images.length) % images.length;
          console.log(`Clicked left side of image in gallery ${galleryIndex}`);
        } else {
          currentImageIndexes[galleryIndex] = (currentImageIndexes[galleryIndex] + 1) % images.length;
          console.log(`Clicked right side of image in gallery ${galleryIndex}`);
        }
  
        showImage(gallery, currentImageIndexes[galleryIndex]);
      }
    });
  
    function showImage(gallery, imageIndex) {
        console.log("Function: showImage")
      const images = gallery.querySelectorAll('img');
      images.forEach((image, index) => {
        image.style.display = index === imageIndex ? 'block' : 'none';
      });
    }
  }
  
  function imageWasClicked() {
    console.log("Function: imageWasClicked")
    console.log("an image was clicked");
  }
  
  function updateDisplayedImage() {}
  

  //////////////////////////////////
  ////////MOBILE SLIDESHOW//////////
  //////////////////////////////////
  function openSlideshow(index) {
    console.log("Function: openSlideshow")
    const slideshows = document.querySelectorAll('.portfolio-image-container');
    const slideContainers = document.querySelectorAll('.image-slideshow-container');
  
    slideshows[index].style.display = "block";
    slideshows[index].classList.add('active');
  }
  
  function showImage(index) {
    console.log("Function: showImage")
    let images = document.getElementById("image-slideshow-container").getElementsByTagName("img");
  
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
  
    images[index].style.display = "block";
  }
  
  //////////////////////////////////
  ////////MOBILE GITHUB/////////////
  //////////////////////////////////
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log("addEventListener: DomContentLoaded")
    let imageContainers = document.querySelectorAll('.portfolio-image-container');
  
    document.addEventListener('touchstart', function(event) {
    console.log("addEventListener: touchstart")
      let isGallery = false;
  
      for (let i = 0; i < imageContainers.length; i++) {
        if (event.target === imageContainers[i] || imageContainers[i].contains(event.target)) {
          isGallery = true;
          break;
        }
      }
  
      if (!isGallery) {
        console.log("User touched outside the image container");
        closeGallery();
      }
    });
  
    function closeGallery() {
        console.log("Function: closeGallery")
      for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].style.display = "none";
        imageContainers[i].classList.remove('active');
      }
      console.log("Gallery closed");
    }
  });
  
});


