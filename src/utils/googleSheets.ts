export interface WishData {
  name: string;
  message: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

// Google Apps Script Web App URL
// IMPORTANT: This must be a Web App URL, not a Library URL!
// Format: https://script.google.com/macros/s/[SCRIPT_ID]/exec
// Get the correct URL from: Deploy > Manage deployments > Copy Web app URL
// Make sure "Who has access" = "Anyone" for CORS to work
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPd6S9fDQ4FOVzWT0cFVyJHrx0oEGAPCsxztNOOoL8f4Q6xUq4sVu7F7_mIzZ0X4xG-Q/exec";

export async function submitWish(wishData: WishData): Promise<Wish> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(wishData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result;
    try {
      const text = await response.text();
      result = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid response from server');
    }

    if (!result.success) {
      console.error('Server returned error:', result.error, result);
      throw new Error(result.error || 'Failed to submit wish');
    }

    // Return the created wish object
    return {
      id: Date.now().toString(),
      name: wishData.name,
      message: wishData.message,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error submitting wish:', error);
    console.warn('Falling back to mock submission due to fetch error');
    // Return mock wish on error to prevent breaking the UI
    return {
      id: Date.now().toString(),
      name: wishData.name,
      message: wishData.message,
      timestamp: new Date().toISOString()
    };
  }
}

export async function fetchWishes(): Promise<Wish[]> {
  try {
    // Use GET endpoint with action parameter
    const getUrl = GOOGLE_SCRIPT_URL.replace('/exec', '/exec?action=get');

    const response = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result;
    try {
      const text = await response.text();
      result = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid response from server');
    }

    if (!result.success) {
      console.error('Server returned error:', result.error, result);
      throw new Error(result.error || 'Failed to fetch wishes');
    }

    return result.wishes || [];
  } catch (error) {
    console.error('Error fetching wishes:', error);
    // Return mock data on error to prevent breaking the UI
    console.warn('Falling back to mock wishes due to fetch error');
    return mockWishes;
  }
}

// Fallback data for development/testing
export const mockWishes: Wish[] = [];
