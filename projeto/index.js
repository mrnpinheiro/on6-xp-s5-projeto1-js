console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')
const read = require('readline-sync')

// Listar no console uma tabela contendo os produtos em ordem crescente 
// de preço (do menor ao maior). Utilize a lista contida no arquivo database.js
const{produtos} = db
produtos.sort((a,b) => b.preco - a.preco)
console.table(produtos)

// Criação de uma classe chamada Pedido contendo no constructor pelo menos as seguintes informações:
// 1. a lista de produtos
// 2. o valor de cupom
// 3. a data do pedido

// A classe Pedido deve conter os métodos:
// - que calcule a quantidade de itens totais no carrinho
// - que calcule o valor subtotal (quantidade de itens multiplicado pelo preço unitário)
// - que calcule o valor de desconto (subtotal multiplicado pelo desconto)
// - que calcule o valor total (subtotal menos o desconto)

const carrinho = []

class Pedido{
    constructor(carrinho){
      this.produtos = carrinho
      this.desconto = 0
      this.data = new Date()
      this.subtotal = 0
      this.total = 0
      this.qtdProdutos = 0
    }

    calcularTotalItens(){
        this.qtdProdutos = this.produtos.reduce((acumulador, item) => acumulador + item.quantidade, 0)
    }
    calcularSubtotal(){
        this.subtotal = this.produtos.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    }
    calcularDesconto(){
    // Validação de cupom de desconto. Não aceitar cupom acima de 15% de desconto.
        this.desconto = (cupom > 0 && cupom <= 15) ? this.subtotal * (cupom / 100).toFixed(2) : 0
    }
    calcularTotal(){
        this.total = this.subtotal - this.desconto
    }
}

// Receber via terminal as entradas de id e quantidade dos produtos a serem adquiridos.
// Perguntar se a cliente possui cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.
// Calcular o valor do subtotal (sem considerar o desconto)
// Calcular o valor de desconto
// Calcular o valor total (considerando o desconto do cupom)

do{
    const numId = parseInt(read.question('Qual ID do produto desejado? '))
    const quantidade = parseInt(read.question('Quantas unidades? '))

    let produtoEncontrado = produtos.find(prod => prod.id === numId)

    // Validação de produto existente pelo id. Caso não encontre o produto, 
    // apresentar uma mensagem de erro e solicitar novamente um id válido.
    if(produtoEncontrado === undefined){
        console.log('Tente novamente, esse produto não existe em nossa base!')
    } else{
    // Validação de quantidade para não permitir valores negativos.
      if(quantidade <= 0){
        console.log('Informe uma quantidade válida.')
      } else{
        const produtoPedido = {...produtoEncontrado, quantidade: quantidade}
        carrinho.push(produtoPedido)
      }
    }
    adicionar = read.question('Deseja mais algum produto (S/N)? ')
} while (adicionar.toLowerCase() === 's')

const cupom = parseInt(read.question("Informe o valor do cupom de desconto: "))

// Apresentar no console:
// 1. a tabela contendo a lista de produtos adquiridos, incluindo a quantidade de cada produto
const pedido = new Pedido(carrinho)
console.table(pedido.produtos)

// 2. o valor subtotal em Reais
pedido.calcularSubtotal()
console.log(`O valor subtotal do seu pedido é de R$${pedido.subtotal.toFixed(2)}.`)

// 3. o valor do desconto em Reais
pedido.calcularDesconto()
if(pedido.desconto > 0){
    console.log(`O desconto que você recebeu nessa compra é de R$${pedido.desconto.toFixed(2)}.`)
} else{
console.log(`Você não teve desconto nessa compra.`)
}

// 4. o valor total em Reais
pedido.calcularTotal()
console.log(`O valor total do seu pedido é R$${pedido.total.toFixed(2)}.`)

// 5. a data da compra
console.log(`Obrigada pela compra feita em ${pedido.data.toLocaleString("pt-br")} e volte sempre! =)`)