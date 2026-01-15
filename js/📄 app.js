const btn = document.getElementById('btn');
const resultado = document.getElementById('resultado');
const input = document.getElementById('magnet');

btn.addEventListener('click', acortarMagnet);

function acortarMagnet() {
    const magnet = input.value.trim();

    if (magnet === '') {
        resultado.textContent = 'Por favor ingresa un Magnet URI válido';
        return;
    }

    resultado.textContent = 'Procesando...';

    const callbackName = 'cb_' + Math.random().toString(36).substring(2);

    window[callbackName] = function (data) {
        if (data.state === 'success') {
            resultado.innerHTML = `
                <strong>URL corta:</strong><br>
                <a href="${data.shorturl}" target="_blank">
                    ${data.shorturl}
                </a>
            `;
        } else {
            resultado.textContent = data.message || 'Error al generar la URL';
        }
        document.body.removeChild(script);
        delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `http://mgnet.me/api/create?m=${encodeURIComponent(magnet)}&callback=${callbackName}`;
    script.onerror = () => {
        resultado.textContent = 'No se pudo conectar con la API';
    };

    document.body.appendChild(script);
}
