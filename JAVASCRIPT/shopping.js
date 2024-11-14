const searchbox = document.querySelector('.search_box');
const products = document.querySelectorAll('.product');

// Adiciona a função de pesquisa, ignorando a case
searchbox.addEventListener('input', function() {
    const query = this.value.toLowerCase();

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block'; // Exibe o produto
        } else {
            product.style.display = 'none'; // Esconde o produto
        }
    });
});

// Função para mostrar o alerta quando um item for adicionado ao carrinho
function showAlert(message) {
    const alertBox = document.getElementById('alert');
    alertBox.innerText = message;
    alertBox.classList.remove('hidden');
    alertBox.classList.add('visible');

    // Esconder o alerta após 3 segundos
    setTimeout(() => {
        alertBox.classList.remove('visible');
        alertBox.classList.add('hidden');
    }, 3000);
}

// Função para adicionar itens no carrinho
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho do localStorage, ou cria um vazio

    // Cria o item a ser adicionado
    const item = { name: productName, price: parseFloat(productPrice) };
    cart.push(item);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem de alerta
    showAlert(`${productName} foi adicionado ao carrinho!`);
}

// Adiciona o evento de click aos botões "Adicionar ao Carrinho"
const buttons = document.querySelectorAll('.add_to_cart');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        addToCart(productName, productPrice);
    });
});
