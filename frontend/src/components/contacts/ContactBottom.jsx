import ContactElement from "./ContactElement";
import ContactTitle from "./ContactTitle";

function ContactBottom() {
  return (
    <>
      <div className="contact-bottom">
        <div className="container">
          <ContactTitle />
          <ContactElement />
        </div>
      </div>
    </>
  );
}

export default ContactBottom;
