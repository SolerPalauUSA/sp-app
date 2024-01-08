class BackButton {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const backButton = document.createElement('button');
        backButton.textContent = '\u2190';
        backButton.className = 'back-button'; // Apply the CSS class
        backButton.addEventListener('click', () => window.history.back());
        this.container.appendChild(backButton);

        // Call addStyles method to apply styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .back-button {
                padding: 10px 10px;
                background-color: whitesmoke;
                color: #053658;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.3s ease;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for hovering effect */
            }

            #back-button-container {
                position: absolute;
                top: 15px; /* Adjust as needed */
                left: 10px; /* Adjust as needed */
                z-index: 1000; /* Ensure it's above other elements */
            }
        `;
        document.head.appendChild(style);
    }
}
// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
