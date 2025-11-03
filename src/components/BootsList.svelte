<script>
    import { bootsData } from "../data/bootsData.js";

    let searchTerm = "";
    let selectedCategory = "";
    let selectedFeatures = [];
    let showAll = false;

    // Lista de características disponibles
    const featuresList = [
        "Puntera de acero",
        "Antideslizante",
        "Impermeable",
        "Dieléctrico",
    ];

    // Filtrado reactivo
    $: filteredBoots = bootsData.filter((boot) => {
        const nameMatch = boot.Modelo.toLowerCase().includes(
            searchTerm.toLowerCase(),
        );
        const descMatch = boot.Descripcion_General.toLowerCase().includes(
            searchTerm.toLowerCase(),
        );
        const categoryMatch =
            !selectedCategory || boot.categoria === selectedCategory;
        const featuresMatch =
            selectedFeatures.length === 0 ||
            selectedFeatures.every((f) =>
                boot.Beneficios.map((b) => b.toLowerCase()).includes(
                    f.toLowerCase(),
                ),
            );
        return (nameMatch || descMatch) && categoryMatch && featuresMatch;
    });

    $: bootsToShow = showAll ? filteredBoots : filteredBoots.slice(0, 6);

    function toggleFeature(feature) {
        if (selectedFeatures.includes(feature)) {
            selectedFeatures = selectedFeatures.filter((f) => f !== feature);
        } else {
            selectedFeatures = [...selectedFeatures, feature];
        }
    }

    function toggleShowAll() {
        showAll = !showAll;
    }
</script>

<!-- Filtros -->
<div class="mb-12 max-w-4xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Search -->
        <div
            class="relative border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
        >
            <input
                class="custom-input-text-2 pl-16 pr-6 py-4 w-full text-gray-300 placeholder-gray-300 outline-none bg-transparent"
                type="text"
                placeholder="Buscar productos"
                bind:value={searchTerm}
            />
            <svg
                class="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-100"
                width="19"
                height="19"
                fill="none"
            >
                <path
                    fill="currentColor"
                    d="m18.381 16.917-.001-.001-4.351-4.35a7.53 7.53 0 1 0-1.205 1.204l4.351 4.35.002.002a.852.852 0 0 0 1.204-1.205ZM8.148 13.703a5.816 5.816 0 1 1 5.815-5.814 5.822 5.822 0 0 1-5.815 5.814Z"
                ></path>
            </svg>
        </div>

        <!-- Category -->
        <div
            class="border border-gray-900 focus-within:border-white rounded-3xl"
        >
            <select
                class="appearance-none pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-50 outline-none bg-transparent"
                bind:value={selectedCategory}
            >
                <option value="">Seleccionar categoría</option>
                <option>Botas de Seguridad</option>
                <option>Zapatos Antideslizantes</option>
                <option>Calzado Dieléctrico</option>
                <option>Botas Impermeables</option>
                <option>Calzado Ligero</option>
            </select>
        </div>
    </div>

    <!-- Features -->
    <div class="flex flex-wrap gap-3 items-center justify-center">
        {#each featuresList as feature}
            <div class="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    on:change={() => toggleFeature(feature)}
                />
                <label class="text-black text-sm">{feature}</label>
            </div>
        {/each}
    </div>
</div>

<!-- Productos -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    {#each bootsToShow as boot}
<div class="group border border-gray-900 hover:border-white rounded-3xl overflow-hidden transition duration-300">
              <div class="relative overflow-hidden bg-gray-900 bg-opacity-30">
                <img class="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" src="images/Mod-2048-musgo.jpg" alt="Bota de Seguridad Industrial">
                <div class="absolute top-4 right-4">
                  <span class="px-3 py-1.5 text-sm font-medium text-center text-green-400 uppercase border border-green-400 rounded-full bg-black bg-opacity-50">Nuevo</span>
                </div>
              </div>
              <div class="p-8">
                <h4 class="mb-3 text-2xl text-black tracking-tighter">Modelo: {boot.Modelo}</h4>
                <p class="mb-4 text-black text-opacity-60 text-sm">{boot.Descripcion_General}</p>
                <div class="mb-4 space-y-2">

                                        {#each boot.Beneficios.slice(0, 3) as b}
                  <div class="flex items-center text-black text-opacity-60 text-sm">
                    <svg class="mr-2 text-green-400" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66667 10.6667L4 8.00004L3.06 8.94004L6.66667 12.5467L14 5.21337L13.06 4.27337L6.66667 10.6667Z" fill="currentColor"></path>
                    </svg>
                    <span>{b}</span>
                  </div>
                    {/each}
                                    {#if boot.Beneficios.length > 3}
                    <p class="text-sm text-gray-500">
                        + {boot.Beneficios.length - 3} beneficios más
                    </p>
                {/if}


                </div>
                <div class="flex items-center justify-between mb-4">

                  <a class="inline-block px-10 py-10 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300" href="#">Contactar</a>
                </div>
                <a class="group inline-flex items-center" href="#">
                  <span class="mr-3.5 text-black font-medium underline">Ver detalles</span>
                  <svg class="transform group-hover:rotate-90 transition duration-300" width="13" height="12" viewbox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 0.75L1 11.25" stroke="black" stroke-width="1.43182" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M11.5 10.3781V0.75H1.87187" stroke="black" stroke-width="1.43182" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </a>
              </div>
            </div>
    {/each}
</div>

<!-- Botón Ver más -->
{#if filteredBoots.length > 6}
    <div class="text-center">
        <button
            class="inline-block px-8 py-5 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300"
            on:click={toggleShowAll}
        >
            {showAll
                ? "Ver menos productos"
                : `Ver más productos (${filteredBoots.length - 6} restantes)`}
        </button>
    </div>
{/if}
