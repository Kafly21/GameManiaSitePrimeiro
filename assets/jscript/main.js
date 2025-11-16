// Função para adicionar produto aos favoritos
function addToFav(product) {
	let favs = JSON.parse(localStorage.getItem('favorites')) || [];
	// Evita duplicados: só adiciona se não existir
	if (!favs.some(p => p.name === product.name && p.price === product.price && p.img === product.img)) {
		favs.push(product);
		localStorage.setItem('favorites', JSON.stringify(favs));
	}
}

// Função para mostrar mensagem de sucesso ao adicionar ao carrinho
function showAddSuccessMessage() {
	let msg = document.getElementById('add-success-msg');
	if (!msg) {
		msg = document.createElement('div');
		msg.id = 'add-success-msg';
		msg.style.position = 'fixed';
		msg.style.top = '72px';
		msg.style.left = '50%';
		msg.style.transform = 'translateX(-50%)';
		msg.style.background = green = 'rgba(40,167,69,0.95)';
		msg.style.color = black = '#000';
		msg.style.fontWeight = 'bold';
		msg.style.fontSize = '1.2rem';
		msg.style.padding = '12px 32px';
		msg.style.borderRadius = '8px';
		msg.style.zIndex = '9999';
		msg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
		msg.style.textAlign = 'center';
		document.body.appendChild(msg);
	}
	msg.textContent = 'Adicionado ao carrinho com sucesso! =D';
	msg.style.display = 'block';
	setTimeout(() => { msg.style.display = 'none'; }, 1200);
}

// Função para mostrar mensagem de sucesso ao favoritar
function showFavSuccessMessage() {
	let msg = document.getElementById('fav-success-msg');
	if (!msg) {
		msg = document.createElement('div');
		msg.id = 'fav-success-msg';
		msg.style.position = 'fixed';
		msg.style.top = '72px';
		msg.style.left = '50%';
		msg.style.transform = 'translateX(-50%)';
		msg.style.background = 'rgba(0,123,255,0.95)';
		msg.style.color = '#fff';
		msg.style.fontWeight = 'bold';
		msg.style.fontSize = '1.2rem';
		msg.style.padding = '12px 32px';
		msg.style.borderRadius = '8px';
		msg.style.zIndex = '9999';
		msg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
		msg.style.textAlign = 'center';
		document.body.appendChild(msg);
	}
	msg.textContent = 'Favoritado com sucesso!';
	msg.style.display = 'block';
	setTimeout(() => { msg.style.display = 'none'; }, 1200);
}

// Função para adicionar produto ao carrinho
function addToCart(product) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	cart.push(product);
	localStorage.setItem('cart', JSON.stringify(cart));
}

// Captura todos os botões 'COMPRAR' e adiciona evento
document.addEventListener('DOMContentLoaded', function() {
	// Botões de comprar
	const buyButtons = document.querySelectorAll('.add-to-cart');
	buyButtons.forEach(function(btn) {
		btn.addEventListener('click', function() {
			const card = btn.closest('.product-item');
			const name = card.querySelector('.product-title').textContent.trim();
			const price = card.querySelector('.product-price').textContent.replace('R$', '').replace(',', '.').trim();
			const img = card.querySelector('.product-image').getAttribute('src');
			const product = {
				name: name,
				price: parseFloat(price),
				img: img
			};
			addToCart(product);
			showAddSuccessMessage();
			btn.textContent = 'Adicionado!';
			setTimeout(() => { btn.textContent = 'COMPRAR'; }, 1200);
		});
	});

	// Botões de favoritar
	const favButtons = document.querySelectorAll('.add-to-fav');
	favButtons.forEach(function(btn) {
		btn.addEventListener('click', function() {
			const card = btn.closest('.product-item');
			const name = card.querySelector('.product-title').textContent.trim();
			const price = card.querySelector('.product-price').textContent.replace('R$', '').replace(',', '.').trim();
			const img = card.querySelector('.product-image').getAttribute('src');
			const product = {
				name: name,
				price: parseFloat(price),
				img: img
			};
			addToFav(product);
			showFavSuccessMessage();
			btn.classList.add('favorited');
			setTimeout(() => { btn.classList.remove('favorited'); }, 1200);
		});
	});
});