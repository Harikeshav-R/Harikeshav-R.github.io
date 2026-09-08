import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const el = document.getElementById("root")!;
const url = window.location.pathname + window.location.search;

const tree = (
  <StrictMode>
    <App url={url} />
  </StrictMode>
);

// Every route is prerendered, so the common path is hydration. createRoot is
// the fallback for a 404.html miss, where #root ships empty.
if (el.firstElementChild) hydrateRoot(el, tree);
else createRoot(el).render(tree);
