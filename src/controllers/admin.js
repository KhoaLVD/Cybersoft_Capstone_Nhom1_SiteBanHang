
import Product from "./../models/product.js";
import Api from "./../services/api.js";
import validation from "./../services/validation.js";

const api = new Api();
let dataStore = [];
let Validation = new validation();

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
                <button type="button" data-modal-target="default-modal" data-modal-toggle="default-modal" 
                onclick="updatePopup(${product.id})"  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Chỉnh sửa</button>        
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

const getProductInfo =() =>{
    const name = getEleID("tenSP").value;
    const price = getEleID("giaSP").value;
    const screen = getEleID("manHinhSP").value;
    const backCamera = getEleID("cameraSauSP").value;
    const frontCamera = getEleID("cameraTruocSP").value;
    const img = getEleID("anhSP").value;
    const desc = getEleID("moTaSP").value;
    const type = getEleID("loaiSP").value;

    let isValid = true;

    isValid &= Validation.checkEmpty(name, "tbName", "Vui lòng không để trống") &&
               Validation.checkLength(name, "tbName", "Tên có từ 6 đến 24 ký tự", 6, 24) &&
               
               Validation.checkEmpty(price, "tbPrice", "Vui lòng không để trống") &&
               Validation.checkInteger(price, "tbPrice", "Giá phải là số") &&

               Validation.checkEmpty(screen, "tbScreen", "Vui lòng không để trống") &&
               
               Validation.checkEmpty(backCamera, "tbBackCamera", "Vui lòng không để trống") &&
               
               Validation.checkEmpty(frontCamera, "tbFrontCamera", "Vui lòng không để trống") &&
               
               Validation.checkEmpty(img, "tbImg", "Vui lòng không để trống") &&
               
               Validation.checkEmpty(desc, "tbDesc", "Vui lòng không để trống") && 
               Validation.checkOption("loaiSP", "tbType", "Vui lòng chọn 1 loại");
               
            //    Validation.checkEmpty(type, "tbType", "Vui lòng không để trống") &&
            //    ;
            
    
    if(isValid){
        const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);
        return product;
    }           
    return null;
}

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

    // getEleID("btnThem").style.display = "block";
    // getEleID("btnCapNhat").style.display = "none";
}

const addProduct = () =>{
    // const name = getEleID("tenSP").value;
    // const price = getEleID("giaSP").value;
    // const screen = getEleID("manHinhSP").value;
    // const backCamera = getEleID("cameraSauSP").value;
    // const frontCamera = getEleID("cameraTruocSP").value;
    // const img = getEleID("anhSP").value;
    // const desc = getEleID("moTaSP").value;
    // const type = getEleID("loaiSP").value;

    // const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);
    const product = getProductInfo();
    if(product){
        api.addProduct(product).then((res)=>{
            console.log("res", res);
            fetchProductList();
            getEleID("btnCloseModal").click();
        }).catch((err)=>{
            console.log("err",err);
        });
    }

    
}
window.addProduct = addProduct;

//update
const updatePopup = (id) =>{
    const modal = new Modal(getEleID("default-modal"));
    modal.show();

    getEleID("modalTen").innerHTML = "Cập nhật sản phẩm";

    //getEleID("btnThem").style.display = "none";
    //getEleID("btnCapNhat").style.display = "block";

    const btnCapNhat = `<button
                  onclick="updateProduct(${id})"
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cập nhật
                </button>`;
    getEleID("modal__footer").innerHTML = btnCapNhat;      

    api.getProdductById(id).then((res)=>{
        const product = res.data;
        getEleID("tenSP").value = product.name;
        getEleID("giaSP").value = product.price;
        getEleID("manHinhSP").value = product.screen;
        getEleID("cameraSauSP").value = product.backCamera;
        getEleID("cameraTruocSP").value = product.frontCamera;
        getEleID("anhSP").value = product.img;
        getEleID("moTaSP").value = product.desc;
        getEleID("loaiSP").value = product.type;
    }).catch((err)=>{
        console.log("err",err);
    })
}
window.updatePopup = updatePopup;

const updateProduct = (id) =>{
    const modal = new Modal(getEleID("default-modal"));

    const name = getEleID("tenSP").value;
    const price = getEleID("giaSP").value;
    const screen = getEleID("manHinhSP").value;
    const backCamera = getEleID("cameraSauSP").value;
    const frontCamera = getEleID("cameraTruocSP").value;
    const img = getEleID("anhSP").value;
    const desc = getEleID("moTaSP").value;
    const type = getEleID("loaiSP").value;

    const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
    
    
    api.updateProduct(product).then((res)=>{
        fetchProductList();
        getEleID("btnCloseModal").click();
        modal.hide();
    }).catch((err)=>{
        console.log("err",err);
    })
}
window.updateProduct = updateProduct;
//search theo ten

getEleID("table-search").addEventListener("keyup", ()=>{
    const keyword = getEleID("table-search").value;
    const dataFilter = dataStore.filter((product)=>{
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;    
    })
    renderProduct(dataFilter);
})