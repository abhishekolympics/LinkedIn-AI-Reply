import injectAiButton from "../components/IconIntegration/PopupInjector";
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ["*://*.google.com/*", "*://*.linkedin.com/*"],
  main() {
    injectAiButton();
  },
});
