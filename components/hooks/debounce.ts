// Debounce function to limit how often a function can be executed
// It ensures that the function is only called after a specified delay 
// and won't be called again if it's triggered multiple times in rapid succession
export const debounce = (func: () => void, delay: number) => {
  
  // Variable to store the ID of the timeout, so it can be cleared if needed
  let timeoutId: NodeJS.Timeout;

  // Returning a new function that wraps the original function with the debounce logic
  return () => {
    
    // If a timeout is already set, clear it to reset the delay
    clearTimeout(timeoutId);

    // Set a new timeout that will call the original function after the specified delay
    // This ensures that the function is only executed after the delay period has passed
    timeoutId = setTimeout(func, delay);
  };
};
