<script>
    import { createEventDispatcher } from 'svelte';

    /** @type {Object | null} - Datos de la bota a mostrar */
    export let boot = null;
    /** @type {boolean} - Controla si el modal está visible */
    export let show = false;

    const dispatch = createEventDispatcher();

    // Función para cerrar el modal
    function closeModal() {
        show = false;
        // Opcional: emitir un evento por si el componente padre necesita saber que se cerró
        dispatch('close');
    }

    // Cerrar el modal al presionar la tecla ESC
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
</script>

{#if show && boot}
    <div
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        on:click|self={closeModal}
        on:keydown={handleKeydown}
        role="dialog"
        aria-modal="true"
    >
        <div
            class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 p-6 md:p-8"
            on:click|stopPropagation
        >
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-3xl font-bold text-gray-900 tracking-tight">
                    Detalles del Modelo: {boot.Modelo}
                </h3>
                <button
                    on:click={closeModal}
                    class="text-gray-400 hover:text-gray-600 transition-colors p-2 -mr-2"
                    aria-label="Cerrar"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <img 
                class="w-full h-auto object-cover rounded-lg mb-6" 
                src="images/Mod-2048-musgo.jpg" 
                alt="Imagen del modelo {boot.Modelo}"
            >

            <p class="mb-4 text-gray-700">
                <span class="font-semibold">Descripción General:</span> {boot.Descripcion_General}
            </p>

            <h4 class="text-xl font-semibold text-gray-800 mb-3">Beneficios Completos</h4>
            <ul class="list-disc list-inside space-y-2 mb-6">
                {#each boot.Beneficios as beneficio}
                    <li class="text-gray-700">{beneficio}</li>
                {/each}
            </ul>

            <div class="text-center">
                <a
                    class="inline-block px-10 py-3 text-white font-medium rounded-full bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 transition duration-300"
                    href="https://wa.me/message/YO45MCDXZ6ILG1&text=Hola!%20Me%20interesa%20el%20modelo:%20{encodeURIComponent(boot.Modelo)}%20y%20me%20gustaría%20saber%20más%20detalles."
                    target="_blank"
                >
                    Contactar por WhatsApp
                </a>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Opcional: Puedes agregar algunas transiciones CSS aquí si lo deseas */
</style>