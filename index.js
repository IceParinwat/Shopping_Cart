document.addEventListener("DOMContentLoaded", () => {
    const inputName = document.getElementById('inputName');
    const inputPrice = document.getElementById('inputPrice');
    const inputUrl = document.getElementById('inputImageUrl');
    const buttonCreate = document.getElementById('createProduct');
    const productList = document.getElementById('productList');
    const cart = document.getElementById('cart');
    const addToCart = document.getElementById('btnCart');
    const buyNow = document.getElementById('buyItems');

    let products = []; // Array เก็บสินค้าที่สร้างขึ้น
    let cartItems = []; // Array เก็บสินค้าที่อยู่ในตะกร้า
    let productId = Date.now(); // ID ของสินค้า
    let sumTotal; // แสดงยอดรวม

    // ฟังก์ชันแสดงสินค้า
    const renderProduct = (productArr) => {
        productList.innerHTML = ""; // รีเซ็ตการสร้างProductใหม่
        productArr.forEach((product) => {
            const li = document.createElement("li");
           

            li.textContent = `${product.name} - ${product.price}฿`;

            // สร้าง checkbox เลือกสินค้า
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox-${product.id}`;
            checkbox.value = product.id;
            checkbox.classList.add("ml-2");

            li.appendChild(checkbox);

            // สร้าง img สินค้า
            const img = document.createElement("img");
            img.src = product.imageUrl;
            img.alt = product.name;
            img.classList.add("w-20", "h-auto", "ml-2");

            li.appendChild(img);
            productList.appendChild(li);
        });
    };

    // ฟังก์ชันเพิ่มสินค้าที่เลือกลงในตะกร้า
    const addToCartItems = () => {
        const selectedProducts = products.filter(product => document.getElementById(`checkbox-${product.id}`).checked);
        selectedProducts.forEach(product => {
            const cartItem = {
                id: `${product.id}-${Date.now()}`, product
            };
            cartItems.push(cartItem);
        });
        renderCart();
    };

    // ฟังก์ชันแสดงสินค้าที่อยู่ในตะกร้า
    const renderCart = () => {
        cart.innerHTML = ""; // รีเซ็ตข้อมูลการเพิ่มสินค้า
        cartItems.forEach((item) => {
            const li = document.createElement("li");

            const img = document.createElement("img");
            img.src = item.product.imageUrl;
            img.alt = item.product.name;
            img.classList.add("w-20", "h-auto");

            li.appendChild(img);
            li.appendChild(document.createTextNode(` ${item.product.name} - ${item.product.price}฿`));

            // สร้างปุ่มลบสินค้า
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Remove";
            deleteButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded-md", "hover:bg-red-600");
            deleteButton.onclick = () => {
                deleteFromCart(item.id);
            };

            li.appendChild(deleteButton);
            cart.appendChild(li);
        });
    };

    // ฟังก์ชันลบสินค้าจากตะกร้า
    const deleteFromCart = (id) => {
        cartItems = cartItems.filter(item => item.id !== id);
        renderCart();
    };

    // ฟังก์ชันแสดงข้อมูล
    const buyNowItems = () => {
        const total = cartItems.reduce((sum, item) => sum + item.product.price, 0); // คำนวณยอดรวม

        if (!sumTotal) {
            sumTotal = document.createElement('h1');
            sumTotal.classList.add("text-2xl", "font-bold", "mt-4");
            document.body.appendChild(sumTotal);
        }

        sumTotal.textContent = `Total Amount: ${total}฿`; // แสดงยอดรวม
    };

    // ฟังก์ชันที่ตรวจสอบเมื่อคลิกปุ่มสร้างสินค้าใหม่
    buttonCreate.addEventListener('click', () => {
        const name = inputName.value;
        const price = parseFloat(inputPrice.value);
        const imageUrl = inputUrl.value;

        if (name && !isNaN(price) && imageUrl) {
            const newProduct = {
                id: productId,
                name,
                price,
                imageUrl
            };
            products.push(newProduct);
            renderProduct(products);

            inputName.value = '';
            inputPrice.value = '';
            inputUrl.value = '';
        } else {
            alert("กรอกข้อมูลให้ครบ");
        }
    });

    addToCart.addEventListener('click', addToCartItems);
    buyNow.addEventListener('click', buyNowItems);
});
