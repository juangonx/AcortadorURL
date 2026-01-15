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


const apiURL = `https://mgnet.me/api/create?m=${encodeURIComponent(magnet)}&format=json`;


resultado.textContent = 'Procesando...';


fetch('https://mgnet.me/api/create', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
body: `m=${encodeURIComponent(magnet)}&format=json`
})
.then(response => response.json())
.then(data => {
if (data.state === 'success') {
resultado.innerHTML = `
<strong>URL corta:</strong><br>
<a href="${data.shorturl}" target="_blank">${data.shorturl}</a>
`;
} else {
resultado.textContent = data.message || 'Error al generar la URL';
}
})
.catch(() => {
resultado.textContent = 'La API no respondió correctamente';
});
}