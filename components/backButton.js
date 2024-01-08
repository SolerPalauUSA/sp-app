class BackButton {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const backButton = document.createElement('button');
        backButton.textContent = 'ᐸ';
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
                padding: 10px 12px 10px;
                background-color: whitesmoke;
                color: #053658;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 18px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            }

            #back-button-container {
                position: fixed;
                top: 70px; /* Adjust as needed */
                left: 10px; /* Adjust as needed */
                z-index: 9999; /* Ensure it's above other elements */
            }
        `;
        document.head.appendChild(style);
    }
}
// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
