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
          margin-top: 1rem;
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
          height: 500px;
        }
        .documents.active {
          margin-top: 0rem;
          height: 475px;
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

        /* Styling the scrollbar */
        .categories::-webkit-scrollbar {
          height: 10px!important; /* Adjust height as needed */
        }
        
        .categories::-webkit-scrollbar-thumb {
          background: #888!important; /* Adjust color as needed */
          border-radius: 5px!important;
        }
        
        .categories::-webkit-scrollbar-thumb:hover {
          background: #555!important; /* Adjust hover color as needed */
        }

        .documents.active::-webkit-scrollbar {
          height: 10px!important; /* Adjust height as needed */
        }
        
        .documents.active::-webkit-scrollbar-thumb {
          background: #888!important; /* Adjust color as needed */
          border-radius: 5px!important;
        }
        
        .documents.active::-webkit-scrollbar-thumb:hover {
          background: #555!important; /* Adjust hover color as needed */
        }



          #search-input {
            display: block; /* Ensures the input behaves as a block-level element */
            width: 80%; /* Adjust the width as needed */
            margin: 0 auto; /* Centers the input box and adds equal margins on both sides */
            margin-top: 7rem;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Example box-shadow, you can customize this */
            border: 1px solid #ccc!important;
            border-radius: 8px!important;
            padding: .5rem!important;
            font-size: 16px;
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

  clearCategories() {
    this.categoryContainer.innerHTML = ''; // Clear the categories
  }

  handleSearchInput() {
    const searchInput = this.shadowRoot.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
  
      // Check if the categories container has the 'selected' class
      const categoriesContainerHasSelected = this.categoryContainer.classList.contains('selected');
  
      if (query === '') {
        if (!categoriesContainerHasSelected) {
          // If input is empty and 'selected' class is not present
          this.renderCategories(); // Render categories
          this.documentsContainer.innerHTML = ''; // Clear the documents
        } else {
          // If input is empty but 'selected' class is present
          this.renderDocuments(); // Show all documents of the selected category
        }
      } else {
        // If there's a query
        if (!categoriesContainerHasSelected) {
          this.clearCategories(); // Clear categories if 'selected' class is not present
        }
        this.renderDocuments(query); // Render documents based on the query
      }
    });
  }
  


  renderCategories() {
    this.categoryContainer.innerHTML = '';
    this.categories.forEach((category) => {
      const categoryButton = document.createElement('button');
      categoryButton.classList.add('category');
      categoryButton.textContent = category.type; // Using 'type' from JSON
      categoryButton.id = `category-${category.type.replace(/\s/g, '-')}`;
      categoryButton.addEventListener('click', () => this.toggleCategory(categoryButton, category));
      this.categoryContainer.appendChild(categoryButton);
    });
  }


  toggleCategory(categoryButton, category) {
    const categoriesContainer = this.categoryContainer;
    const documentsContainer = this.documentsContainer;
    const categoryButtons = this.shadowRoot.querySelectorAll('.category');
  
    const selectedCategory = this.categories.find(cat => cat.type === category.type);
  
    if (categoriesContainer.classList.contains('selected') && this.selectedCategory === selectedCategory) {
      // Deselecting the current category
      setTimeout(() => {
        categoriesContainer.classList.remove('selected');
        documentsContainer.classList.remove('active');
        documentsContainer.innerHTML = ''; // Clear the documents
        this.selectedCategory = null;
        categoryButton.classList.remove('active'); // Remove 'active' class from the category button
      }, 300);
    } else {
      // Remove 'active' class from all category buttons
      categoryButtons.forEach(button => button.classList.remove('active'));
  
      // Selecting a new category
      categoriesContainer.classList.add('selected');
      documentsContainer.classList.add('active');
      this.selectedCategory = selectedCategory;
      categoryButton.classList.add('active');
  
      // Scroll the selected category button into view
      categoryButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  
      this.renderDocuments();
    }
  }
  
  
  renderDocuments(query = '') {
    this.documentsContainer.innerHTML = '';
    let documents = [];
  
    if (this.selectedCategory && this.selectedCategory.items) {
      // If a category is selected, filter its documents
      documents = this.selectedCategory.items.filter(item =>
        item.name.toLowerCase().includes(query)
      ).map(item => ({ ...item, categoryType: this.selectedCategory.type }));
    } else {
      // If no category is selected, search across all documents
      documents = this.categories.flatMap(category => 
        category.items.filter(item =>
          item.name.toLowerCase().includes(query)
        ).map(item => ({ ...item, categoryType: category.type }))
      );
    }
  
    // Display documents
    let documentsHTML = '';
    for (const document of documents) {
      if (document.link && document.name) {
        const displayName = this.selectedCategory ? document.name : `${document.categoryType}: ${document.name}`;
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
