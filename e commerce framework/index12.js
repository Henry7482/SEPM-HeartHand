document.getElementById('frm-add-product').onsubmit = addProduct

function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value
    const price = parseFloat(document.getElementById('product-price').value)
    const quantity = parseInt(document.getElementById('product-quantity').value)
    const amount = price * quantity

    const table = document.getElementById('table-product').getElementsByTagName('tbody')[0]

    const new_row = table.insertRow()
    const col_1 = new_row.insertCell(0)
    const col_2 = new_row.insertCell(1)
    const col_3 = new_row.insertCell(2)
    const col_4 = new_row.insertCell(3)

    col_1.innerHTML = name
    col_2.innerHTML = price
    col_3.innerHTML = quantity
    col_4.innerHTML = amount


    save_product(product)
    show_message()

    function show_message() {
        const message = document.getElementById('message')
        message.style.display = 'block'

        setTimeout(() => {
            message.style.display = 'none'
        }, 2000)
    }

    function save_product(product) {
        let products = JSON.parse(localStorage.getItem('product'))
        products.push(product)
        localStorage.setItem('product', JSON.stringify(products))
    }
}