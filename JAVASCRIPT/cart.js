// Função para exibir os itens do carrinho
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho do localStorage, ou um carrinho vazio

    const cartContainer = document.querySelector('#cart-items'); // Elemento onde os produtos serão exibidos
    const totalPriceElement = document.querySelector('#total-price'); // Referência ao elemento onde o total será exibido
    cartContainer.innerHTML = ''; // Limpa o conteúdo antes de adicionar os produtos

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalPriceElement.innerText = '0,00'; // Se o carrinho estiver vazio, exibe 0,00
    } else {
        let totalPrice = 0; // Variável para acumular o total dos itens no carrinho

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            itemElement.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
            `;
            
            cartContainer.appendChild(itemElement);
            
            // Adiciona o preço do item ao total
            totalPrice += item.price;
        });

        // Exibe o total
        totalPriceElement.innerText = totalPrice.toFixed(2); // Atualiza o total no elemento correto
    }
}

// Chama a função para exibir o carrinho assim que a página carregar
window.onload = displayCart;
