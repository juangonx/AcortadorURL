const btn = document.getElementById('btn');
const resultado = document.getElementById('resultado');
const input = document.getElementById('magnet');

btn.addEventListener('click', acortarMagnet);

function acortarMagnet() {
    const magnetUri = input.value.trim();

    if (!magnetUri) {
        resultado.textContent = 'Por favor, ingresa un Magnet URI.';
        return;
    }

    resultado.textContent = 'Procesando...';
    
    // Nombre único para evitar conflictos
    const callbackName = 'cb_' + Math.floor(Math.random() * 100000);

    // Función que recibe la respuesta de la API
    window[callbackName] = function(data) {
        if (data.state === 'success') {
            resultado.innerHTML = `
                <strong>¡Listo! URL Corta:</strong><br>
                <a href="${data.shorturl}" target="_blank">${data.shorturl}</a>
            `;
        } else {
            resultado.textContent = 'Error: ' + (data.message || 'Falló la conversión');
        }
        // Limpieza
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // Creación del script (JSONP)
    const script = document.createElement('script');
    script.src = `http://mgnet.me/api/create?m=${encodeURIComponent(magnetUri)}&format=json&callback=${callbackName}`;
    
    script.onerror = () => {
        resultado.textContent = 'Error de conexión. (Recuerda no usar HTTPS)';
        delete window[callbackName];
    };

    document.body.appendChild(script);
}