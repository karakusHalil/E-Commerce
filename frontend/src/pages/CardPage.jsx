import CardForm from "../components/carts/CardForm";
import CardTotal from "../components/carts/CardTotal";

function CardPage() {
  return (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="cart-page-wrapper">
            <CardForm />
            <CardTotal />
          </div>
        </div>
      </section>
    </>
  );
}

export default CardPage;
