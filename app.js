// app.js

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para crear una tarjeta de producto
function createProductCard(product) {
    return `
        <div class="col-md-4 product-card">
            <div class="card">
                <img src="${product.imagen}" class="card-img-top product-img" alt="Imagen de la Bicicleta">
                <div class="card-body">
                    <h5 class="card-title">$${product.precio}</h5>
                    <p class="card-text">Número de Marco: ${product.numeroMarco}</p>
                    <p class="card-text">Número de Llanta: ${product.numeroLlanta}</p>
                    <p class="card-text">${product.descripcion}</p>
                    <p class="card-text">Disponible: ${product.disponible ? 'Sí' : 'No'}</p>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar los productos
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Obtener los productos desde Firestore
function getProducts() {
    db.collection('ciclas').get().then((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });
        displayProducts(products);
    });
}

// Llamar a la función para obtener los productos al cargar la página
document.addEventListener('DOMContentLoaded', getProducts);
