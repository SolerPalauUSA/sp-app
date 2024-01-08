class BackButton {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const backButton = document.createElement('button');
        backButton.textContent = '<';
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
                padding: 5px 10px;
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
            }

          
            #back-button-container {
                margin-top:8rem;
                margin-bottom:-8rem;
            }
        `;
        document.head.appendChild(style);

    }
}

// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
