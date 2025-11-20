<script>

    export let colors = [];
    const colorMap = {
    "Musgo": "#8A9A5B",
    "café": "#6F4E37",
    "camel": "#C19A6B",
    "negro": "#000000",
    "oxford": "#8391A1",
    "miel": "#E8C547",
    "chedrón": "#935B3E",
    "musgo": "#8A9A5B",
    "avellana": "#B79883",
    "cobre": "#B87333"
};
</script>

<div class="color-swatches">
    
    {#each colors as color}
        <div class="swatch" style="background-color: {colorMap[color]};" title="{color}"></div>
    {/each}
</div>

<style>
    .color-swatches {
        /* Estilo para el contenedor */
        display: flex;
        gap: 8px; /* Espacio entre los cuadritos de color */
        align-items: center;
        padding: 4px 0;
    }

    .swatch {
        /* Estilo para cada cuadrito de color */
        width: 20px;
        height: 20px;
        border-radius: 50%; /* Hacemos que sean círculos */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1); /* Sombra sutil y borde interno */
        transition: transform 0.2s ease-in-out;
        cursor: pointer;
    }

    .swatch:hover {
        transform: scale(1.1); /* Pequeño efecto al pasar el mouse */
    }
</style>