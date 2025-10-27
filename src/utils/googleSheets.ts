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

// Hardcoded Google Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8Pcu5gO8AHK9e4zKcXOXFLcQ59gjWgMnKCu6i1_kM5HHUKmAX1wmg4Xb5GW2jLIn-VA/exec";

export async function submitWish(wishData: WishData): Promise<Wish> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
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
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
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
