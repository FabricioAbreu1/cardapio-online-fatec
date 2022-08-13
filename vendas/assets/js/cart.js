const products = [
    // suco de laranja
  {
    name: "Suco de Laranja",
    price: 3,
    size: 0.3,
  },
    {name: "Suco de Laranja",
    price: 5,
    size: 1,
  },
  {
    name: "Suco de Laranja",
    price: 10,
    size: 2,
  },
  {
    name: "Suco de Laranja",
    price: 30,
    size: 5,
  },
  // suco de uva
  {
      name: "Suco de Uva",
      price: 3,
      size: 0.3,
    },
      {name: "Suco de Uva",
      price: 5,
      size: 1,
    },
    {
      name: "Suco de Uva",
      price: 10,
      size: 2,
    },
    {
      name: "Suco de Uva",
      price: 30,
      size: 5,
    },
    // suco de goiaba
  {
      name: "Suco de Goiaba",
      price: 3,
      size: 0.3,
    },
      {name: "Suco de Goiaba",
      price: 5,
      size: 1,
    },
    {
      name: "Suco de Goiaba",
      price: 10,
      size: 2,
    },
    {
      name: "Suco de Goiaba",
      price: 30,
      size: 5,
    },
    // suco de Maracujá
  {
      name: "Suco de Maracujá",
      price: 3,
      size: 0.3,
    },
      {name: "Suco de Maracujá",
      price: 5,
      size: 1,
    },
    {
      name: "Suco de Maracujá",
      price: 10,
      size: 2,
    },
    {
      name: "Suco de Maracujá",
      price: 30,
      size: 5,
    },
     // suco de Limão
  {
      name: "Suco de Limão",
      price: 3,
      size: 0.3,
    },
      {name: "Suco de Limão",
      price: 5,
      size: 1,
    },
    {
      name: "Suco de Limão",
      price: 10,
      size: 2,
    },
    {
      name: "Suco de Limão",
      price: 30,
      size: 5,
    },
     // suco de Caju
  {
      name: "Suco de Caju",
      price: 3,
      size: 0.3,
    },
      {name: "Suco de Caju",
      price: 5,
      size: 1,
    },
    {
      name: "Suco de Caju",
      price: 10,
      size: 2,
    },
    {
      name: "Suco de Caju",
      price: 30,
      size: 5,
    },
];

const cart = [];
var $table = $('#table')

window.actionEvents = {
  'click .btn': function () {
    alert('Click')
  }
}

var proxied = window.alert;
window.alert = function() {
  modal = $('<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"></div><div class="modal-body"><p>One fine body&hellip;</p></div><div class="modal-footer"><button type="button" class="btn btn-dark" data-dismiss="modal" onclick="modalClose()">Fechar</button></div></div></div></div>');
  modal.find(".modal-body").text(arguments[0]);
  modal.modal('show');

  setTimeout(() => {
    modal.modal('hide');
  }, 2000);
};

function modalClose() {
  modal.modal('hide');
}

$table.bootstrapTable({data: cart, formatNoMatches: function () {
  return 'Não há produtos no carrinho.';
},})


const sumProduct = (input) => {
    document.getElementById(input).value = Number(document.getElementById(input).value) + 1;
};

const removeProduct = (input) => {
    const value = document.getElementById(input).value
    
    document.getElementById(input).value = value > 0 ? value - 1 : 0;
};

const addProductCart = (productName, inputCount, inputSize) => {
    const productSize = document.getElementById(inputSize).value
    const productCount = Number(document.getElementById(inputCount).value)

    if(productCount == 0)
        {
            alert("Quantidade mínima deve ser de 1 produto.")
            return;
        }


    const foundProduct = products.find(product => product.name == productName && product.size == productSize)
    const totalPrice = foundProduct.price * productCount
    const mountProductCart = {name: `${foundProduct.name} ${foundProduct.size}L`, price: foundProduct.price, productCount, totalPrice}
    cart.push(mountProductCart);
    calculateTotalPrice()

    alert("Produto adicionado no carrinho")

    $table.bootstrapTable('refresh')
}

const calculateTotalPrice = () => {
  cart.total = cart.reduce(function (sum, product) {
    return sum + product.totalPrice
  }, 0)
}


const removeProductCart = (element) => {
  const indexToRemove = $(element).parents("tr").index();
  cart.splice(indexToRemove, 1)
  calculateTotalPrice()
  $table.bootstrapTable('refresh')
}

function priceFormatter(data) {
  return  `R$ ${cart.total ? cart.total : 0},00`
}

function totalPriceFormatter(data) {
  return  `R$ ${data},00`
}

function nameFormatter(data) {
  return 'Total'
}

function actionFormatter() {
  return '<button class="btn btn-danger" onclick="removeProductCart(this)">Remover</>'
}

function syncCart(params) {
 params.success({rows: cart})
}