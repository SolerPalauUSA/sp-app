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

                .links-wrapper {
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  margin-left: 1rem;
                  margin-right: 1rem;
                  height: 100vh;


                }

                .links-container {
                    padding: 1rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
            </style>
        `;
    }
}

customElements.define('important-links', ImportantLinks);
