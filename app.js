document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.grid-item-container');

    // SVG Icons
    const addToCartIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
            <g fill="#C73B0F" clip-path="url(#a)">
                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
            </g>
            <defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs>
        </svg>
    `;

    const incrementIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 10 2">
            <path d="M0 .375h10v1.25H0V.375Z"/>
        </svg>
    `;

    const decrementIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 10 10">
            <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
        </svg>
    `;

    const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 10 10"><path  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>`;

    //PRODUCTS
    const products = [{
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        }, "name": "Waffle with Berries", "category": "Waffle", "price": 6.50
    }, {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        }, "name": "Vanilla Bean Crème Brûlée", "category": "Crème Brûlée", "price": 7.00
    }, {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        }, "name": "Macaron Mix of Five", "category": "Macaron", "price": 8.00
    }, {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        }, "name": "Classic Tiramisu", "category": "Tiramisu", "price": 5.50
    }, {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        }, "name": "Pistachio Baklava", "category": "Baklava", "price": 4.00
    }, {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        }, "name": "Lemon Meringue Pie", "category": "Pie", "price": 5.00
    }, {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        }, "name": "Red Velvet Cake", "category": "Cake", "price": 4.50
    }, {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        }, "name": "Salted Caramel Brownie", "category": "Brownie", "price": 4.50
    }, {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        }, "name": "Vanilla Panna Cotta", "category": "Panna Cotta", "price": 6.50
    }];

    //ITEMS
    cart = {
        items: [], totalCount: 0, addItem(product) {
            this.items.push({ ...product, quantity: 1, totalAmount: parseInt(product.price) });
            this.totalCount++;
            this.updateCartUi();
        },

        updateCartUi() {
            const cartContainer = document.getElementById('svgContainer');
            const orderCounter = document.getElementById('order-length');
            const foodItemContents = document.querySelector('.food_item-contents');
            const totalOrderAmount = document.getElementById('total_amount_orderBig');
            const confTotalPrice = document.getElementById('conf_total');

            const totalCartAmount = this.items.reduce((total, item) => total + item.totalAmount, 0);
            orderCounter.textContent = this.totalCount;
            totalOrderAmount.innerHTML = `$${totalCartAmount.toFixed(2)}`;
            confTotalPrice.innerHTML = `$${totalCartAmount.toFixed(2)}`;


            cartContainer.innerHTML = this.items
                .map(item => `
                    <div class="content-container" data-name="${item.name}">
                        <div>
                        <span class="remove-icon">${removeIcon}</span>
                            <h1>${item.name}</h1>
                           <div class="price-quantity">
                           <p class="total"><span> ${item.quantity}x</span></p>
                             <p> <span>@ $${item.price.toFixed(2)}</span></p>
                             <p> <span class="totalprice">$${item.totalAmount.toFixed(2)}</span></p>
                           </div>
                        </div>
                    </div>
                `)
                .join('');

            foodItemContents.innerHTML = this.items
                .map(item => `
                    <div class="conf_item-container" data-name="${item.name}">

                        <img class="conf_img" src=${item.image.thumbnail} alt=${item.name}/>
                  
                        <div class="conf_text_content">
                            <h1>${item.name}</h1>
                           <div class="price-quantity_conf">
                           <p class="total"><span> ${item.quantity}x</span></p>
                             <p class="total_price_conf"> <span>@ $${item.price.toFixed(2)}</span></p>
                           </div>
                        </div>
                            <div class="total__price">
                                <p> <span class="totalprice">$${item.totalAmount.toFixed(2)}</span></p>
                            </div>
                    </div>
                `).join('');

            const removeItem = document.querySelectorAll('.remove-icon');
            removeItem.forEach(removeButton => {
                removeButton.addEventListener('click', () => {
                    const productName = removeButton.closest('.content-container').dataset.name;
                    const newArr = this.items.filter(item => item.name !== productName);
                    this.updateQuantity(productName, 'resetQuantity');
                    this.resetProduct(productName, 'resetProduct');
                    this.resetProduct(productName, 'resetActiveState');
                    this.items = newArr;
                    this.updateCartUi();
                });
            });


            const yourCartImg = document.querySelector('.img-container-sidebar').querySelector('#svg');
            const sidebarNotif = document.getElementById('sidebar-notif');
            const confirmOrder = document.getElementById('order_total');
            this.totalCount !== 0 ? sidebarNotif.style.display = 'none' : sidebarNotif.style.display = 'flex';
            this.totalCount !== 0 ? yourCartImg.style.display = 'none' : yourCartImg.style.display = 'flex';
            this.totalCount !== 0 ? confirmOrder.style.display = 'block' : confirmOrder.style.display = 'none';
        }, updateQuantity(productName, change) {
            const item = this.items.find(item => item.name === productName);
            if (!item) return;


            if (change === 'resetActiveState') {
                const removeStateElement = document.getElementById(productName).querySelector('.img-button');
                removeStateElement.classList.contains('active') && removeStateElement.classList.remove('active');

            }

            if (change === 'decrement') {
                item.quantity--;
                this.totalCount--;
                item.totalAmount = item.totalAmount - item.price;
                if (item.quantity <= 0) {
                    this.items = this.items.filter(i => i.name !== productName);
                }
            }

            if (change === 'increment') {
                item.quantity++;
                this.totalCount++;
                item.totalAmount = item.totalAmount + item.price;
            }
            if (change === 'resetQuantity') {
                this.items = this.items.filter(i => i.name === productName);
                this.totalCount -= item.quantity;
                item.quantity = 0;
            }

            this.updateCartUi();
        }, resetProduct(product, state) {
            const productContainer = document.getElementById(product);

            if (state === 'resetProduct') {
                const incrementDecrement = productContainer.querySelector('.btn-increment-decrement');
                const count = incrementDecrement.querySelector('.count');
                count.textContent = 1;
                incrementDecrement.style.display = 'none';
            }

            if (state === 'resetActiveState') {
                const resetElementState = productContainer.querySelector('.img-button');
                resetElementState.classList.contains('active') && resetElementState.classList.remove('active');
            }

        },
        startNewOrder() {
            const showPopUp = document.getElementById('popup_container');
            const resetCartImgState = document.querySelectorAll('.img-button');
            const resetCartCount = document.querySelectorAll('.count');
            const incrementDecrement = document.querySelectorAll('.btn-increment-decrement');
            this.items = [];
            this.totalCount = 0;
            this.updateCartUi();
            showPopUp.style.display = 'none';
            resetCartCount.forEach(item => item.innerHTML = 1);
            resetCartImgState.forEach(item => item.classList.contains('active') && item.classList.remove('active'));
            incrementDecrement.forEach(item => item.style.display = 'none');
        }


    };


    // render the images , my code also wkwkwk
    function renderProducts() {
        products.forEach(product => {
            const productHTML = `
                <div class="product-wrapper" id="${product.name}" data-name="${product.name}">
                    <div class="img-button">
                        <img class="product-mobile" src="${product.image.mobile}" alt={product.name} />
                        <img class="product-tablet" src="${product.image.tablet}" />
                        <img class="product-desktop" src="${product.image.desktop}" />
                        <button class="btn-add-to-cart">${addToCartIcon} Add to Cart</button>

                     <button class="btn-increment-decrement"> 
                        <span class="decrement">${incrementIcon}</span>
                        <span class="count">${1}</span>
                        <span class="increment">${decrementIcon}</span>
                      </button>

                    </div>
            
                    <div class="name-price-categ">
                        <p class="categ">${product.category}</p>
                        <h3 class="name">${product.name}</h3>
                        <span class="price">$${product.price.toFixed(2)}</span>
                    </div>
                </div>
            `;
            imageContainer.insertAdjacentHTML('beforeend', productHTML);
        });
        //second call the events
        setUpEventListeners();
    }

    function setUpEventListeners() {
        const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
        const decrement = document.querySelectorAll('.decrement');
        const increment = document.querySelectorAll('.increment');
        const confirmButton = document.getElementById('conf_button');
        const startNewOrder = document.getElementById('start_new-order');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productElement = this.closest('.product-wrapper');
                const activeProduct = productElement.querySelector('.img-button');
                const quantityContols = this.nextElementSibling;

                activeProduct.classList.add('active');
                const item = products.find(item => item.name === productElement.dataset.name);
                quantityContols.style.display = 'flex';

                cart.addItem(item);
            });
        });

        decrement.forEach(button => {
            const productName = button.closest('.product-wrapper').dataset.name;
            const incrementDecrmentBtn = button.closest('.btn-increment-decrement');
            const quantity = button.nextElementSibling;


            button.addEventListener('click', () => {
                if (!productName) return;

                let quantityCount = parseInt(quantity.innerHTML);

                if (quantityCount > 1) {
                    quantityCount--;
                    quantity.innerHTML = quantityCount;
                    cart.updateQuantity(productName, 'decrement');
                } else {
                    incrementDecrmentBtn.style.display = 'none';
                    quantityCount = 1;
                    quantity.innerHTML = quantityCount;
                    cart.updateQuantity(productName, 'resetActiveState');
                    cart.updateQuantity(productName, 'decrement');

                }
            });

        });
        increment.forEach(button => {
            const productName = button.closest('.product-wrapper').dataset.name;
            const quantity = button.previousElementSibling;


            button.addEventListener('click', () => {
                if (productName) {
                    let quantityCount = parseInt(quantity.innerHTML);
                    quantityCount++;
                    quantity.innerHTML = quantityCount;
                    cart.updateQuantity(productName, 'increment');
                }
            });
        });
        confirmButton.addEventListener('click', () => {
            const showPopUp = document.getElementById('popup_container');
            showPopUp.style.display = 'flex';
        });


        startNewOrder.addEventListener('click', () => {
            cart.startNewOrder();
        });

    }


    renderProducts();
});
