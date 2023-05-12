const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;

    const productElement = btn.closest('article')

    fetch('product/' + prodId, {
        method: "DELETE",
    }).then((result) => {
        // console.log(result)

        return result.json();
    }).then((data) => {
        console.log(data);
        productElement.parentNode.removeChild(productElement);
    }).catch((err) => {
        console.log(err);
    })
}