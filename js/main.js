/* ==========================================================================
   KOSYAK — main.js
   Рендерит каталог и карточку товара на основе products.js.
   Редактировать этот файл не нужно — только products.js.
   ========================================================================== */

function money(price) {
  return price;
}

function renderGrid(container, products) {
  if (!products.length) {
    container.innerHTML = '<p class="empty-state">Пока нет товаров. Добавь их в js/products.js</p>';
    return;
  }

  container.innerHTML = products.map(function (p) {
    return (
      '<a class="product-card" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
        '<figure><img src="' + p.image + '" alt="' + p.name + '" loading="lazy" draggable="false"></figure>' +
        '<figcaption>' +
          '<span class="product-name">' + p.name + '</span>' +
          '<span class="product-price">' + money(p.price) + '</span>' +
        '</figcaption>' +
      '</a>'
    );
  }).join('');
}

function renderProductDetail(container) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(function (p) { return p.id === id; });

  if (!product) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<p>Товар не найден.</p>' +
        '<a class="btn-ghost" href="index.html">Назад в магазин</a>' +
      '</div>';
    document.title = "Товар не найден — KOSYAK";
    return;
  }

  document.title = product.name + " — KOSYAK";

  container.innerHTML =
    '<figure><img src="' + product.image + '" alt="' + product.name + '" draggable="false"></figure>' +
    '<div class="product-detail-info">' +
      '<h1 class="display">' + product.name + '</h1>' +
      '<p class="product-detail-price">' + money(product.price) + '</p>' +
      '<p class="product-detail-desc">' + product.description + '</p>' +
      '<p class="product-detail-meta">' + product.meta + '</p>' +
      '<a class="btn" href="contact.html">Написать, чтобы купить</a>' +
      '<br><a class="back-link" href="index.html">← Все футболки</a>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('[data-grid]');
  if (grid) renderGrid(grid, PRODUCTS);

  const detail = document.querySelector('[data-product-detail]');
  if (detail) renderProductDetail(detail);
});
