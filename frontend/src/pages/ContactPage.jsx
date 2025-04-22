import ContactBottom from "../components/contacts/ContactBottom";
import ContactTop from "../components/contacts/ContactTop";

function ContactPage() {
  return (
    <>
      <section className="contact">
        <div className="contact-top">
          <ContactTop />
        </div>
        <ContactBottom />
      </section>
    </>
  );
}

export default ContactPage;
