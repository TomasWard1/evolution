# Proyecto de Visualización de Datos para Universidad Torcuato Di Tella

Este proyecto de visualización de datos utiliza Svelte Kit junto con D3 para escalado y LayerCake para generar gráficos interactivos.

## Tecnologías Utilizadas

- **Svelte Kit**: Framework de desarrollo web para construir aplicaciones web rápidas y eficientes.
  - Documentación de Svelte Kit: [Svelte Kit Docs](https://kit.svelte.dev/docs)

- **D3**: Biblioteca JavaScript para manipular documentos basados en datos.
  - Utilizado para escalar datos y crear visualizaciones dinámicas.
  - Documentación de D3: [D3 Documentation](https://d3js.org/)

- **LayerCake**: Componente para Svelte que facilita la creación de gráficos complejos y escalables.
  - Documentación de LayerCake: [LayerCake GitHub Repository](https://github.com/davidcsally/layercake)
    
-  **Scroller de Svelte**: Componente utilizado para scrollytelling, template provisto por la facultad.

## Documentación

### Funciones Principales

- **`exploreCharacters(event)`**:
  Función que maneja el evento de clic en un enlace para desplazarse suavemente hacia una sección específica de la página.
  
  ```javascript
  function exploreCharacters(event) {
    event.preventDefault();
    const anchor = document.getElementById("start-anchor");
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
  }

- **`Reactividad para leaderboard:`**:
Funcion que utiliza la reactividad de Svelte para mantener el leaderboard updateado.

```javascript
Copy code
$: if (leaderboard) {
    let items = Object.keys(leaderboard).map(function (key) {
      return [key, leaderboard[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    sortedLeaderboard = items.slice(0, 2);
  }
```
- **`simulate100Fights():`**:
Función que simula 100 peleas entre especies de manera aleatoria y actualiza el leaderboard con los resultados.

```javascript
Copy code
function simulate100Fights() {
  for (let i = 0; i < 100; i++) {
    let randomIndex1 = Math.floor(Math.random() * 11);
    let randomIndex2 = Math.floor(Math.random() * 11);

    let sp1 = species[randomIndex1];
    let sp2 = species[randomIndex2];

    fightLoading = true;

    setTimeout(() => {
      fightLoading = false;

      const total1 = sp1.strength + sp1.intelligence + sp1.agility;
      const total2 = sp2.strength + sp2.intelligence + sp2.agility;

      let winner = total1 > total2 ? sp1 : sp2;

      leaderboardStore.update((map) => {
        map[winner.id] = (map[winner.id] || 0) + 1;
        return map;
      });
    }, 1000);
  }
}
```

### Personalización de LayerCake 
Todos los gráficos en este proyecto han sido creados utilizando LayerCake, un componente Svelte modificado para ajustarse a los requisitos específicos del proyecto.

### Autor
Este proyecto fue desarrollado por Tomas Ward.
