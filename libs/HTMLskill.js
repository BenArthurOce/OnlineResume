class HTMLskill {
    #parentElement;
    #templateSkillElement;
    constructor() {
        this.#parentElement = document.querySelector("#mySkills");
        this.#templateSkillElement = `
        <h3>Soft Skills</h3>
        <i class="sidebar-icon fa fa-child"></i><span class="link-text">About</span>
        <i class="sidebar-icon fa fa-database"></i><span class="link-text">Database Management</span>
        <i class="sidebar-icon fa fa-user-secret"></i><span class="link-text">Personal Information Security</span>
        <i class="sidebar-icon fa fa-bell"></i><span class="link-text">Customer Support</span>
        <i class="sidebar-icon fa fa-puzzle-piece"></i><span class="link-text">Critical Thinking</span>
        <i class="sidebar-icon fa fa-book"></i><span class="link-text">Documentation</span>
        <i class="sidebar-icon fa fa-laptop"></i><span class="link-text">Idk its a laptop</span>
        <i class="sidebar-icon fa fa-list-ul"></i><span class="link-text">Task management</span>
    
        <h3>Experienced In</h3>
        <i class="sidebar-icon fa fa-gitlab"></i><span class="link-text">Git</span>
        <i class="sidebar-icon fa fa-cpanel"></i><span class="link-text">cPanel</span>
        <i class="sidebar-icon fa fa-trello"></i><span class="link-text">Trello</span>
        <i class="sidebar-icon fa fa-atlassian"></i><span class="link-text">Jira</span>
        <i class="sidebar-icon fa fa-confluence"></i><span class="link-text">Confluence</span>
        <i class="sidebar-icon fa fa-slack"></i><span class="link-text">Slack</span>
      `;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateSkillElement() {
        return this.#templateSkillElement;
    };

    renderToPage() {
        const newSkillElement = document.createElement('div');
        newSkillElement.innerHTML = this.templateSkillElement;

        this.parentElement.appendChild(newSkillElement);
    };
};

export default HTMLskill