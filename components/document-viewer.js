class LibraryComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.categories = [];
      this.selectedCategory = null;
      this.pdf = null;
      this.pageNum = 1;
      this.pageIsRendering = false;
      this.pageNumIsPending = null;
      this.loadingIndicator = null;
      this.render();
      this.loadJSONData();
      this.handleSearchInput();
  }

render() {
    this.shadowRoot.innerHTML = `

    
      <style>


      #canvas-container canvas {
        max-width: 100%;
        height: auto;
      }



      #pdfCanvas.visible {
        opacity: 1; /* Fully visible when the class 'visible' is added */
    }
        

      .modal {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll for the whole modal */
        background-color: rgba(0, 0, 0, 0.4); /* Dim the background */
      }
      
      .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: 5% auto; /* Center the modal */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Adjust width */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
        overflow: hidden; /* Hide scrollbars if modal body is not longer than screen */
      }
      
      #pdfCanvas {
        transition: opacity 0.5s ease-in-out;
        opacity: 0; /* Start with the canvas transparent */
        width: 100%; /* Responsive width */
        height: auto; /* Height will be set by the rendered PDF page */
        border: none; /* Optional: remove border if you prefer */
        overflow: auto; /* Enable scrollbars if content overflows */
        -webkit-overflow-scrolling: touch; /* Smooth scrolling for touch devices */
      }
      
      .close {
        color: #053658; /* Dark blue color */
        float: right;
        font-size: 28px;
        font-weight: bold;
        margin-right: 15px;
        cursor: pointer;
      }
      
      #pdf-navigation-controls {
        text-align: center; /* Center the navigation controls */
        margin-top: 10px; /* Space between canvas and controls */
      }
      
      #pdf-navigation-controls button {
        padding: 5px 10px;
        margin-right: 5px;
        background-color: #f2f2f2;
        border: 1px solid #ddd;
        cursor: pointer;
      }
      
      #pdf-navigation-controls button:hover {
        background-color: #e7e7e7;
      }
      
      #page-num {
        font-size: 16px;
      }
      


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
    
          transition: max-height 0.3s ease;
        
       
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

  
      <div id="contentModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="canvas-container"></div> <!-- Container for the canvas -->
    <!-- Navigation Controls -->
    <div id="pdf-navigation-controls">
      <button id="prev-page">Previous Page</button>
      <span id="page-num"></span>
      <button id="next-page">Next Page</button>
    </div>
  </div>
</div>



    `;


    this.categoryContainerOuter = this.shadowRoot.querySelector('.categories-outer');    
    this.categoryContainer = this.shadowRoot.querySelector('.categories');
    this.documentsContainer = this.shadowRoot.querySelector('.documents');
    this.categoryContainer = this.shadowRoot.querySelector('#categories-container');
  }


  async displayPDF(url) {
    this.resetPDFState();

    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(url);
    try {
        this.pdf = await loadingTask.promise;
        this.pageNum = 1;

        await this.loadAndRenderPage(this.pdf, this.pageNum);
        this.updatePageNumberDisplay();  // Ensure this is called after the PDF is loaded

        this.manageNavigationListeners();
    } catch (error) {
        console.error('Error loading PDF:', error);
    }
}

 // Add a method to show the loading indicator
 showLoadingIndicator() {
  if (!this.loadingIndicator) {
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.textContent = 'Loading...'; // Customize this as needed
    this.shadowRoot.appendChild(this.loadingIndicator);
  }
  this.loadingIndicator.style.display = 'block';
}

// Add a method to hide the loading indicator
hideLoadingIndicator() {
  if (this.loadingIndicator) {
    this.loadingIndicator.style.display = 'none';
  }
}



async loadAndRenderPage(pdf, pageNum) {
  if (!pdf) {
    console.error('PDF is not loaded yet.');
    return;
  }

  if (pageNum < 1 || pageNum > pdf.numPages) {
    console.error('Requested page number is out of range.');
    return;
  }

  if (this.pageIsRendering) {
    this.pageNumIsPending = pageNum;
    return;
  }

  this.pageIsRendering = true;
  this.showLoadingIndicator();

  try {
    const page = await pdf.getPage(pageNum);
    const scale = window.innerWidth / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale });
    const container = this.shadowRoot.getElementById('canvas-container');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    page.render(renderContext).promise.then(() => {
      this.pageIsRendering = false;
      if (this.pageNumIsPending !== null) {
        this.loadAndRenderPage(pdf, this.pageNumIsPending);
        this.pageNumIsPending = null;
      }
      this.hideLoadingIndicator(); // Hide the loading indicator when rendering is done
      this.pageNum = pageNum; // Update the current page number
      this.updatePageNumberDisplay(); // Update the page number display
    }).catch(e => {
      console.error('Rendering page failed:', e);
      this.hideLoadingIndicator(); // Ensure the loading indicator is hidden on error
    });
  } catch (e) {
    console.error('Error loading page:', e);
    this.hideLoadingIndicator(); // Ensure the loading indicator is hidden on error
  }
}



