function getCurrentPage() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1).replace('.html', '');
  return currentPage || 'index'; // Default to 'index' for the home page
}

class BottomNavbar extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const currentPage = getCurrentPage();

    // Hide the nav-link that matches the current page
    const navLinks = shadowRoot.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('.html', ''); // Remove ".html" extension
      if (href === `/${currentPage}`) {
        link.style.display = 'none';
      }
    });


    shadowRoot.innerHTML = `
        <style>

       
 .search-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: whitesmoke;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 9999;
    opacity: 0; /* Start with 0 opacity */
    transform: scale(0.9); /* Start slightly scaled down */
    transition: opacity 0.3s, transform 0.3s; /* Add transition for opacity and scale */
    overflow: auto;
    height: auto;
}

/* Overlay CSS styles */
  .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
      z-index: 9998; /* Place it below the modal */
      opacity: 0; /* Start with 0 opacity */
      transition: opacity 0.3s; /* Add transition for opacity */
}

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #053658;
      color: #fff;
      padding: 15px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
      opacity: 1;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

    .nav-link {
      text-decoration: none;
      color: #fff;
      text-align: center;
      font-size: 12px;
      letter-spacing: 1px;
}

    #search-icon {
      cursor: pointer;
}

    /* Modal Container */


    /* Close Button */
    .close-button {
      position: absolute;
      top: 16px;
      right: 50px;
      font-size: 40px;
      font-weight: 600;
      cursor: pointer;
      color: #053658;
 }


/* Search Input */
   #search-input {
     width: 80%;
     padding: .5rem;
     font-size: 16px;
     margin-top: 1rem;
     outline: none;
     border-radius: 5px;
     border: 1px solid rgba(0, 0, 0, 0.2)!important;
}

/* Search Results Container */
  .search-results {
     margin-top: 20px;
     display: none;
     position: static;
     border-radius: 8px;
     width: 93%;
     height: 700px;
     margin-bottom: 10px;
     overflow: auto;

}

.search-result-item {
  width: auto;
  padding: 0.5rem;
  background: white;
  color: #053658;
  margin-bottom: 23px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1)!important;
  display: flex;
  align-items: center;
 
    
}

.search-result-item img {

  width: auto;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
  display: flex;
  align-self: flex-start;
  padding: .25rem;


}

.search-item-info {
  display: flex;
  flex-direction: column;
}

.search-item-info h3 {
    display: block;
    font-size: 1rem;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-bottom: .5rem;
    font-weight: 700;

}

.search-item-info p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: .8rem;
  opacity: .7;

}

.document-links {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  width: 80%;
}


.document-links h4 {
  font-weight: 600;
  border-bottom: 1px lightgray solid;
  margin: 5px;

}

.document-links a {
  padding: .5rem;
  font-size: .8rem;
  opacity: .7;
  text-decoration: none;
  color: #053658;
}

.sub-warp {
  flex-direction: column;
}

.lit-wrap {
  flex-direction: column;
}



 </style>

    
  
        <nav>
          <a class="nav-link" href="https://solerpalauusa.github.io/sp-app/">
          <img src="../assets/images/home.svg" alt="home" class="icon-color">
            <span class="nav-icon"></span><br>Home
          </a>
          <a class="nav-link" id="search-icon">
          <img src="../assets/images/search-icon.svg" alt="Search" class="icon-color">
          <span class="nav-icon"></span><br>Search
          </a>
          <a class="nav-link" href="../pages/products.html">
          <img src="../assets/images/fan-white.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Products
          </a>
          <a class="nav-link" href="../pages/library.html">
          <img src="../assets/images/library.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Library
          </a>
          <a class="nav-link" href="../pages/cross-ref.html">
          <img src="../assets/images/right-left-white.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Cross-Ref
          </a>
          <a class="nav-link" href="../pages/important-links.html">
          <img src="../assets/images/links-nav.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Links
          </a>
        </nav>

        <!-- Search Modal -->
        <div id="search-modal" class="search-modal">
          <span class="close-button" id="close-button">&times;</span>
          <input type="text" id="search-input" placeholder="Search...">
          <div id="search-results" class="search-results">
            <!-- Display search results here -->
          </div>
        </div>
  
        <!-- Overlay -->
        <div id="overlay" class="overlay"></div>
      `;

    // Event listeners for search and close functionality
    const searchIcon = shadowRoot.getElementById('search-icon');
    const closeButton = shadowRoot.getElementById('close-button');
    const searchInput = shadowRoot.getElementById('search-input');
    const searchResultsContainer = shadowRoot.getElementById('search-results'); // Get the search results container

    searchIcon.addEventListener('click', this.openSearchModal.bind(this));
    closeButton.addEventListener('click', this.closeSearchModal.bind(this));
    searchInput.addEventListener('input', this.performSearch.bind(this));


    // Add event listener for the "keydown" event to clear results on backspace
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        this.clearSearchResults(searchResultsContainer);
      }
    });
  }




  openSearchModal() {
    // Show the search modal with animation
    const searchModal = this.shadowRoot.getElementById('search-modal');
    searchModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disables scrolling on the body

    setTimeout(() => {
      searchModal.style.opacity = '1';
      searchModal.style.transform = 'scale(1)';
    }, 10);

    // Show the overlay with animation
    const overlay = this.shadowRoot.getElementById('overlay');
    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }

  closeSearchModal() {
    // Hide the search modal with animation
    const searchModal = this.shadowRoot.getElementById('search-modal');
    searchModal.style.opacity = '0';
    searchModal.style.transform = 'scale(0.9)';
    setTimeout(() => {
      searchModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enables scrolling on the body

    }, 300);

    // Hide the overlay with animation
    const overlay = this.shadowRoot.getElementById('overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);

    // Clear the search input and results
    this.clearSearchResults(this.shadowRoot.getElementById('search-results'));

    // Additionally clear the search input field
    const searchInput = this.shadowRoot.getElementById('search-input');
    searchInput.value = '';
  }



  performSearch() {
    const searchInput = this.shadowRoot.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();

    // Clear the search results if the input is empty or only contains spaces
    if (query === '') {
      this.clearSearchResults(this.shadowRoot.getElementById('search-results'));
      return;
    }

    // Fetch the data from your JSON file
    fetch('../data/products.json') // Replace with the actual path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        // Filter the data based on the query
        const filteredResults = this.filterData(data, query);

        // Dispatch a custom event with the search results
        const searchResults = filteredResults;
        const event = new CustomEvent("searchResultsUpdated", { detail: searchResults });
        document.dispatchEvent(event);

        // Display the search results
        this.displaySearchResults(filteredResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }


  filterData(data, query) {
    let results = [];
    data.forEach(product => {
      product.series.forEach(series => {
        if (series.name.toLowerCase().includes(query) || series.description.toLowerCase().includes(query)) {
          results.push({ product: product.name, series: series });
        }
      });
    });
    return results;
  }


  searchInJSON(data, query) {
    let results = [];

    for (const item of data) {
      // Check if the item's properties contain the query
      for (const key in item) {
        if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
          results.push(item);
          break; // Once a match is found in this item, no need to check further
        }
      }

      // Recursively search through nested arrays and objects
      for (const key in item) {
        if (Array.isArray(item[key]) || (typeof item[key] === 'object' && item[key] !== null)) {
          const nestedResults = this.searchInJSON([item[key]], query);
          results = results.concat(nestedResults);
        }
      }
    }

    return results;
  }


  clearSearchResults(searchResultsContainer) {
    // Clear the search results
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.style.display = 'none'; // Hide the search results
  }

  displaySearchResults(results) {
    const searchResultsContainer = this.shadowRoot.getElementById("search-results");
  
    if (results.length > 0) {
      searchResultsContainer.style.display = "block";
      searchResultsContainer.innerHTML = ""; // Clear any previous results
  
      const maxResults = 5;
      for (let i = 0; i < Math.min(results.length, maxResults); i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("search-result-item");
        resultItem.dataset.productName = results[i].product;
        resultItem.dataset.seriesName = results[i].series.name;
  
        const submittalsHtml = this.renderLinks(results[i].series.submittals);
        const otherDocsHtml = this.renderLinks(results[i].series.otherDocs);
  
        // Event listener for the entire result item
        resultItem.addEventListener('click', () => {
          // Retrieve the product name and series from data attributes
          const selectedProductName = resultItem.dataset.productName;
          const selectedSeriesName = resultItem.dataset.seriesName;
  
          // Call the handleSearchResultClick function with the selected product and series
          handleSearchResultClick(selectedProductName, selectedSeriesName);
        });
  
        resultItem.innerHTML = `
          <img src="${results[i].series.image}" alt="${results[i].series.name}">
          <div class="search-item-info">
            <h3>${results[i].product} - ${results[i].series.name}</h3>
            <p>${results[i].series.description}</p>
            <div class="document-links">
              <div class="sub-wrap">
                <h4>Submittals</h4>
                ${submittalsHtml}
              </div>
              <div class="lit-wrap">  
                <h4>Literature</h4>
                ${otherDocsHtml}
              </div> 
            </div>
          </div>
        `;
  
        // Attach event listener to links to stop propagation
        const links = resultItem.querySelectorAll('.document-links a');
        links.forEach(link => {
          link.addEventListener('click', event => {
            event.stopPropagation(); // Stop event from bubbling up to the search result item
          });
        });
  
        searchResultsContainer.appendChild(resultItem);
      }
    } else {
      searchResultsContainer.style.display = "none";
    }
  }



  renderLinks(links) {
    if (!links || links.length === 0) {
      return '<p>No documents available</p>';
    }

    const linksHtml = links.map((link) => {
      return `<a href="${link.url}" target="_blank">${link.type}</a>`;
    }).join('<br>');

    return linksHtml;
  }
}



customElements.define('bottom-navbar', BottomNavbar);
