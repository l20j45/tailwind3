import { bootsData } from "../data/bootsData.js";

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".productGrid");
  const searchInput = document.querySelector(".search-input");
  const categorySelect = document.querySelector("select");
  const checkboxes = document.querySelectorAll(".custom-checkbox-1");
  
  // Modal elements
  const modal = document.getElementById('modal-detalles');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  
  // Variable para controlar si mostrar todos los productos
  let showAllProducts = false;
  let currentFilteredBoots = [];

  // Función para abrir el modal con los detalles de la bota
  function openModal(boot) {
    modalContent.innerHTML = `
      <div class="grid md:grid-cols-2 gap-8 bg-black">
        <!-- Imagen -->
        <div class="relative">
          <img class="w-full h-96 object-cover rounded-2xl" 
               src="${boot.image}" 
               alt="${boot.Modelo}">
          ${boot.isNew ? `
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1.5 text-sm font-medium text-center text-green-400 uppercase border border-green-400 rounded-full bg-black bg-opacity-50">Nuevo</span>
            </div>
          ` : ''}
        </div>
        
        <!-- Detalles -->
        <div>
          <h2 class="text-4xl font-bold text-black mb-2">Modelo: ${boot.Modelo}</h2>
          <p class="text-lg text-green-600 font-semibold mb-4">${boot.categoria}</p>
          
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-black mb-2">Descripción</h3>
            <p class="text-gray-700">${boot.Descripcion_General}</p>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-black mb-3">Beneficios</h3>
            <div class="space-y-2">
              ${boot.Beneficios.map(feature => `
                <div class="flex items-center text-gray-700">
                  <svg class="mr-2 text-green-400 flex-shrink-0" width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M6.66667 10.6667L4 8.00004L3.06 8.94004L6.66667 12.5467L14 5.21337L13.06 4.27337L6.66667 10.6667Z" fill="currentColor"></path>
                  </svg>
                  <span>${feature}</span>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="flex gap-4 mt-8">
            <a class="flex-1 text-center px-6 py-3 text-white font-medium rounded-full bg-green-400 hover:bg-green-500 transition duration-300" 
               href="#">Contactar</a>
            <button id="close-modal-btn" class="flex-1 px-6 py-3 text-black font-medium rounded-full border-2 border-gray-300 hover:border-gray-400 transition duration-300">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Add event listener to the close button inside modal content
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
  }

  // Función para cerrar el modal
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  // Event listeners para cerrar el modal
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  function renderBoots(boots) {
    currentFilteredBoots = boots;
    
    const displayedBoots = showAllProducts ? boots : boots.slice(0, 5);
    
    productGrid.innerHTML = displayedBoots
      .map(
        (boot, index) => `
            <div class="p-8 group border border-gray-900 hover:border-white rounded-3xl overflow-hidden transition duration-300">
                <div class="relative overflow-hidden bg-gray-900 bg-opacity-30">
                    <img class="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" 
                         src="${boot.image}" 
                         alt="${boot.Modelo}">
                    ${
                      boot.isNew
                        ? `
                    <div class="absolute top-4 right-4">
                        <span class="px-3 py-1.5 text-sm font-medium text-center text-green-400 uppercase border border-green-400 rounded-full bg-black bg-opacity-50">Nuevo</span>
                    </div>
                    `
                        : ""
                    }
                </div>
                <div class="p-6">
                    <h4 class="mb-3 text-2xl text-black tracking-tighter">Modelo: ${
                      boot.Modelo
                    }</h4>
                    <p class="mb-4 text-black text-opacity-60 text-sm">${
                      boot.Descripcion_General
                    }</p>
                    <div class="mb-4 space-y-2">
                        ${boot.Beneficios.slice(0, 3).map(
                          (feature) => `
                            <div class="flex items-center text-black text-opacity-60 text-sm">
                                <svg class="mr-2 text-green-400" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66667 10.6667L4 8.00004L3.06 8.94004L6.66667 12.5467L14 5.21337L13.06 4.27337L6.66667 10.6667Z" fill="currentColor"></path>
                                </svg>
                                <span>${feature}</span>
                            </div>
                        `
                        ).join("")}
                        ${boot.Beneficios.length > 3 ? `
                          <p class="text-sm text-gray-500 italic">+ ${boot.Beneficios.length - 3} beneficios más</p>
                        ` : ''}
                    </div>
                    <div class="">
                        <div class="flex flex-col bg-red-400 ">
                        <button class="ver-detalles-btn inline-block w-1/2 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300 " 
                           data-boot-index="${currentFilteredBoots.indexOf(boot)}">Ver Detalles</button>
                           <a class="inline-block px-6 py-3 text-black font-medium rounded-full bg-teal-600 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300 mt-4 text-center" 
                           href="#">Contactar</a>
                           </div>
                    </div>

                </div>
            </div>
        `
      )
      .join("");
    
    // Agregar event listeners a los botones "Ver Detalles"
    document.querySelectorAll('.ver-detalles-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bootIndex = parseInt(e.target.dataset.bootIndex);
        const boot = currentFilteredBoots[bootIndex];
        openModal(boot);
      });
    });
    
    handleVerMasButton(boots.length);
  }

  function handleVerMasButton(totalBoots) {
    let verMasBtn = document.getElementById('ver-mas-btn');
    
    if (totalBoots > 5) {
      verMasBtn.style.display = 'block';
      verMasBtn.textContent = showAllProducts 
        ? 'Ver menos' 
        : `Ver más (${totalBoots - 5} restantes)`;
      
      verMasBtn.onclick = (e) => {
        e.preventDefault();
        showAllProducts = !showAllProducts;
        renderBoots(currentFilteredBoots);
      };
    } else {
      verMasBtn.style.display = 'none';
    }
  }

  function setupFilters() {
    searchInput.addEventListener("input", () => {
      showAllProducts = false;
      filterBoots();
    });
    
    categorySelect.addEventListener("change", () => {
      showAllProducts = false;
      filterBoots();
    });
    
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        showAllProducts = false;
        filterBoots();
      });
    });
  }

  function filterBoots() {
    const searchTerm = (searchInput.value || "").toLowerCase();
    const selectedCategory = (categorySelect.value || "").toString().trim();
    const selectedFeatures = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => {
        const labelNode =
          cb.nextElementSibling && cb.nextElementSibling.nextElementSibling;
        return labelNode && labelNode.textContent
          ? labelNode.textContent.toLowerCase()
          : "";
      })
      .filter((s) => s.length > 0);

    const filteredBoots = bootsData.filter((boot) => {
      const name = (boot.name || boot.Modelo || "").toString().toLowerCase();
      const description = (boot.description || boot.Descripcion_General || "")
        .toString()
        .toLowerCase();
      const category = (boot.categoria || "").toString().toLowerCase();

      const features = Array.isArray(boot.Beneficios)
        ? boot.Beneficios.map((f) => (f || "").toString().toLowerCase())
        : [];

      const matchesSearch = 
        searchTerm !== '' && 
        (name.includes(searchTerm) || description.includes(searchTerm));
        
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "" ||
        category === selectedCategory.toLowerCase();
        
      const matchesFeatures = 
        selectedFeatures.length > 0 && 
        selectedFeatures.every((feature) => {
          return features.some((f) => {
            return f.toLowerCase().includes(feature.toLowerCase());
          });
        });

      return matchesSearch || matchesCategory || matchesFeatures;
    });

    renderBoots(filteredBoots);
  }

  // Initial render
  renderBoots(bootsData);
  setupFilters();
});