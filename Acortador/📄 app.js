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
    
    // Definimos un nombre único para la función callback
    const callbackName = 'jsonp_callback_' + Math.floor(Math.random() * 100000);

    // Creamos la función global que la API llamará
    window[callbackName] = function(data) {
        if (data.state === 'success') {
            resultado.innerHTML = `
                <strong>URL Corta:</strong><br>
                <a href="${data.shorturl}" target="_blank">${data.shorturl}</a>
            `;
        } else {
            resultado.textContent = 'Error: ' + (data.message || 'No se pudo crear');
        }
        // Limpieza
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // Crear el elemento script para saltar restricciones de CORS
    const script = document.createElement('script');
    // Usamos m para el magnet y callback para JSONP según la documentación
    script.src = `http://mgnet.me/api/create?m=${encodeURIComponent(magnetUri)}&format=json&callback=${callbackName}`;
    
    script.onerror = () => {
        resultado.textContent = 'Error: La API no responde (Verifica que no estés en HTTPS)';
        document.body.removeChild(script);
        delete window[callbackName];
    };

    document.body.appendChild(script);
}