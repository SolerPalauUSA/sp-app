class LibraryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.categories = []; // Store categories and their documents
    this.selectedCategory = null; // Store the currently selected category

    this.render();
    this.loadJSONData(); // Load JSON data (replace with your data loading logic)
    this.handleSearchInput(); 
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your CSS styles here */

        .categories-outer {
          position: sticky;
          top: 0;
          left: 0;
          overflow-x: auto; /* Add horizontal scrollbar if needed */
        }

        .categories {
          display: flex;
          flex-wrap: wrap;
          margin-top: 2rem;
          justify-content: center;
        }

        a {
          text-decoration: none!important;
          color: #053658!important;
        }
       

        .category {
          cursor: pointer;
          padding: 10px;
          margin: 5px;
          background-color: whitesmoke;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 185px;
          font-size: 18px;
          color: #053658!important;
          transition: width 0.3s ease; /* Smooth transition for category buttons */
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
        
        /* Set height when .categories.selected is active */
        .categories.selected .category {
          height: 100%!important;
          width: auto!important;
          display: flex!important;
          white-space: nowrap!important; /* Correct property */
          text-align: center!important;
          align-content: center!important;
        }
        
        /* Set height when .categories.selected is not active */
        .categories:not(.selected) .category {
          height: 120px;
        }


        .categories.selected {
          display: flex;
          justify-content: flex-start;
          flex-wrap: nowrap; /* No wrap for categories */
          overflow-x: auto; /* Horizontal scroll */
          scroll-snap-type: x mandatory; /* Scroll snap to start */
          transition: width 0.3s ease, height 0.3s ease; /* Smooth transition for categories */
        
        }

        .category.active {
          background-color: #053658!important;
          color: whitesmoke!important;
        }



        .documents {
          margin-top: 2rem;
          margin-bottom: 0rem;
          transition: max-height 0.3s ease; /* Smooth transition for documents container */
          overflow-y: auto;
        }
        .documents.active {
          margin-top: 2rem;
          height: 550px;
          transition: max-height 0.3s ease;
          overflow-y: auto;
          margin-bottom: 0rem;
        }
        .document {
          flex: 1;
          min-width: calc(50% - 10px);
          padding: 10px;
          background-color: whitesmoke;
          border: 1px solid #ddd;
        }

        /* Style the scrollbar thumb (handle) */
         .documents::-webkit-scrollbar-thumb {
            background-color: #999!important; 
            border-radius: 5px!important; 
        }

         /* Style the scrollbar track */
         .documents::-webkit-scrollbar-track {
             background-color: transparent!important;
         }

        /* Style the scrollbar corner (between vertical and horizontal scrollbar) */
        .documents::-webkit-scrollbar-corner {
             background-color: transparent!important;
          }

          #search-input {
            display: block; /* Ensures the input behaves as a block-level element */
            width: 80%; /* Adjust the width as needed */
            margin: 0 auto; /* Centers the input box and adds equal margins on both sides */
            margin-top: 8rem;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Example box-shadow, you can customize this */
            border: 1px solid #ccc!important;
            border-radius: 8px!important;
            padding: .5rem!important;
          }

      </style>
      <input type="text" id="search-input" placeholder="Search documents...">
      <div class="categories-outer">
      <div class="categories" id="categories-container"></div>
      </div>
      <div class="documents"></div>
    `;


    this.categoryContainerOuter = this.shadowRoot.querySelector('.categories-outer');    
    this.categoryContainer = this.shadowRoot.querySelector('.categories');
    this.documentsContainer = this.shadowRoot.querySelector('.documents');
    this.categoryContainer = this.shadowRoot.querySelector('#categories-container');
  }

  loadJSONData() {
    const jsonURL = '../data/documents.json';
  
    fetch(jsonURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        // Extract categories from the jsonData
        if (jsonData && jsonData.categories && Array.isArray(jsonData.categories)) {
          this.categories = jsonData.categories;
        } else {
          throw new Error('JSON is not in the expected format');
        }
        this.renderCategories();
      })
      .catch((error) => {
        console.error('Error fetching or processing JSON data:', error);
      });
  }
  
  handleSearchInput() {
    const searchInput = this.shadowRoot.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
      if (query) {
        this.clearCategories(); // Clear categories when searching
        this.renderDocuments(query, true); // Pass a flag indicating search mode
      } else {
        this.renderCategories(); // Render categories if query is empty
        this.renderDocuments(); // Also render documents of the selected category if any
      }
    });
  }


  clearCategories() {
    this.categoryContainer.innerHTML = ''; // Clear the categories
  }



  renderCategories() {
    this.categoryContainer.innerHTML = '';
  
    for (const category of this.categories) {
      const categoryButton = document.createElement('button');
      categoryButton.classList.add('category');
      categoryButton.textContent = category.name;
      categoryButton.id = `category-${category.name.replace(/\s/g, '-')}`; // Replace spaces with hyphens
      categoryButton.addEventListener('click', () => this.toggleCategory(categoryButton, category));
      this.categoryContainer.appendChild(categoryButton);
    }
  }

toggleCategory(categoryButton, category) {
  const categoriesContainer = this.categoryContainer;
  const documentsContainer = this.documentsContainer;

  // Remove 'active' class from all category buttons
  const categoryButtons = this.shadowRoot.querySelectorAll('.category');
  categoryButtons.forEach((button) => button.classList.remove('active'));

  if (categoriesContainer.classList.contains('selected') && this.selectedCategory === category) {
    // If the same category is selected again, remove the 'selected' class
    // after a delay to allow for the transition
    setTimeout(() => {
      categoriesContainer.classList.remove('selected');
      documentsContainer.classList.remove('active');
      this.selectedCategory = null;
    }, 300); // Adjust the delay (in milliseconds) to match your transition duration
  } else {
    // Otherwise, add 'selected' class to the categories container
    categoriesContainer.classList.add('selected');
    documentsContainer.classList.add('active');
    this.selectedCategory = category;

    // Add 'active' class to the category button
    categoryButton.classList.add('active');
  }

  if (this.selectedCategory === category) {
    const categoryId = `category-${category.name.replace(/\s/g, '-')}`;
    console.log('Scrolling to element with ID:', categoryId);
    const categoryElement = this.shadowRoot.querySelector(`#${categoryId}`);
    console.log('Category element:', categoryElement);
    categoryElement.scrollIntoView({ behavior: 'smooth' });
  }

  this.renderDocuments();
}
  
renderDocuments(query = '', isSearchMode = false) {
  this.documentsContainer.innerHTML = '';
  let documents = [];

  if (isSearchMode) {
    // Search across all categories when in search mode
    this.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          documents.push({ ...item, category: category.name });
        }
      });
    });
  } else if (this.selectedCategory && this.selectedCategory.items) {
    // Display documents from the selected category
    documents = this.selectedCategory.items;
  }

  // Display documents
  let documentsHTML = '';
  for (const document of documents) {
    if (document.link && document.name) {
      const displayName = isSearchMode ? `${document.category}: ${document.name}` : document.name;
      documentsHTML += `
        <div class="document">
          <a href="${document.link}" target="_blank">
            <h3>${displayName}</h3>
            <p>${document.description || ''}</p>
          </a>
        </div>
      `;
    } else {
      console.error('Invalid document data:', document);
    }
  }
  this.documentsContainer.innerHTML = documentsHTML;
}

findCategoryOfDocument(doc) {
  // Find the category of a given document
  for (const category of this.categories) {
    if (category.items.includes(doc)) {
      return category.name;
    }
  }
  return 'Unknown Category';
}
}

customElements.define('library-component', LibraryComponent);