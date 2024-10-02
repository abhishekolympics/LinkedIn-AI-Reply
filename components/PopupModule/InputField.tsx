// Import necessary dependencies (not shown in the snippet)

// Functional component for user input
const UserInput = ({
  value, // The current value of the input field
  onChange, // Function to handle changes in the input field
}: {
  value: string; // Type definition for the input value as a string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Type definition for the onChange function
}) => {
  return (
    <input
      // Input field styling with Tailwind CSS classes
      className="w-full max-w-[818px] max-h-[61px] p-3 rounded-lg mb-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder="Your Prompt" // Placeholder text displayed when input is empty
      value={value} // Controlled component value, reflects the current state
      onChange={onChange} // Event handler called when the input value changes
      aria-label="User Prompt" // Accessibility label for screen readers
    />
  );
};

// Exporting the UserInput component for use in other modules
export default UserInput;
