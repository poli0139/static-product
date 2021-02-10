const url = "https://kea-alt-del.dk/t7/api/products";
//fetch the data
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  //console.log(data);
  data.forEach(showProduct);
}
/*
<article class="product" >
          <div class="image"><img
            src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
            alt="t-shirt"
          /></div>
          <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
          <p class="subtle">Men | T-shirt</p>
          <p class="price">DKK 895,-</p>
          <p class="sign">-25%</p>
          <p class="discount">DKK 800</p>
          <div class="link"><a href="product.html">Go to product</a></div>
          </article>
*/
function showProduct(product) {
  console.log(product);
  //grab the template
  const template = document.querySelector("#productTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.gender} | ${product.articletype}`;

  copy.querySelector("h3").textContent = product.productdisplayname;

  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("img").alt = product.articletype;

  copy.querySelector(".price").textContent = `DKK ${product.price},-`;

  if (product.soldout) {
    copy.querySelector(".product").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector(".product").classList.add("onSale");
  }
  //grab parent
  const parent = document.querySelector(".productList");
  //append
  parent.appendChild(copy);
}
