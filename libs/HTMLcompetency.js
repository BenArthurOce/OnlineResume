class HTMLcompetency {
    #parentElement;
    #templateCompElement;
    constructor() {
        this.#parentElement = document.querySelector("#myCompetencies");
        this.#templateCompElement = `
        <article class="template-competency-article">
            <div class="competency-software-container">
                <h3 class="competencySoftware"></h3>
            </div>
            <div class="competencyScore-container"> <div class="competencyScore"></div></div>
        </article>
      `;
        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.textContent = `

        #competencies article {
            /* Remove boarder. Display needs to be flex so the software and scores can be side by side */
            border-bottom: 0px solid #EB210FDF;
            display: flex;
          }
          
          .competency-software-container {
            align-items: center;
            display: flex;
            flex: 1;
            height: 40px; 
            padding: 5px;
            max-width: 300px;   
          }
          
          .competencyscore-container {
            /* all 10 circle items go in this */
            align-items: center;
            display: flex;
            flex: 1;
            height: 40px; 
            padding: 5px;
          }
          
          .circle {
            /* competency score is shown by 10 circles, either colored green or not */
            background-color: #ddd; /* Color for non lit circles */
            border-radius: 50%;
            height: 30px;
            margin-right: 5px;
            width: 30px;
          }
          
          .circle.active {
            background-color: rgba(13, 118, 22, 0.915); /* Color for lit circles */
          }      
        `;
        document.head.appendChild(style);
    };

    get parentElement() {
        return this.#parentElement;
    };
    get templateCompElement() {
        return this.#templateCompElement;
    };

    renderToPage(competencySoftware, competencyScore) {
        const newCompElement = document.createElement('div');
        newCompElement.innerHTML = this.templateCompElement;

        newCompElement.querySelector('.competencySoftware').textContent = competencySoftware;
        newCompElement.querySelector('.competencyScore').textContent = competencyScore;

        this.parentElement.appendChild(newCompElement);
    };
};

export default HTMLcompetency