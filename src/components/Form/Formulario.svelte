<script>
const sheetUrl = import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL;

  let formData = {
    nombre: "",
    apellido: "",
    email: "",
    empresa: "",
    razon: "",
    mensaje: "",
  };
  let status = "idle"; // 'idle' | 'loading' | 'success' | 'error'
  let responseMessage = "";

async function handleSubmit() {
    status = "loading";
    responseMessage = "";

    try {
      const response = await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors", // <--- Volvemos a no-cors para evitar el preflight de Google
        headers: {
          "Content-Type": "text/plain", 
        },
        body: JSON.stringify(formData),
      });

      // NOTA: Con no-cors, no puedes leer response.json() 
      // Si llega aquí sin lanzar catch, asumimos éxito
      status = "success";
      responseMessage = "¡Datos enviados con éxito!";
      formData = { nombre: "", apellido: "", email: "", empresa: "", razon: "", mensaje: "" };
      
    } catch (e) {
      console.error(e);
      status = "error";
      responseMessage = "Error al conectar con el servidor.";
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="w-full md:w-1/2 p-8">
  <div
    class="relative px-9 py-10 bg-blueGray-900 bg-opacity-30 max-w-lg mx-auto rounded-5xl"
  >
    <h3 class="mb-6 text-2xl font-medium text-white">Déjanos tus datos</h3>
    <div
      class="mb-4 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
    >
      <input
        bind:value={formData.nombre}
        class="pl-6 pr-16 py-4 text-white w-full placeholder-white outline-none bg-transparent"
        type="text"
        placeholder="Primer Nombre"
      />
    </div>
    <div
      class="mb-4 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
    >
      <input
        bind:value={formData.apellido}
        class="pl-6 pr-16 py-4 text-white w-full placeholder-white outline-none bg-transparent"
        type="text"
        placeholder="Apellido"
      />
    </div>
    <div
      class="mb-4 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
    >
      <input
        bind:value={formData.email}
        disabled={status === "loading"}
        class="pl-6 pr-16 py-4 text-white w-full placeholder-white outline-none bg-transparent"
        type="text"
        placeholder="Correo"
      />
    </div>
    <div
      class="mb-4 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
    >
      <input
        bind:value={formData.empresa}
        disabled={status === "loading"}
        class="pl-6 pr-16 py-4 text-white w-full placeholder-white outline-none bg-transparent"
        type="text"
        placeholder="Empresa"
      />
    </div>
    <div
      class="mb-4 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl"
    >
      <div class="relative overflow-hidden rounded-3xl">
        <select
          bind:value={formData.razon}
          disabled={status === "loading"}
          class="appearance-none pl-6 pr-16 py-4 text-white w-full placeholder-white outline-none bg-transparent bg-blueGray-900 bg-opacity-30"
        >
          <option hidden="">Como podemos ayudarte?</option>
          <option class="bg-gray-300">Cotizacion</option>
          <option class="bg-gray-300">Seguimiento</option>
          <option class="bg-gray-300">Otro</option>
        </select>
        <svg
          class="absolute right-8 top-1/2 transform -translate-y-1/2"
          width="16"
          height="9"
          viewbox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6004 1.4585L9.16706 6.89183C8.52539 7.5335 7.47539 7.5335 6.83372 6.89183L1.40039 1.4585"
            stroke="white"
            stroke-width="1.66667"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </div>
    <textarea
      bind:value={formData.mensaje}
      disabled={status === "loading"}
      class="mb-3 w-full px-6 py-4 text-white placeholder-white bg-transparent border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl resize-none"
      placeholder="Mensaje"
      rows="9"
    ></textarea>
    <div class="flex flex-wrap justify-end">
      <div class="w-auto">
        <button
          type="submit"
          disabled={status === "loading"}
          class="inline-block px-14 py-4 text-center font-medium tracking-2xl border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300"
          href="#">{status === "loading" ? "Enviando..." : "Enviar"}</button
        >
      </div>
      {#if responseMessage}
        <p class={status === "success" ? "text-green-500" : "text-red-500"}>
          {responseMessage}
        </p>
      {/if}
    </div>
  </div>
</form>
