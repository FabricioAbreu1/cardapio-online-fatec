/* classes */

class Cliente {
    constructor(descricao, tamanho, preco, tipo, sabor, inf) {
        this.descricao = descricao;
        this.tamanho = tamanho;
        this.preco = preco;
        this.tipo = tipo;
        this.sabor = sabor;
        this.inf = inf;
    }
}

                                        //$ chama jquery
/* variaveis */

listaCliente = [];
posicao = '';


function cadastrar(lista, objetoClientes) {
    lista.push(objetoClientes);
}

function alterar(lista, objetoClientes, pos) {
    lista[pos] = objetoClientes;
}

function listar(lista) {
    let auxHtml = '';
    for (let i = 0; i < lista.length; i++) {
        auxHtml +=  '<tr>' +
                        '<td>' + lista[i].descricao + '</td>' +
                        '<td>' + lista[i].tamanho + '</td>' +
                        '<td>' + lista[i].preco + '</td>' +
                        '<td>' + lista[i].tipo + '</td>' +
                        '<td>' + lista[i].sabor + '</td>' +
                        '<td>' + lista[i].inf + '</td>' +
                        '<td>' + 
                            '<a href="#" class="btAlterar" rel="'+ i +'">' + 
                                '<img src="img/alterar.png" width="20" height="20" />' +
                            '</a>'+
                        '</td>'+
                        '<td>'+
                            '<a href="#" class="btExcluir" rel="'+ i +'">'+
                                '<img src="img/inativo.jpg" width="18" height="20" />' +
                            '</a>'+
                        '<td>'
                    '<tr>';
    }
    return auxHtml;
}

function excluir(lista, pos) {
    lista.splice(pos, 1);
}

$(document).ready(function () {
    $('#btSalvar').click(function () {
        let descricao = $('#descricao').val();
        let tamanho = $('#tamanho').val();
        let preco = $('#preco').val();
        let tipo = $('#tipo').val();
        let sabor = $('#sabor').val();
        let inf = $('#inf').val();
        if (descricao != '' && tamanho != '' && preco != '' && tipo != '' && sabor != '' && inf != '') {
            let novoCliente = new Cliente(descricao, tamanho, preco, tipo, sabor, inf);
            if (posicao == '') {
                cadastrar(listaCliente, novoCliente);
            } else {
                alterar(listaCliente, novoCliente, posicao);
                posicao = '';
            }
            $('input').val('');
            $('#tbClientes').html(listar(listaCliente));
        } else {
            alert('Informe todos os dados!')
        }
    })
    
    $('#tbClientes').on('click', '.btAlterar', function() {
        posicao = $(this).attr('rel');                        /* console.log(posicao);  testando se as posições estão funcionando */
        $('#descricao').val(listaCliente[posicao].descricao);
        $('#tamanho').val(listaCliente[posicao].tamanho);
        $('#preco').val(listaCliente[posicao].preco);
        $('#tipo').val(listaCliente[posicao].tipo);
        $('#sabor').val(listaCliente[posicao].sabor);
        $('#inf').val(listaCliente[posicao].inf);
    });

    $('#tbClientes').on('click', '.btExcluir', function() {
        if (confirm('Confirma a exclusão do produto?')) {
            let posExcluir = $(this).attr('rel');
            excluir(listaCliente, posExcluir);
            $('#tbClientes').html(listar(listaCliente));
        }
    });
});