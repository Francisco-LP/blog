// Script para añadir interactividad a la página de comandos Linux

document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de resaltado al pasar el cursor sobre los comandos
    const commandLines = document.querySelectorAll('.command-line');
    
    commandLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(56, 139, 253, 0.1)';
            this.style.borderLeft = '3px solid #238636';
            this.style.paddingLeft = '10px';
            this.style.transition = 'all 0.3s ease';
        });
        
        line.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.borderLeft = 'none';
            this.style.paddingLeft = '0';
        });
    });
    
    // Función para filtrar comandos
    function createSearchFilter() {
        const container = document.createElement('div');
        container.className = 'search-container';
        container.innerHTML = `
            <input type="text" id="searchInput" placeholder="Buscar comandos...">
        `;
        
        document.querySelector('.container').insertBefore(
            container, 
            document.querySelector('.grid-container')
        );
        
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const commands = card.querySelectorAll('.command-line');
                let found = false;
                
                commands.forEach(cmd => {
                    const commandText = cmd.textContent.toLowerCase();
                    if (commandText.includes(searchTerm)) {
                        cmd.style.display = 'flex';
                        found = true;
                    } else {
                        cmd.style.display = 'none';
                    }
                });
                
                // Mostrar u ocultar la tarjeta completa si no hay coincidencias
                if (found || card.querySelector('.card-header').textContent.toLowerCase().includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Crear el filtro de búsqueda
    createSearchFilter();
    
    // Añadir botón para copiar comandos al portapapeles
    function addCopyButtons() {
        const commandLines = document.querySelectorAll('.command-line');
        
        commandLines.forEach(line => {
            const command = line.querySelector('.command').textContent;
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<span>📋</span>';
            copyBtn.title = 'Copiar al portapapeles';
            
            copyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigator.clipboard.writeText(command).then(() => {
                    // Feedback visual
                    this.innerHTML = '<span>✓</span>';
                    setTimeout(() => {
                        this.innerHTML = '<span>📋</span>';
                    }, 1000);
                });
            });
            
            line.appendChild(copyBtn);
        });
    }
    
    // Añadir botones de copia
    addCopyButtons();
    
    // Añadir efecto de acordeón para tarjetas en móviles
    function setupMobileAccordion() {
        if (window.innerWidth <= 768) {
            const headers = document.querySelectorAll('.card-header');
            
            headers.forEach(header => {
                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        }
    }
    
    // Configurar acordeón para móviles
    setupMobileAccordion();
    
    // Recalcular en cambio de tamaño de ventana
    window.addEventListener('resize', setupMobileAccordion);
});
