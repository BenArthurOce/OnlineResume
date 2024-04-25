class StaticGetIcon {

    static #icons = {
          "All":                { title: "All",                 icon: "",                           display: "All" }
        , "Government":         { title: "Government",          icon: "fa fa-building",             display: "Government Building" }
        , "Programming":        { title: "Programming",         icon: "fa fa-code",                 display: "Programming Code" }
        , "HelpDesk":           { title: "Help Desk",           icon: "fa fa-headphones",           display: "Helpdesk Support" }
        , "Accounting":         { title: "Accounting",          icon: "fa fa-calculator",           display: "Accounting Calculator" }
        , "CustomerService":    { title: "Customer Service",    icon: "fa fa-users",                display: "Customer Service Users" }
        , "UserInterface":      { title: "User Interface",      icon: "fa fa-desktop",              display: "User Interface Desktop" }
        , "Web":                { title: "Web",                 icon: "fa fa-globe",                display: "Web Globe" }
        , "Database":           { title: "Database",            icon: "fa fa-database",             display: "Database Icon" }
        , "Logic":              { title: "Logic",               icon: "fa fa-cogs",                 display: "Logic Cogs" }
        , "Games":              { title: "Games",               icon: "fa fa-gamepad",              display: "Games Gamepad" }
        , "Efficiency":         { title: "Efficiency",          icon: "fa fa-bolt",                 display: "Efficiency Bolt" }
        , "DataSets":           { title: "DataSets",            icon: "fa fa-database",             display: "Dataset Database" }
        , "Finance":            { title: "Finance",             icon: "fa fa-money",                display: "Finance Money" }
        , "Calendar":           { title: "Calendar",            icon: "fa fa-calendar",             display: "Calendar Icon" }
        , "Location":           { title: "Location",            icon: "fa fa-map-marker",           display: "Location Marker" }
        , "Building":           { title: "Building",            icon: "fa fa-building",             display: "Building Icon" }
        , "Exclamation":        { title: "Exclamation",         icon: "fa fa-exclamation-circle",   display: "Exclamation Circle" }
        , "Profile":            { title: "Profile",             icon: "fa fa-user-circle",          display: "Profile User Circle" }
        , "Github":             { title: "Github",              icon: "fa fa-github",               display: "Github Icon" }
        , "LinkedIn":           { title: "LinkedIn",            icon: "fa fa-linkedin",             display: "LinkedIn Icon" }
        , "Envelope":           { title: "Envelope",            icon: "fa fa-envelope",             display: "Envelope Icon" }
        , "Internet":           { title: "Internet",            icon: "fa fa-wifi",                 display: "Internet Wifi" }
        , "Dollar":             { title: "Dollar",              icon: "fa fa-dollar",               display: "Dollar Sign" }
        , "Puzzle":             { title: "Puzzle",              icon: "fa fa-puzzle-piece",         display: "Puzzle Piece" }
        , "Car":                { title: "Car",                 icon: "fa fa-car",                  display: "Car" }
        , "Table":              { title: "Table",               icon: "fa fa-table",                display: "Table" }
        , "Bell":               { title: "Bell",                icon: "fa fa-bell",                 display: "Bell" }
        , "IT":                 { title: "IT",                  icon: "fa fa-desktop",              display: "IT" }

        , "Javascript":         { title: "JavaScript",          icon: "imgLogos/Javascript.svg",    display: "JavaScript Logo" }
        , "Python":             { title: "Python",              icon: "imgLogos/Python.svg",        display: "Python Logo" }
        , "Java":               { title: "Java",                icon: "imgLogos/Java.svg",          display: "Java Logo" }
        , "C":                  { title: "C",                   icon: "imgLogos/C.svg",             display: "C Logo" }
        , "CSharp":             { title: "C#",                  icon: "imgLogos/CSharp.svg",        display: "C# Logo" }
        , "CSS":                { title: "CSS",                 icon: "imgLogos/CSS.svg",           display: "CSS Logo" }
        , "Excel":              { title: "Excel",               icon: "imgLogos/Excel.svg",         display: "Excel Logo" }
        , "HTML":               { title: "HTML",                icon: "imgLogos/HTML.svg",          display: "HTML Logo" }
        , "MySQL":              { title: "MySQL",               icon: "imgLogos/MySQL.svg",         display: "MySQL Logo" }
        , "nodeJs":             { title: "Node.js",             icon: "imgLogos/nodeJs.svg",        display: "Node.js Logo" }
        , "PANDAS":             { title: "Pandas",              icon: "imgLogos/PANDAS.svg",        display: "Pandas Logo" }
        , "R":                  { title: "R",                   icon: "imgLogos/R.svg",             display: "R Logo" }
        , "React":              { title: "React",               icon: "imgLogos/React.svg",         display: "React Logo" }
        , "Ruby":               { title: "Ruby",                icon: "imgLogos/Ruby.svg",          display: "Ruby Logo" }
        , "SQL":                { title: "SQL",                 icon: "imgLogos/SQL.svg",           display: "SQL Logo" }
        , "tkinter":            { title: "Tkinter",             icon: "imgLogos/tkinter.svg",       display: "Tkinter Logo" }
        , "VBA":                { title: "VBA",                 icon: "imgLogos/VBA.svg",           display: "VBA Logo" }

        , "About":              { title: "About",               icon: "fa fa-user-circle",          display: "Profile Circle Icon" }

        , "Skills":             { title: "Skills",              icon: "fa fa-cogs",                 display: "Skills Cogs" }
        , "Education":          { title: "Education",           icon: "fa fa-graduation-cap",       display: "Education Graduation Cap" }
        , "Experience":         { title: "Experience",          icon: "fa fa-briefcase",            display: "Jobs Briefcase" }
        , "Portfolio":          { title: "Portfolio",           icon: "fa fa-folder-open",          display: "Portfolio Folder Open" }


      };

    static getIcon(key) {
        if (key in this.#icons) {
            return this.#icons[key];
        };
        return { title: `${key}`, icon: `${""}`, display: `${key}` }
    };



//****** This creates a button that can be hovered over ******
    static generateButtonElement(key, size) {
        const { title, icon, display } = this.getIcon(key);

        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <li class="${"square-icon button-icon"} ${size}" title="${title}">
                ${icon  ? (icon.includes('.svg') ? `<img src="${icon}" alt="${display}">` : `<i class="${icon}"></i>`) : title}
            </li>
        `.trim();
        return newElement.firstElementChild
    };
      

//****** This creates a clickable icon that redirects ******
    static generateLinkIconElement(key, url, size) {
        const { title, icon, display } = this.#icons[key] || {};    

        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <a class="${"square-icon icon-link"} ${size}" href="${url}" target="_blank" title="${title}">
                ${icon.includes('.svg') ? `<img src="${icon}" alt="${display}">` : `${icon  ? `<i class="${icon}"></i>` : title}`}
            </a>
        `.trim();
        return newElement.firstElementChild
    };


//****** This creates an image ******
    static generateDisplayIconElement(key, size) {
        const { title, icon, display } = this.#icons[key] || {};    

        const newElement = document.createElement('div');
        newElement.innerHTML = `
            ${icon  ? (icon.includes('.svg') ? `<img class="square-icon ${size}" src="${icon}" alt="${display}">` : `<i class="square-icon ${icon} ${size}"></i>`) : title}
        `.trim();
        return newElement.firstElementChild
    };

};

export default StaticGetIcon