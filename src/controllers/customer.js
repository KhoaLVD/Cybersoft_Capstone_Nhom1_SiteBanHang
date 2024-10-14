import Product from "./../models/product.js";
import Api from "./../services/api.js";
const api = new Api();
let dataStore = [
    {
      id: 1,
      name: "iPhone 13",
      price: "$799",
      screen: "6.1 inch OLED",
      backCamera: "12 MP",
      frontCamera: "12 MP",
      img: "https://example.com/iphone13.jpg",
      desc: "The latest iPhone with A15 Bionic chip.",
      type: "Smartphone"
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: "$999",
      screen: "6.2 inch AMOLED",
      backCamera: "64 MP",
      frontCamera: "10 MP",
      img: "https://example.com/galaxys21.jpg",
      desc: "Flagship phone with powerful performance.",
      type: "Smartphone"
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: "$599",
      screen: "6.4 inch OLED",
      backCamera: "50 MP",
      frontCamera: "8 MP",
      img: "https://example.com/pixel6.jpg",
      desc: "Pixel 6 with Google Tensor chip.",
      type: "Smartphone"
    }
  ];
  
  console.log(dataStore);
  const getEleID = (id) => document.getElementById(id);

const renderProduct = (productList) =>{
    let content = "";
    productList.forEach((product) =>{
        content += `
       <div class="border border-gray-300 p-4 rounded-lg shadow-lg flex flex-col items-center">
    <img class="h-32 w-32 object-cover rounded-lg transition-transform duration-500 hover:scale-105" 
    src="${product.img}" alt="${product.name}">
    <div class="content mt-2 text-center">
        <p class="font-bold text-gray-700 text-sm">Loại: ${product.type}</p>
        <p class="font-bold text-gray-900 text-base">${product.name}</p>
        <p class="font-bold text-green-500 text-lg">${product.price} VND</p>
        <h3 class="text-gray-600 mt-2 text-sm">Mô tả</h3>
        <p class="text-gray-500 text-xs">Màn hình: ${product.screen}</p>
        <p class="text-gray-500 text-xs">Camera sau: ${product.backCamera}</p>
        <p class="text-gray-500 text-xs">Camera trước: ${product.frontCamera}</p>
        <p class="text-gray-500 text-xs">Mô tả: ${product.desc}</p>
        <!-- Buttons -->
        <div class="mt-2 items-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg text-sm">
                Thêm vào giỏ
            </button>
           
        </div>
    </div>
</div>

        `;
    })
    getEleID("list").innerHTML = content;
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