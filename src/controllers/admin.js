import Product from "./../models/product.js";
import Api from "./../services/api.js"

const api = new Api();
let dataStore = [];

const getEleID = (id) => document.getElementById(id);

const renderProduct = (productList) =>{
    let content = "";
    productList.forEach((product) =>{
        content +=`
        <tr>
            <td class="bg-gray-50">${product.name}</td>
            <td>${product.price}</td>
            <td class="bg-gray-50 px-2">${product.screen}</td>
            <td class="px-2">${product.backCamera}</td>
            <td class="bg-gray-50 px-2">${product.frontCamera}</td>
            <td class="px-6"><img src="${product.img}" width="100px" /></td>
            <td class="bg-gray-50 px-2">${product.desc}</td>
            <td class="px-6">${product.type}</td>
            <td class="bg-gray-50 px-6">
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh sửa</button>        
            <br />
                <button type="button" onclick="deleteProduct(${product.id})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xoá</button>
            </td>
        </tr>
        </tr>
        `;
    })
    getEleID("tbDanhSachSP").innerHTML = content;
}

const fetchProductList = () =>{
    api.getListProduct().then((res)=>{
        dataStore = res.data;
        let productList = res.data;
        renderProduct(productList);
    }).catch((err)=>{
        console.log("err",err);
    });
}
fetchProductList();

//Xoá
const deleteProduct = (id) =>{
    api.deleteProduct(id).then((res)=>{
        fetchProductList();
    }).catch((err)=>{
        console.log("err",err);
    });
}
window.deleteProduct = deleteProduct;

//Thêm
getEleID("btnThemSP").onclick = () =>{
    getEleID("modalTen").innerHTML = "Thêm sản phẩm";

    getEleID("btnThem").style.display = "block";
    getEleID("btnCapNhat").style.display = "none";
}

const addProduct = () =>{
    const name = getEleID("tenSP").value;
    const price = getEleID("giaSP").value;
    const screen = getEleID("manHinhSP").value;
    const backCamera = getEleID("cameraSauSP").value;
    const frontCamera = getEleID("cameraTruocSP").value;
    const img = getEleID("anhSP").value;
    const desc = getEleID("moTaSP").value;
    const type = getEleID("loaiSP").value;

    const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);

    api.addProduct(product).then((res)=>{
        console.log("res", res);
        fetchProductList();
        getEleID("btnCloseModal").click();
    }).catch((err)=>{
        console.log("err",err);
    });
}
window.addProduct = addProduct;