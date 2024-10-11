class Api {
    getListProduct(){
        return axios({
            url:"https://6700f1ccb52042b542d65444.mockapi.io/Product",
            method:"GET"
        })
    }
    deleteProduct(id){
        return axios({
            url:`https://6700f1ccb52042b542d65444.mockapi.io/Product/${id}`,
            method:"DELETE"
        })
    }
    addProduct(product){
        return axios({
            url:"https://6700f1ccb52042b542d65444.mockapi.io/Product",
            method:"POST",
            data: product
        })
    }
    getProdductById(id){
        return axios({
            url:`https://6700f1ccb52042b542d65444.mockapi.io/Product/${id}`,
            method:"GET"
        })
    }
    updateProduct(product){
        return axios({
            url:`https://6700f1ccb52042b542d65444.mockapi.io/Product/${product.id}`,
            method:"PUT",
            data: product
        })
    }
}

export default Api;