import React from "react";
import { createRoot } from "react-dom/client";

function TestApp() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>✓ OPPB Test App Working</h1>
      <p>If you can see this, React is loading correctly.</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<TestApp />);
  console.log("✓ Test app rendered successfully");
}