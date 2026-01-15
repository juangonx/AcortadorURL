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

    const callbackName = 'cb_' + Math.floor(Math.random() * 100000);

    window[callbackName] = function(data) {
        if (data.state === 'success') {
            resultado.innerHTML = `
                <strong>URL Corta:</strong><br>
                <a href="${data.shorturl}" target="_blank">${data.shorturl}</a>
            `;
        } else {
            resultado.textContent = 'Error: ' + (data.message || 'Falló la conversión');
        }
        document.body.removeChild(script);
        delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `http://mgnet.me/api/create?m=${encodeURIComponent(magnetUri)}&format=json&callback=${callbackName}`;

    script.onerror = () => {
        resultado.textContent = 'Error de conexión (No uses HTTPS).';
        delete window[callbackName];
    };

    document.body.appendChild(script);
}