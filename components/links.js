class ImportantLinks extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('../data/importantLinks.json');
            const data = await response.json();
            this.renderLinks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderLinkItem(item) {
        return `
            <a href="${item.Link}" class="link-item" target="_blank" >
                <img src="${item.Icon}" alt="${item.Title}" class="link-icon">
                <span class="link-title">${item.Title}</span>
            </a>
        `;
    }

    renderLinks(data) {
        const linksHTML = data.map(item => this.renderLinkItem(item)).join('');
        this.shadowRoot.innerHTML += `
        <div class="links-wrapper">
            <div class="links-container">${linksHTML}</div>
         </div>   
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full viewport height */
            margin: 0; /* Reset any default margin */
        }
        
        .links-wrapper {
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-left: 1rem;
            margin-right: 1rem;
            max-height: 100vh;
            overflow: hidden;
        }

        .links-container {
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Creates two columns */
            gap: 10px;
        }
        .link-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: inherit;
            height: 125px;
        }
        .link-icon {
            width: 50px;
            height: 50px;
        }
        .link-title {
            margin-top: 5px;
            text-align: center;
        }


        
        /* Media Query for devices with viewport size 375x667 */
        @media only screen and (max-width: 375px) and (max-height: 667px) {
            :host {
                /* Adjust host styles for smaller height if needed */
            }

            .links-wrapper {
                /* Adjust styles for smaller height */
                max-height: 667px; /* Example: You might want to adjust the max-height */
            }

            .links-container {
                /* Adjust grid or other styles for smaller height */
                grid-template-columns: 1fr; /* Example: Use single column layout */
                gap: 5px; /* Example: Reduce gap size */
            }

            .link-item {
                /* Adjust link item styles for smaller height */
                height: 100px; /* Example: Adjust height of link items */
            }

            .link-icon {
                /* Adjust icon size for smaller height */
                width: 40px;
                height: 40px;
            }

         
        }

    </style>
        `;
    }
}

customElements.define('important-links', ImportantLinks);
