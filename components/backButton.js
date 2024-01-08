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
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .back-button {
                padding: 10px 15px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.3s ease;
            }

            .back-button:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }

}

// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
