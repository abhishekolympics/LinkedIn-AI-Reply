import { Root, createRoot } from "react-dom/client"; // Importing necessary React DOM utilities for rendering
import AIPopup from "../PopupModule/AIPromptGenerator"; // Importing the AI Popup component for the extension

// Function to handle when the input field is focused
export const handleInputFocus = (iconContainer: HTMLDivElement) => {
  // Selecting the LinkedIn message input field using its class
  const messageInput = document.querySelector<HTMLDivElement>(
    "div.msg-form__contenteditable"
  );

  // If the input field exists and the AI icon hasn't been added yet
  if (messageInput && !document.getElementById("ai-icon")) {
    messageInput.parentNode?.appendChild(iconContainer); // Append the AI icon container to the parent node of the message input
  }

  // Make sure the AI icon is visible when the input field is focused
  iconContainer.style.display = "block";
};

// Function to handle when the input field loses focus (blur event)
export const handleInputBlur = (
  isPopupOpen: boolean, // Indicates if the popup is currently open
  isIconClicked: boolean, // Tracks if the AI icon was clicked
  iconContainer: HTMLDivElement // The AI icon container element
) => {
  setTimeout(() => {
    // Delay execution to handle focus transitions
    // If the popup is not open and the icon wasn't clicked, hide the icon
    if (!isPopupOpen && !isIconClicked) {
      iconContainer.style.display = "none"; // Hide the AI icon container
    }
    isIconClicked = false; // Reset the click state after handling the blur event
  }, 100); // Delay of 100ms to allow for any potential focus transitions
};

// Function to handle mouse down on the AI icon (before click)
export const handleIconMouseDown = (isIconClicked: boolean) => {
  isIconClicked = true; // Set the clicked state to true when the icon is pressed
};

// Function to handle when the AI icon is clicked
export const handleIconClick = (
  isPopupOpen: boolean, // Tracks whether the popup is currently open
  popupContainer: HTMLDivElement, // The container element for the popup
  popupRoot: Root | null, // React Root used to render the popup
  iconContainer: HTMLDivElement // The AI icon container element
) => {
  // If the popup is not already open
  if (!isPopupOpen) {
    isPopupOpen = true; // Set popup open state to true
    document.body.appendChild(popupContainer); // Append the popup container to the body of the document
    popupRoot = createRoot(popupContainer); // Create a React root for rendering the popup

    // Function to manage closing the popup
    const popupManager = () => {
      isPopupOpen = false; // Close the popup by updating the state
      popupRoot?.unmount(); // Unmount (remove) the popup from the React root
      document.body.removeChild(popupContainer); // Remove the popup container from the DOM
      // iconContainer.style.display = "block"; // Show the icon again (this line is commented out)
    };

    // Render the AI popup component into the popup container with the popup manager function
    popupRoot.render(<AIPopup popupManager={popupManager} />);
    iconContainer.style.display = "none"; // Hide the AI icon while the popup is open
  }
};
