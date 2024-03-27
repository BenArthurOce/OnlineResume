class View {
    constructor(options) {
        this.template = options.template;
        this.events = options.events || {};
        this.bindings = options.bindings || {};
        this.model = options.model || {};
        this.collection = options.collection || [];
    }

    render() {
        if (this.template) {
            const renderedTemplate = this.template(this.model.toJSON ? this.model.toJSON() : {});
            document.body.innerHTML = renderedTemplate;
        }

        // Event delegation
        for (const key in this.events) {
            const eventParts = key.split(' ');
            const eventType = eventParts.shift();
            const selector = eventParts.join(' ');
            const handler = this[this.events[key]].bind(this);
            document.body.addEventListener(eventType, (event) => {
                if (event.target.matches(selector)) {
                    handler(event);
                }
            });
        }

        // Data bindings
        for (const prop in this.bindings) {
            const binding = this.bindings[prop];
            const elements = document.querySelectorAll(binding.selector);
            if (elements.length > 0) {
                elements.forEach((element) => {
                    switch (binding.type) {
                        case 'booleanClass':
                            if (this.model[prop]) {
                                element.classList.add(binding.name);
                            } else {
                                element.classList.remove(binding.name);
                            }
                            break;
                        default:
                            // Default to text binding
                            element.textContent = this.model[prop];
                            break;
                    }
                });
            }
        }
    }
}

// Example usage:

// Create an instance of View
const myView = new View({
    template: (data) => {
        return `<div class="profileName">${data.name}</div>`;
    },
    events: {
        'click .delete': 'handleDeleteClick',
        'keyup input.search': 'handleSearchKeyUp'
    },
    bindings: {
        'selected': {
            type: 'booleanClass',
            selector: '.container',
            name: 'active'
        }
    },
    model: {
        name: 'John Doe',
        selected: true
    }
});

// Render the view
myView.render();
