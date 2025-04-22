import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import SiteLayout from "./layouts/SiteLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteLayout>
      <App />
    </SiteLayout>
  </StrictMode>
);
