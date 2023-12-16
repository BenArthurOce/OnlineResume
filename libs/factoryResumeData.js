class ResumeData {
    #data;
    #url;
    constructor() {
        this.#url = './resumeDataJSON2.json';
        this.#data = '';
    };
    get url() {
        return this.#url;
    };
    get data() {
        return this.#data;
    };
    set data(value) {
        this.#data = value;
    };
    getJSONdata() {
        return fetch(this.url)
            .then(response => response.json())
            .then(resumeData => {
                this.data = resumeData;
                return resumeData;
            })
            .catch(error => {
                console.error('Error fetching resume data:', error);
                throw error;
            });
    }
}

export default ResumeData

