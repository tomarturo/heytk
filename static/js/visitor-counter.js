// Visitor counter implementation
async function getMyVisitorNumber() {
    try {
      // Check if we already have a number in session storage
      const storedNumber = sessionStorage.getItem('visitorNumber');
      
      if (storedNumber) {
        displayVisitorNumber(storedNumber);
        return;
      }
      
      // If not, request a new number
      const response = await fetch('/api/visitor-number', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get visitor number');
      }
      
      const data = await response.json();
      
      // Store it for this session
      sessionStorage.setItem('visitorNumber', data.visitorNumber);
      displayVisitorNumber(data.visitorNumber);
      
    } catch (error) {
      console.error('Error fetching visitor number:', error);
      // Fallback for errors - show a placeholder
      displayVisitorNumber('?');
    }
  }
  
  // Display the visitor number with animation
  function displayVisitorNumber(number) {
    const visitorElement = document.getElementById('visitor-count');
    if (!visitorElement) return;
    
    // Add animation class
    visitorElement.classList.add('visitor-count-animate');
    visitorElement.textContent = number;
    
    // Remove animation class after animation completes
    setTimeout(() => {
      visitorElement.classList.remove('visitor-count-animate');
    }, 1000);
  }
  
  // Get current total visitor count
  async function getVisitorCount() {
    try {
      const response = await fetch('/api/visitor-count');
      
      if (!response.ok) {
        throw new Error('Failed to get visitor count');
      }
      
      const data = await response.json();
      
      // Display total count if element exists
      const totalElement = document.getElementById('total-visitors');
      if (totalElement) {
        totalElement.textContent = data.visitorCount;
      }
      
    } catch (error) {
      console.error('Error fetching total visitor count:', error);
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    getMyVisitorNumber();
    getVisitorCount(); // Optional: display total count if needed
  });