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
            const response = await fetch('path/to/your/json/file.json');
            const data = await response.json();
            this.renderLinks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderLinkItem(item) {
        return `
            <a href="${item.Link}" class="link-item">
                <img src="${item.Icon}" alt="${item.Title}" class="link-icon">
                <span class="link-title">${item.Title}</span>
            </a>
        `;
    }

    renderLinks(data) {
        const linksHTML = data.map(item => this.renderLinkItem(item)).join('');
        this.shadowRoot.innerHTML += `
            <div class="links-container">${linksHTML}</div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .links-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 10px;
                    padding: 10px;
                }
                .link-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
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
