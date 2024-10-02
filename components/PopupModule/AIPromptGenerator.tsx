import React, { useState } from "react";
import AiResponseDisplay from "./ResponseViewer"; // Component to display AI response and user prompt
import UserInput from "./InputField"; // Component for user input field
import Actions from "./Actions"; // Component for buttons or actions

// Interface defining props for AIPopup component
interface AIPopupProps {
  popupManager: () => void; // Function to close the popup when called
}

const AIPopup: React.FC<AIPopupProps> = ({ popupManager }) => {
  // Pre-defined AI response (can be replaced with API integration later)
  const staticAIResponse =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  // State variables to manage user input, AI response, and internal prompt
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  // Function to generate AI response based on user input
  const generateAIResponse = () => {
    if (!inputValue) return; // Early return if no input is provided

    // Update user prompt with current input and clear input field
    setUserPrompt(inputValue);
    setInputValue("");

    // Set the static AI response for now (replace with API call later)
    setAIResponse(staticAIResponse);
  };

  // Function to insert AI response into target DOM element
  const insertResponse = () => {
    // Access DOM elements using refs or document.querySelector (consider using refs for better control)
    const messageInput = document.querySelector("div.msg-form__contenteditable p");
    const inputContainer = document.querySelector("div.msg-form__contenteditable");
    const placeholderElement = document.querySelector("div.msg-form__placeholder");

    if (messageInput && inputContainer) {
      // Set AI response in the message input field
      messageInput.innerHTML = aiResponse;

      // Update accessibility attributes
      inputContainer.setAttribute("aria-label", "");
      placeholderElement?.setAttribute("aria-hidden", "false");
      placeholderElement?.setAttribute("data-placeholder", "");

      // Clear inputs and close popup after successful insertion
      setUserPrompt("");
      setAIResponse("");
      setInputValue("");
      popupManager();
    } else {
      console.error("One or more elements not found:", { messageInput, inputContainer, placeholderElement });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={popupManager} // Close the popup on outside click
      role="dialog"
      aria-labelledby="ai-popup"
    >
      <div
        className="absolute w-[500px] overflow-hidden bg-white shadow-lg p-4 gap-4 rounded-xl z-50"
        style={{ top: "210px", right: "310px" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner div click
      >
        {/* Conditionally render AiResponseDisplay component */}
        {userPrompt && <AiResponseDisplay userPrompt={userPrompt} aiResponse={aiResponse} />}

        {/* User input field component */}
        <UserInput value={inputValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />

        {/* Actions component for buttons or actions (consider passing additional props for customization) */}
        <Actions aiResponse={aiResponse} generateAIResponse={generateAIResponse} insertResponse={insertResponse} />
      </div>
    </div>
  );
};

export default AIPopup;