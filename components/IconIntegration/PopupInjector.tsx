import { createRoot, Root } from "react-dom/client"; // Importing React's DOM rendering capabilities
import AiButton from "./IconAI"; // Importing the AI button component
import { debounce } from "../hooks/debounce"; // Importing the debounce function to limit execution frequency
import { handleInputFocus, handleInputBlur, handleIconMouseDown, handleIconClick } from "../handlers/aiButtonHandlers"; // Importing handler functions for the AI button actions

// Function to inject AI button into the LinkedIn message input
const injectAiButton = () => {
  // Creating a container for the popup and icon elements
  const popupContainer = document.createElement("div"); // Popup container for the AI feature
  const iconContainer = document.createElement("div"); // Icon container for the AI button
  iconContainer.id = "ai-icon"; // Assigning an ID for the icon container

  // Variables to manage the state of the popup and icon
  let popupRoot: Root | null = null; // Root for rendering the popup
  let iconRoot: Root | null = null; // Root for rendering the AI button
  let isPopupOpen = false; // Tracks if the popup is currently open
  let isIconClicked = false; // Tracks if the icon was clicked

  // Function to add the AI button to the LinkedIn message input area
  const addAiButton = () => {
    // Selecting the message input area using a query selector
    const messageInput = document.querySelector<HTMLDivElement>(
      "div.msg-form__contenteditable" // The specific class for the LinkedIn message input
    );

    // Check if the message input exists and if the AI icon is not already added
    if (messageInput && !document.getElementById("ai-icon")) {
      // Check if the icon root has not been created yet
      if (!iconRoot) {
        iconRoot = createRoot(iconContainer); // Create a root for the icon container
        iconRoot.render(
          <AiButton 
            onMouseDown={() => handleIconMouseDown(isIconClicked)} // Event handler for mouse down action
            onClick={() => handleIconClick(isPopupOpen, popupContainer, popupRoot, iconContainer)} // Event handler for icon click
          />
        );
      }

      // Attach event listeners for focusing and blurring the message input
      messageInput.addEventListener("focus", () => handleInputFocus(iconContainer)); // Show icon on focus
      messageInput.addEventListener("blur", () => handleInputBlur(isPopupOpen, isIconClicked, iconContainer)); // Hide icon on blur
    }
  };

  // Debounce the addAiButton function to prevent excessive calls when the DOM changes rapidly
  const debouncedAddAiButton = debounce(addAiButton, 300); // Wait for 300ms after the last call

  // Set up a MutationObserver to watch for changes in the DOM and call addAiButton
  const observer = new MutationObserver(debouncedAddAiButton); // Create a new observer with the debounced function
  observer.observe(document.body, { // Observe changes in the document body
    childList: true, // Observe direct children
    subtree: true, // Observe all descendants
  });

  // Initial call to add the AI button
  addAiButton(); // Execute the function to add the button on script load

  // Cleanup function to disconnect the observer and remove created elements
  return () => {
    observer.disconnect(); // Stop observing DOM changes
    popupRoot?.unmount(); // Unmount the popup root if it exists
    iconRoot?.unmount(); // Unmount the icon root if it exists
    popupContainer.remove(); // Remove the popup container from the DOM
    iconContainer.remove(); // Remove the icon container from the DOM
  };
};

export default injectAiButton; // Export the function for use in other modules
