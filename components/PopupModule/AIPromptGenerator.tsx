import React, { useState } from "react"; // Importing React and useState hook for managing state
import AiResponseDisplay from "./ResponseViewer"; // Importing the component for displaying AI responses
import UserInput from "./InputField"; // Importing the component for user input
import Actions from "./Actions"; // Importing the component for action buttons

// Interface to define the props for the AIPopup component
interface AIPopupProps {
  popupManager: () => void; // Function to close the popup
}

// Functional component for the AI Popup
const AIPopup: React.FC<AIPopupProps> = ({ popupManager }) => {
  // Static AI response message
  const staticAIResponse =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  
  // State hooks for managing user input and AI response
  const [userPrompt, setUserPrompt] = useState<string>(""); // User's prompt for AI
  const [aiResponse, setAIResponse] = useState<string>(""); // AI's generated response
  const [inputValue, setInputValue] = useState<string>(""); // Current value of the input field

  // Function to generate AI response based on user input
  const generateAIResponse = () => {
    if (!inputValue) return; // Exit if input value is empty
    setUserPrompt(inputValue); // Set the user prompt state
    setInputValue(""); // Clear the input field
    setAIResponse(staticAIResponse); // Set the AI response to the static response
  };

  // Function to insert the AI response into the message input field
  const insertResponse = () => {
    // Accessing necessary DOM elements for manipulation
    const messageInput = document.querySelector("div.msg-form__contenteditable p");
    const inputContainer = document.querySelector("div.msg-form__contenteditable");
    const placeholderElement = document.querySelector("div.msg-form__placeholder");

    // Check if the required elements are found in the DOM
    if (messageInput && inputContainer) {
      messageInput.innerHTML = aiResponse; // Insert AI response into the message input
      inputContainer.setAttribute("aria-label", ""); // Update accessibility attributes
      placeholderElement?.setAttribute("aria-hidden", "false"); // Show placeholder
      placeholderElement?.setAttribute("data-placeholder", ""); // Clear placeholder data

      // Clear state variables and close popup after inserting the response
      setUserPrompt("");
      setAIResponse("");
      setInputValue("");
      popupManager(); // Call function to close the popup
    } else {
      // Log an error if any elements are not found
      console.error("One or more elements not found:", { messageInput, inputContainer, placeholderElement });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Overlay for the popup background
      onClick={popupManager} // Close the popup when clicking outside
      role="dialog" // Accessibility role for dialog
      aria-labelledby="ai-popup" // Accessibility label for the popup
    >
      <div
        className="absolute w-[500px] overflow-hidden bg-white shadow-lg p-4 gap-4 rounded-xl z-50" // Popup styling
        style={{ top: "210px", right: "310px" }} // Positioning of the popup
        onClick={(e) => e.stopPropagation()} // Prevent closing the popup when clicking inside
      >
        {/* Display AI response if there is a user prompt */}
        {userPrompt && <AiResponseDisplay userPrompt={userPrompt} aiResponse={aiResponse} />}
        
        {/* User input field for entering prompts */}
        <UserInput
          value={inputValue} // Value of the input field
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => // Change event handler for the input field
            setInputValue(e.target.value) // Update input value state
          }
        />
        
        {/* Action buttons for inserting and generating responses */}
        <Actions
          aiResponse={aiResponse} // Pass the AI response to the Actions component
          generateAIResponse={generateAIResponse} // Function to generate AI response
          insertResponse={insertResponse} // Function to insert AI response into the message input
        />
      </div>
    </div>
  );
};

export default AIPopup; // Exporting the AIPopup component for use in other modules
