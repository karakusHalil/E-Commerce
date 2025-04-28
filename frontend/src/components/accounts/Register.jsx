import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <span>
                Username <span className="required">*</span>
              </span>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                autocomplete="username"
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
                onChange={handleInputChange}
                autocomplete="email"
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
                onChange={handleInputChange}
                autocomplete="new-password"
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
