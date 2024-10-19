import Product from "./../models/product.js";
import Cart from "../models/carts.js";
import Api from "./../services/api.js";

const api = new Api();
let dataStore = [];
let cartStore = [];

const getEleID = (id) => document.getElementById(id);

const saveCartToLocalStorage = () => {
    localStorage.setItem("cartStore", JSON.stringify(cartStore));
};

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cartStore");
    if (savedCart) {
        cartStore = JSON.parse(savedCart);
    }
};

const renderProduct = (productList) => {
    let content = "";
    productList.forEach((product, index) => {
        content += `
        <div class="border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col items-center bg-white">
            <img class="anhSP h-32 w-32 object-cover rounded-lg transition-transform duration-500 hover:scale-105" 
                src="${product.img}" alt="${product.name}">
        
            <div class="content mt-4 text-center">
                <p class="loaiSP font-semibold text-gray-500 text-sm">Loại: ${product.type}</p>
                <p class="tenSP font-bold text-gray-800 text-lg">${product.name}</p>
                <p class="giaSP font-bold text-green-600 text-xl">${product.price} VND</p>
                
                <h3 class="text-gray-600 mt-3 text-base font-semibold">Mô tả sản phẩm</h3>
                <p class="text-gray-500 text-xs">Màn hình: ${product.screen}</p>
                <p class="text-gray-500 text-xs">Camera sau: ${product.backCamera}</p>
                <p class="text-gray-500 text-xs">Camera trước: ${product.frontCamera}</p>
                <p class="text-gray-500 text-xs">Mô tả: ${product.desc}</p>
                
                <div class="mt-4 flex items-center justify-between space-x-4">
                    <div class="w-24">
                        <select class="quantity block w-full border border-gray-300 rounded-md text-gray-700 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <button class="addToCartBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out" data-index="${index}">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    const listElement = getEleID("list");
    if (listElement) {
        listElement.innerHTML = content;
    }

    const cartButtons = document.querySelectorAll(".addToCartBtn");
    cartButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            addCart(index);
        });
    });
};
api.getListProduct()
   .then((res) => {
      console.log(res.data);
      dataStore = res.data;
      renderProduct(dataStore);
   })
   .catch((err) => {
      console.error("Lỗi", err);
   });
const renderCart = () => {
    let cartContent = "";
    let totalAmount = 0;
    if (cartStore.length === 0) {
        cartContent = `<tr><td colspan="6" class="text-center text-gray-500">Giỏ hàng trống</td></tr>`;
    } else {
        cartStore.forEach((item, index) => {
            totalAmount += item.price * item.quantity;
            cartContent += `
            <tr class="border-t border-gray-300">
                <td class="px-4 py-2">
                    <img class="h-20 w-20 object-cover rounded-lg" src="${item.img}" alt="${item.name}">
                </td>
                <td class="px-4 py-2 font-bold text-gray-800">${item.name}</td>
                <td class="px-4 py-2 text-gray-600">${item.type}</td>
                <td class="px-4 py-2">
                    <input type="number" class="updateQuantity border border-gray-300 rounded-md w-16 text-center" value="${item.quantity}" min="1" data-index="${index}">
                </td>                <td class="px-4 py-2 font-semibold text-green-600">${item.price} VND</td>
                <td class="px-4 py-2">
                    <button class="removeBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" data-index="${index}">
                        Xóa
                    </button>
                    <button class="updateBtn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg" data-index="${index}">
                        Cập nhật
                    </button>
                </td>
            </tr>
            `;
        });
    }

    const cartElement = getEleID("list_cart");
    if (cartElement) {
        cartElement.innerHTML = cartContent;
    }

    const totalRow = `
    <tr class="border-t border-gray-300 font-bold text-gray-800">
        <td colspan="4" class="px-4 py-2 text-right">Tổng tiền:</td>
        <td class="px-4 py-2 text-green-600">${totalAmount} VND</td>
        <td class="px-4 py-2"></td>
    </tr>
    `;
    
    cartElement.innerHTML += totalRow;

    cartElement.innerHTML += `
    <tr>
        <td colspan="6" class="px-4 py-2 text-center">
            <button id="checkoutBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
                Thanh toán
            </button>
        </td>
    </tr>
    `;

    const updateButtons = document.querySelectorAll(".updateBtn");
    updateButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const newQuantity = document.querySelector(`input.updateQuantity[data-index="${index}"]`).value;
            updateCartQuantity(index, newQuantity);
        });
    });

    const removeButtons = document.querySelectorAll(".removeBtn");
    removeButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            removeCartItem(index);
        });
    });

    const checkoutButton = document.getElementById("checkoutBtn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            clearCart(); 
        });
    }
};

const clearCart = () => {
    cartStore = [];  
    localStorage.removeItem("cartStore");  
    renderCart(); 
};
 


const getMaxCartID = () => {
    return cartStore.length ? Math.max(...cartStore.map(item => item.id)) : 0;
};

const addCart = (index) => {
    const product = dataStore[index];
    const quantity = document.querySelectorAll(".quantity")[index].value;

    const newId = getMaxCartID() + 1;

    const cartItem = new Cart(newId, product.name, product.price, product.img, product.type, quantity);
    cartStore.push(cartItem);

    saveCartToLocalStorage(); 
    renderCart(); 
};

const removeCartItem = (index) => {
    cartStore.splice(index, 1);
    saveCartToLocalStorage();
    renderCart(); 
};

const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
        newQuantity = 1; 
    }
    cartStore[index].quantity = parseInt(newQuantity);
    saveCartToLocalStorage(); 
    renderCart(); 
};


document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage(); 
    renderCart(); 
    fetchProductList(); 
});


const filterProductsByType = (type) => {
    if (type === "all") {
        return dataStore;
    }
    return dataStore.filter(product => product.type.toLowerCase() === type.toLowerCase());
};

const handlePhoneChange = () => {
    const selectedType = getEleID("phone").value;
    const filteredProducts = filterProductsByType(selectedType);
    renderProduct(filteredProducts); 
};

document.getElementById("phone").addEventListener("change", handlePhoneChange);

const fetchProductList = () => {
    api.getListProduct()
        .then((res) => {
            dataStore = res.data;
            renderProduct(dataStore); 
        })
        .catch((err) => {
            console.error("Lỗi", err);
        });
};

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    renderCart();
    fetchProductList();
});
