// Create the navigation bar
function createNavigationBar() {
    // Create nav element
    var nav = document.createElement('nav');
    document.body.appendChild(nav);

    // Create ul element
    var ul = document.createElement('ul');
    nav.appendChild(ul);

    // Create li elements and append them to ul
    var pages = ['Home', 'News', 'Contact', 'About'];
    for (var i = 0; i < pages.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = pages[i].toLowerCase() + '.asp';
        a.textContent = pages[i];
        li.appendChild(a);
        ul.appendChild(li);
    }

    // Add styles using CSS
    var style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        nav {
            background-color: #333;
            overflow: hidden;
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        nav li {
            float: left;
        }

        nav li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        nav li a:hover {
            background-color: #ddd;
            color: black;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to create the navigation bar
createNavigationBar();