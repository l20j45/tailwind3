<script>
  import ColorBanners from "./colorBanners.svelte";
  export let isOpen = false;
  export let boot = null;
  export let onClose;

  function closeModal() {
    if (onClose) {
      onClose();
    }
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  // Prevenir scroll cuando el modal está abierto
  $: if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && boot}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-slide-up"
    >
      <!-- Botón cerrar -->
      <button
        class="absolute top-4 right-4 z-10 p-2 text-gray-600 hover:text-black transition-colors bg-white rounded-full shadow-md"
        on:click={closeModal}
        aria-label="Cerrar modal"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="p-8">
        <!-- Imagen -->
        <div
          class="mb-6 relative overflow-hidden bg-white bg-opacity-30 rounded-2xl"
        >
          <img
            class="w-full h-96 object-cover"
            src="/images/botas/{boot.imagen}"
            alt="Bota de Seguridad Industrial {boot.Modelo}"
          />
          {#if boot?.new === "yes"}
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1.5 text-sm font-medium text-center text-green-400 uppercase border border-green-400 rounded-full bg-black bg-opacity-50"
              >
                Nuevo
              </span>
            </div>
          {/if}
        </div>

        <!-- Contenido -->
        <div>
          <h2 class="mb-2 text-4xl font-bold text-black tracking-tighter">
            Modelo: {boot.Modelo}
          </h2>

          <p class="mb-6 text-lg text-black text-opacity-70">
            {boot.Descripcion_General}
          </p>

          <!-- Categoría -->
          {#if boot.categoria}
            <div class="mb-6">
              <span
                class="inline-block px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-full"
              >
                {boot.categoria}
              </span>
            </div>
          {/if}
          <div class="mb-5 ms-5">
            <ColorBanners colors={boot.Colores} />
          </div>
          <!-- Todos los beneficios -->
          <div class="mb-8">
            <h3 class="mb-4 text-2xl font-semibold text-black">Beneficios</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              {#each boot.Beneficios as beneficio}
                <div class="flex items-start text-black text-opacity-80">
                  <svg
                    class="mr-3 mt-1 text-green-400 flex-shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.66667 10.6667L4 8.00004L3.06 8.94004L6.66667 12.5467L14 5.21337L13.06 4.27337L6.66667 10.6667Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>{beneficio}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Botón de contacto -->
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              class="flex-1 text-center px-10 py-4 text-black font-medium rounded-full bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300"
              href="https://wa.me/message/YO45MCDXZ6ILG1"
            >
              Contactar por WhatsApp
            </a>
            <button
              class="px-8 py-4 text-black font-medium rounded-full border-2 border-gray-300 hover:border-gray-400 transition duration-300"
              on:click={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
</style>
