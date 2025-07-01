import React from "react";
import { createRoot } from "react-dom/client";
import TestApp from "./TestApp";

// Initialize the app
function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  const root = createRoot(rootElement);
  root.render(<TestApp />);
  console.log("✓ Test app rendered successfully");
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}