resetPDFState() {
  this.pdf = null;
  this.pageNum = 1;
  this.pageIsRendering = false;
  this.pageNumIsPending = null;
  this.updatePageNumberDisplay();
}

closeModalCleanup() {
  if (this.renderTask) {
      this.renderTask.cancel();
  }

  const canvasContainer = this.shadowRoot.getElementById('canvas-container');
  while (canvasContainer.firstChild) {
      canvasContainer.removeChild(canvasContainer.firstChild);
  }

  this.resetPDFState();
}



updatePageNumberDisplay() {
  if (this.pdf && this.pdf.numPages) {
      this.shadowRoot.getElementById('page-num').textContent = `Page ${this.pageNum} of ${this.pdf.numPages}`;
  } else {
      console.error('PDF is not loaded.');
  }
}


manageNavigationListeners() {
  const prevPageButton = this.shadowRoot.getElementById('prev-page');
  const nextPageButton = this.shadowRoot.getElementById('next-page');
  prevPageButton.addEventListener('click', () => this.showPrevPage());
  nextPageButton.addEventListener('click', () => this.showNextPage());
}

showPrevPage() {
  if (this.pageNum > 1) {
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
  }
}

showNextPage() {
  if (this.pdf && this.pageNum < this.pdf.numPages) {
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
  }
}

queueRenderPage(num) {
  if (this.pageIsRendering) {
      this.pageNumIsPending = num;
  } else {
      this.loadAndRenderPage(this.pdf, num);
  }
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
              <a href="${document.link}" class="document-link" data-url="${document.link}">
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
  
      this.documentsContainer.querySelectorAll('.document-link').forEach(link => {
        link.addEventListener('click', async (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          const url = e.target.closest('.document-link').getAttribute('data-url');
          
          try {
            const response = await fetch(url);
            if (response.ok) {
              this.displayContent(response, url); // Call the displayContent function
            } else {
              console.error(`Request failed with status: ${response.status}`);
              // Handle failure (show message, etc.)
            }
          } catch (error) {
            console.error('Fetch error:', error);
            // Handle fetch error (show message, etc.)
          }
        });
      });
    }

    showPrevPage() {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
      }
    }
  
    showNextPage() {
      if (this.pdf && this.pageNum < this.pdf.numPages) {
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
      }
    }



    displayContent(response, url) {
      const modal = this.shadowRoot.getElementById('contentModal');
      const span = this.shadowRoot.querySelector('.close');
    
      // Load and render the first page of the PDF
      this.displayPDF(url);
      modal.style.display = "block";
    
      // Detach any previous event listeners to avoid duplicates
      const prevPageButton = this.shadowRoot.getElementById('prev-page');
      const nextPageButton = this.shadowRoot.getElementById('next-page');
      if (this.prevPageClickHandler) {
        prevPageButton.removeEventListener('click', this.prevPageClickHandler);
      }
      if (this.nextPageClickHandler) {
        nextPageButton.removeEventListener('click', this.nextPageClickHandler);
      }
    
      // Bind the current instance ('this') to the handler functions
      this.prevPageClickHandler = this.showPrevPage.bind(this);
      this.nextPageClickHandler = this.showNextPage.bind(this);
    
      // Attach event listeners for your 'Previous' and 'Next' buttons
      prevPageButton.addEventListener('click', this.prevPageClickHandler);
      nextPageButton.addEventListener('click', this.nextPageClickHandler);
    
      // Close modal actions
      span.onclick = () => {
        modal.style.display = "none";
        this.closeModalCleanup();  // Reset canvas and cancel render task on close
        // Remove event listeners when the modal is closed
        prevPageButton.removeEventListener('click', this.prevPageClickHandler);
        nextPageButton.removeEventListener('click', this.nextPageClickHandler);
      };
    
      window.onclick = (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
          this.closeModalCleanup();  // Reset canvas and cancel render task on close
          // Remove event listeners when the modal is closed
          prevPageButton.removeEventListener('click', this.prevPageClickHandler);
          nextPageButton.removeEventListener('click', this.nextPageClickHandler);
        }
      };
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

