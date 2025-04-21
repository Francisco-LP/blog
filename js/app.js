// js/app.js corregido final

// Esperar que cargue el DOM



document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenido");

  const cargarSeccion = (nombre) => {
    fetch(`proyectos/${nombre}/index.html`)
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar la sección");
        return response.text();
      })
      .then(html => {
        contenedor.innerHTML = html;

        if (nombre === "linux") {
          cargarScriptComandos(); // Cargar comandos.js solo si es Linux
        }
      })
      .catch(error => {
        contenedor.innerHTML = `<p>Error al cargar la sección "${nombre}".</p>`;
        console.error(error);
      });
  };

  const cargarProyecto = (ruta) => {
    fetch(`proyectos/${ruta}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el proyecto");
        return res.text();
      })
      .then(html => contenedor.innerHTML = html)
      .catch(err => {
        contenedor.innerHTML = "<p>Error al cargar el proyecto.</p>";
        console.error(err);
      });
  };

  const cargarScriptComandos = () => {
    const script = document.createElement("script");
    script.src = "js/linux/comandos.js";
    script.defer = true;
    document.body.appendChild(script);
  };

  cargarSeccion("inicio");

  document.querySelectorAll("a[data-seccion]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const seccion = e.target.getAttribute("data-seccion");
      cargarSeccion(seccion);
    });
  });

  document.addEventListener("click", e => {
    const target = e.target.closest(".card-proyecto");
    if (target && target.dataset.proyecto) {
      e.preventDefault();
      const ruta = target.dataset.proyecto;
      cargarProyecto(ruta);
    }
  });
});
