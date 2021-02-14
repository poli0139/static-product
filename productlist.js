const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("brandname");
console.log(brandname);

const url = "https://kea-alt-del.dk/t7/api/products?brandname=" + brandname;
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

  copy.querySelector("a").href = `product.html?id=${product.id}`;
  document.querySelector(".category").textContent = brandname;

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
