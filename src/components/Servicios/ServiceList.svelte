<script>
  import { serviceData } from "./../../data/servicios.js";
  import ServiceModal from "./ServiceModal.svelte";
  import { onMount } from "svelte";

  let parametroBuscado = "Cargando...";
  let searchTerm = "";
  let showAll = false;
  let isModalOpen = false;
  let selectedService = null;

  $: serviceToShow = showAll ? serviceData : serviceData.slice(0, 3);

  console.log(serviceToShow);

  function toggleShowAll() {
    showAll = !showAll;
  }

  function openModal(service) {
    selectedService = service;
    console.log(selectedService);
    
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedService = null;
  }
</script>

<!-- Productos -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {#each serviceToShow as service}
    <div
      class="group border border-gray-900 hover:border-white rounded-3xl overflow-hidden transition duration-300"
    >
      <div class="p-8">
        <h4 class="mb-3 text-2xl text-black tracking-tighter">
          Modelo: {service.nombre}
        </h4>

        <div class="mb-4 space-y-2">
          {#each service.caracteristicas.slice(0, 3) as b}
            <div class="flex items-center text-black text-opacity-60 text-sm">
              <svg
                class="mr-2 text-green-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6.66667 10.6667L4 8.00004L3.06 8.94004L6.66667 12.5467L14 5.21337L13.06 4.27337L6.66667 10.6667Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>{b}</span>
            </div>
          {/each}

          {#if service.caracteristicas.length > 3}
            <p class="text-sm text-gray-500">
              + {service.caracteristicas.length - 3} beneficios más
            </p>
          {/if}
        </div>
        <div class="flex items-center justify-between mb-4">
          <a
            class="inline-block px-10 py-2 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300"
            href="https://wa.me/message/YO45MCDXZ6ILG1">Contactar</a
          >
        </div>
        <button
          class="group inline-flex items-center w-full cursor-pointer"
          on:click={() => openModal(service)}
          type="button"
        >
          <span class="mr-3.5 text-black font-medium underline"
            >Ver detalles</span
          >
          <svg
            class="transform group-hover:rotate-90 transition duration-300"
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
          >
            <path
              d="M11.5 0.75L1 11.25"
              stroke="black"
              stroke-width="1.43182"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M11.5 10.3781V0.75H1.87187"
              stroke="black"
              stroke-width="1.43182"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  {/each}
</div>

<!-- Botón Ver más -->
{#if serviceToShow.length > 2}
  <div class="text-center mx-auto">
    <button
      class="inline-block px-8 py-5 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300"
      on:click={toggleShowAll}
    >
      {showAll
        ? "Ver menos productos"
        : `Ver más productos (${serviceData.length - serviceToShow.length} restantes)`}
    </button>
  </div>
{/if}

<!-- Modal -->
<ServiceModal
  isOpen={isModalOpen}
  service={selectedService}
  onClose={closeModal}
/>
