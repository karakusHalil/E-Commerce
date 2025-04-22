import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

function ContactElement() {
  return (
    <>
      <div className="contact-elements">
        <ContactForm />
        <ContactInfo />
      </div>
    </>
  );
}

export default ContactElement;
