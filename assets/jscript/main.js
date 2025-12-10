//--- JS relacionado ao Header ---

//Barra de Pesquisa (que realmente pesquisa produtos)
const searchInput = document.querySelector('.search-input');
const productList = document.querySelector('.product-list');
if (searchInput && productList) {
	searchInput.addEventListener('keyup', (event) => {
		const searchTerm = event.target.value.toLowerCase();
		const products = productList.querySelectorAll('.product-item');
		console.log('Search Term:', searchTerm);

		products.forEach(product => {
			const productName = product.querySelector('.product-title').textContent.toLowerCase();
			if (productName.includes(searchTerm)) {
				product.style.visibility = 'visible'; // Mostra o produto
				product.style.position = 'static'; // Garante que ocupe espaço
			} else {
				product.style.visibility = 'hidden'; // Esconde o produto
				product.style.position = 'absolute'; // Remove do fluxo do documento
			}
		});
	});
}


//--- JS relacionado ao Footer ---

// Validação do E-mail da Newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
	newsletterForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const emailInput = newsletterForm.querySelector('.newsletter-input');
		const email = emailInput.value;

		if (validateEmail(email)) {
			alert('Inscrição na newsletter realizada com sucesso!');
			emailInput.value = ''; // Limpa o campo após o envio
		} else {
			alert('Por favor, insira um endereço de e-mail válido.');
		}
	});
}
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}


//--- JS relacionada ao site em geral ---

// Função para adicionar produto ao carrinho
function addToCart(product) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	cart.push(product);
	localStorage.setItem('cart', JSON.stringify(cart));
}

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
		msg.style.background = 'rgba(40,167,69,0.95)'
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

//Pega todos os botões 'COMPRAR' e 'FAVORITAR' e adiciona evento
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
		});
	});
});

// Funções para gerenciar favoritos na página de favoritos
function getFavs() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}
function saveFavs(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}
function renderFavs() {
    const favs = getFavs();
    const tbody = document.getElementById('fav-items');
    const emptyEl = document.getElementById('fav-empty');
    tbody.innerHTML = '';
    if (favs.length === 0) {
        emptyEl.style.display = 'block';
        document.getElementById('fav-list').style.display = 'none';
        return;
    } else {
        emptyEl.style.display = 'none';
        document.getElementById('fav-list').style.display = 'block';
    }
    favs.forEach((prod, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${prod.name}</td>
        <td><img src="${prod.img}" alt="${prod.name}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;"></td>
        <td>R$ ${prod.price.toFixed(2).replace('.', ',')}</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="removeFav('${prod.name}','${prod.price}','${prod.img}')">Excluir</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}
function removeFav(name, price, img) {
    let favs = getFavs();
    price = parseFloat(price);
    favs = favs.filter(p => !(p.name === name && p.price === price && p.img === img));
    saveFavs(favs);
    renderFavs();
    }
document.addEventListener('DOMContentLoaded', renderFavs);

// Funções para gerenciar carrinho na página de carrinho
function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}
function renderCart() {
	const cart = getCart();
	const tbody = document.getElementById('cart-items');
	const totalEl = document.getElementById('cart-total');
	const emptyEl = document.getElementById('cart-empty');
	tbody.innerHTML = '';
	let total = 0;
	if (cart.length === 0) {
		emptyEl.style.display = 'block';
		document.getElementById('cart-list').style.display = 'none';
		totalEl.textContent = 'Total: R$ 0,00';
		return;
	} else {
	emptyEl.style.display = 'none';
	document.getElementById('cart-list').style.display = 'block';
	}
	// Agrupa produtos por nome e preço (para permitir múltiplas unidades)
	const grouped = {};
	cart.forEach(prod => {
		const key = prod.name + '|' + prod.price + '|' + prod.img;
		if (!grouped[key]) {
		grouped[key] = { ...prod, quantity: 1 };
		} else {
		grouped[key].quantity += 1;
		}
	});
	Object.values(grouped).forEach((prod, idx) => {
		const subtotal = prod.price * prod.quantity;
		total += subtotal;
		const tr = document.createElement('tr');
		tr.innerHTML = `
		<td>${prod.name}</td>
		<td><img src="${prod.img}" alt="${prod.name}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;"></td>
		<td>R$ ${prod.price.toFixed(2).replace('.', ',')}</td>
		<td>
		<button class="btn btn-sm btn-outline-light" onclick="updateQty('${prod.name}','${prod.price}','${prod.img}',-1)">-</button>
		<span class="mx-2">${prod.quantity}</span>
		<button class="btn btn-sm btn-outline-light" onclick="updateQty('${prod.name}','${prod.price}','${prod.img}',1)">+</button>
		</td>
		<td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
		<td>
		<button class="btn btn-sm btn-danger" onclick="removeItem('${prod.name}','${prod.price}','${prod.img}')">Remover</button>
		</td>
		`;
		tbody.appendChild(tr);
	});
	totalEl.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

function updateQty(name, price, img, delta) {
	let cart = getCart();
	price = parseFloat(price);
	if (delta > 0) {
		cart.push({ name, price, img });
	} else {
	// Remove uma unidade
	const idx = cart.findIndex(p => p.name === name && p.price === price && p.img === img);
	if (idx !== -1) cart.splice(idx, 1);
	}
	saveCart(cart);
	renderCart();
	}
	function removeItem(name, price, img) {
		let cart = getCart();
		price = parseFloat(price);
		cart = cart.filter(p => !(p.name === name && p.price === price && p.img === img));
		saveCart(cart);
		renderCart();
	}
document.addEventListener('DOMContentLoaded', renderCart);
