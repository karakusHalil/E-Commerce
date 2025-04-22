import CardForm from "../components/carts/CardForm";

function CardPage() {
  return (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="cart-page-wrapper">
            <CardForm />
            <div className="cart-collaterals">
              <div className="cart-totals">
                <h2>Cart totals</h2>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span id="subtotal">$316.00</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>
                        <ul>
                          <li>
                            <label>
                              Fast Cargo: $15.00
                              <input type="checkbox" id="fast-cargo" />
                            </label>
                          </li>
                          <li>
                            <a href="#">Change Address</a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>
                        <strong id="cart-total">$316.00</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="checkout">
                  <button className="btn btn-lg">Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardPage;
