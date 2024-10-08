import CustomButton from "../Button"; // Importing the CustomButton component to be used for rendering buttons
import insertIcon from "../../assets/Insert.svg"; // Importing the icon for the Insert action
import regenerateIcon from "../../assets/Regenerate.svg"; // Importing the icon for the Regenerate action
import generateIcon from "../../assets/Generate.svg"; // Importing the icon for the Generate action

// Actions component receives AI response and functions for generating and inserting responses
const Actions = ({
  aiResponse, // The response generated by the AI
  generateAIResponse, // Function to generate a new AI response
  insertResponse, // Function to insert the AI response
}: {
  aiResponse: string; // Type definition for aiResponse prop
  generateAIResponse: () => void; // Type definition for generateAIResponse prop
  insertResponse: () => void; // Type definition for insertResponse prop
}) => {
  return (
    <div className="flex justify-end gap-4"> {/* Flex container for aligning buttons to the right with spacing */}
      {aiResponse ? ( // Conditional rendering based on whether there is an AI response
        <>
          {/* Button to insert the AI response */}
          <CustomButton
            label="Insert" // Button label
            icon={insertIcon} // Icon for the button
            onClick={insertResponse} // Function to call when the button is clicked
            className="custom-button max-w-[129px] bg-white text-[#666d80]" // Custom styles for the button
          />
          {/* Button to regenerate the AI response */}
          <CustomButton
            label="Regenerate" // Button label
            icon={regenerateIcon} // Icon for the button
            onClick={generateAIResponse} // Function to call when the button is clicked
            disabled={true} // This button is disabled and cannot be clicked
            className="bg-blue-500 text-white" // Custom styles for the button
          />
        </>
      ) : ( // If there is no AI response
        // Button to generate the AI response
        <CustomButton
          label="Generate" // Button label
          icon={generateIcon} // Icon for the button
          onClick={generateAIResponse} // Function to call when the button is clicked
          className="bg-blue-500 text-white" // Custom styles for the button
        />
      )}
    </div>
  );
};

export default Actions; // Exporting the Actions component for use in other modules
