class ResumeDataNEW {
    #url;
    #data;

    constructor(url = './resumeDataJSON.json') {
        this.#url = url;
        this.#data = null;
    }

    async fetchData() {
        try {
            const response = await fetch(this.#url);
            if (!response.ok) {
                throw new Error('Failed to fetch resume data');
            }
            const resumeData = await response.json();
            this.#data = resumeData;
            return resumeData;
        } catch (error) {
            console.error('Error fetching resume data:', error);
            throw error;
        }
    }

    get aboutMe() {
        if (!this.#data) {
            throw new Error('Resume data not loaded');
        }
        return this.#data.aboutMe;
    }

    get educations() {
        if (!this.#data) {
            throw new Error('Resume data not loaded');
        }
        return this.#data.myEducations;
    }

    get skills() {
        if (!this.#data) {
            throw new Error('Resume data not loaded');
        }
        return this.#data.mySkills;
    }

    get experiences() {
        if (!this.#data) {
            throw new Error('Resume data not loaded');
        }
        return this.#data.myExperiences;
    }

    get portfolio() {
        if (!this.#data) {
            throw new Error('Resume data not loaded');
        }
        return this.#data.myPortfolio;
    }
}

export default ResumeDataNEW;
