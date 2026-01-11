import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReduxProvider from "./app/provider";
// ===== BASE =====
import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";

// ===== LAYOUT =====
import "./styles/layout/layout.css";
import "./styles/layout/header.css";
import "./styles/layout/footer.css";

// ===== COMPONENTS =====
import "./styles/components/card.css";
import "./styles/components/buttons.css";
import "./styles/components/cart.css";

// ===== PAGES =====
import "./styles/pages/home.css";
import "./styles/pages/product-list.css";
import "./styles/pages/product-details.css";
import "./styles/pages/cart.css";
import "./styles/pages/checkout.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
);
