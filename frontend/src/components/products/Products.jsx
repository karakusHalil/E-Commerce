function Products() {
  return (
    <>
      <div>
        <section classname="products">
          <div classname="container">
            <div classname="section-title">
              <h2>Featured Products</h2>
              <p>Summer Collection New Morden Design</p>
            </div>
            <div classname="product-wrapper product-carousel">
              <div classname="glide__track" data-glide-el="track">
                <ul classname="product-list glide__slides" id="product-list">
                  <li className="product-item glide__slide">
                    <div className="product-image">
                      <a href="#">
                        <img
                          src="${item.img.singleImage}"
                          alt
                          className="img1"
                        />
                        <img src="${item.img.thumbs[1]}" alt className="img2" />
                      </a>
                    </div>
                    <div className="product-info">
                      <a href="$" className="product-title">
                        ${"{"}item.name{"}"}
                      </a>
                      <ul className="product-star">
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-half" />
                        </li>
                      </ul>
                      <div className="product-prices">
                        <strong className="new-price">
                          $${"{"}item.price.newPrice.toFixed(2){"}"}
                        </strong>
                        <span className="old-price">
                          $${"{"}item.price.oldPrice.toFixed(2){"}"}
                        </span>
                      </div>
                      <span className="product-discount">
                        -${"{"}item.discount{"}"}%
                      </span>
                      <div className="product-links">
                        <button className="add-to-cart" data-id="${item.id}">
                          <i className="bi bi-basket-fill" />
                        </button>
                        <button>
                          <i className="bi bi-heart-fill" />
                        </button>
                        <a
                          href="#"
                          className="product-link"
                          data-id="${item.id}"
                        >
                          <i className="bi bi-eye-fill" />
                        </a>
                        <a href="#">
                          <i className="bi bi-share-fill" />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div classname="glide__arrows" data-glide-el="controls">
                <button
                  classname="glide__arrow glide__arrow--left"
                  data-glide-dir="<"
                >
                  <i classname="bi bi-chevron-left"></i>
                </button>
                <i classname="bi bi-chevron-left">
                  <button
                    classname="glide__arrow glide__arrow--right"
                    data-glide-dir=">"
                  >
                    <i classname="bi bi-chevron-right"></i>
                  </button>
                  <i classname="bi bi-chevron-right"></i>
                </i>
              </div>
              <i classname="bi bi-chevron-left">
                <i classname="bi bi-chevron-right"></i>
              </i>
            </div>
            <i classname="bi bi-chevron-left">
              <i classname="bi bi-chevron-right"></i>
            </i>
          </div>
          <i classname="bi bi-chevron-left">
            <i classname="bi bi-chevron-right"></i>
          </i>
        </section>
        <i classname="bi bi-chevron-left">
          <i classname="bi bi-chevron-right"></i>
        </i>
      </div>
    </>
  );
}

export default Products;
