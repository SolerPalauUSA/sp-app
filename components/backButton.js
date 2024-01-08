class BackButton {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const backButton = document.createElement('button');
        backButton.textContent = 'Go Back';
        backButton.addEventListener('click', () => window.history.back());
        this.container.appendChild(backButton);
    }
}

// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
