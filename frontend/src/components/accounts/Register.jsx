import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setSuccessMessage("Kayıt başarılı! Hesabınız oluşturuldu.");
        //form temizleme
        setFormData({
          username: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.log("Kullanıcı kayıt işlemi sırasında hata oluştu...");
      }
    } catch (error) {
      console.error("Sunucu Hatası !", error);
    }
  };
  return (
    <>
      <div className="account-column">
        <h2>Register</h2>
        {successMessage && (
          <div
            className="success-message"
            style={{
              position: "fixed",
              top: "20px", // Sayfanın üst kısmından 20px uzaklık
              left: "50%",
              transform: "translateX(-50%)", // Ortalamak
              backgroundColor: "#d4edda",
              color: "green",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "1px solid #c3e6cb",
              fontSize: "16px",
              fontWeight: "bold",
              zIndex: 1000, // Üstte olmasını sağlamak
            }}
          >
            {successMessage}
          </div> // Burada başarı mesajını gösteriyoruz
        )}
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <span>
                Username <span className="required">*</span>
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="username"
                required
              />
            </label>
          </div>
          <div>
            <label>
              <span>
                Email address <span className="required">*</span>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
              />
            </label>
          </div>
          <div>
            <label>
              <span>
                Password <span className="required">*</span>
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                required
              />
            </label>
          </div>
          <div className="privacy-policy-text remember">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <a href="#">privacy policy.</a>
            </p>
            <button className="btn btn-sm">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
