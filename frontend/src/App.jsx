import Brands from "./components/layout/brands/Brands";
import CampaingSingle from "./components/layout/campaing/CampaingSingle";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Policy from "./components/layout/policy/Policy";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Brands />
      <CampaingSingle />
      <Policy />
      <Footer />
    </>
  );
}

export default App;
