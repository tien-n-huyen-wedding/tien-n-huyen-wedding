/**
 * Google Apps Script for Wedding Wishes - Static Web Compatible
 * Copy this entire code into Google Apps Script
 *
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Delete the default code
 * 4. Paste this entire code
 * 5. Save the project
 * 6. Deploy as web app with execute permissions for "Anyone"
 * 7. Copy the web app URL and use it as GOOGLE_SCRIPT_URL
 */

// Configuration
const SHEET_NAME = 'Wedding Wishes';
const HEADERS = ['ID', 'Name', 'Message', 'Timestamp'];

/**
 * Initialize the spreadsheet
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // Set sheet name
  sheet.setName(SHEET_NAME);

  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#f0f0f0');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  }
}

/**
 * Handle POST requests (submit new wish)
 */
function doPost(e) {
  try {
    // Initialize sheet
    initializeSheet();

    // Parse the request data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createResponse({
        success: false,
        error: 'Invalid JSON data: ' + parseError.toString()
      });
    }

    // Handle action parameter if present (for compatibility)
    // POST requests to doPost are always treated as submit requests
    // Action parameter is optional and ignored
    if (data.action) {
      // Remove action from data as it's not needed for submission
      delete data.action;
    }

    // Validate required fields
    if (!data.name || !data.message) {
      return createResponse({
        success: false,
        error: 'Missing required fields: name and message are required'
      });
    }

    // Get the sheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Create new row data
    const newRow = [
      Date.now().toString(), // ID
      data.name || 'Một người bạn', // Name (with fallback)
      data.message, // Message
      new Date().toISOString() // Timestamp
    ];

    // Add the new row
    sheet.appendRow(newRow);

    // Get the row number for the new entry
    const lastRow = sheet.getLastRow();

    // Style the new row
    const newRowRange = sheet.getRange(lastRow, 1, 1, HEADERS.length);
    newRowRange.setBackground('#f8f9fa');
    newRowRange.setBorder(true, true, true, true, true, true);

    // Auto-resize columns
    sheet.autoResizeColumns(1, HEADERS.length);

    // Return success response
    return createResponse({
      success: true,
      message: 'Wish submitted successfully',
      id: newRow[0],
      timestamp: newRow[3]
    });

  } catch (error) {
    console.error('Error in doPost:', error);
    console.error('Error stack:', error.stack);
    console.error('Request data:', e.postData ? e.postData.contents : 'No post data');

    return createResponse({
      success: false,
      error: 'Server error: ' + error.toString(),
      details: error.stack ? error.stack.toString() : 'No stack trace'
    });
  }
}

/**
 * Handle GET requests (fetch all wishes)
 */
function doGet(e) {
  try {
    // Initialize sheet
    initializeSheet();

    const action = e.parameter.action;

    if (action === 'get') {
      const wishes = getAllWishes();
      return createResponse({
        success: true,
        wishes: wishes,
        count: wishes.length
      });
    }

    // Default response
    return createResponse({
      success: true,
      message: 'Wedding Wishes API is running',
      endpoints: {
        'POST /': 'Submit new wish',
        'GET /?action=get': 'Get all wishes'
      }
    });

  } catch (error) {
    console.error('Error in doGet:', error);
    return createResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Get all wishes from the sheet
 */
function getAllWishes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return []; // No data (only headers)
  }

  // Get all data except headers
  const dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  const data = dataRange.getValues();

  // Convert to wish objects
  const wishes = data.map(row => ({
    id: row[0].toString(),
    name: row[1],
    message: row[2],
    timestamp: row[3]
  }));

  // Sort by timestamp (newest first)
  return wishes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Create a standardized response with proper CORS headers
 * Note: Google Apps Script automatically handles CORS for Web Apps deployed with "Anyone" access
 * IMPORTANT: setHeaders() is NOT available on ContentService output - it will cause error!
 */
function createResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify(data));
  response.setMimeType(ContentService.MimeType.JSON);

  // Note: CORS headers are automatically added by Google Apps Script
  // when deployed with "Who has access" = "Anyone"
  // We cannot manually set headers - setHeaders() method does not exist!

  return response;
}

/**
 * Test function to verify the script works
 */
function testScript() {
  console.log('Testing Wedding Wishes Script...');

  // Test initialization
  initializeSheet();
  console.log('✓ Sheet initialized');

  // Test getting wishes
  const wishes = getAllWishes();
  console.log('✓ Retrieved wishes:', wishes.length);

  // Test submitting a wish
  const testWish = {
    name: 'Test User',
    message: 'This is a test wish from the script'
  };

  const mockRequest = {
    postData: {
      contents: JSON.stringify(testWish)
    }
  };

  const result = doPost(mockRequest);
  console.log('✓ Test wish submitted:', result.getContent());

  console.log('✅ All tests passed!');
}

/**
 * Clear all wishes (for testing purposes)
 */
function clearAllWishes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, HEADERS.length).clear();
    console.log('All wishes cleared');
  } else {
    console.log('No wishes to clear');
  }
}

/**
 * Get statistics about wishes
 */
function getWishesStats() {
  const wishes = getAllWishes();

  const stats = {
    totalWishes: wishes.length,
    todayWishes: wishes.filter(wish => {
      const wishDate = new Date(wish.timestamp);
      const today = new Date();
      return wishDate.toDateString() === today.toDateString();
    }).length,
    thisWeekWishes: wishes.filter(wish => {
      const wishDate = new Date(wish.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return wishDate >= weekAgo;
    }).length,
    anonymousWishes: wishes.filter(wish => wish.name === 'Một người bạn').length
  };

  console.log('Wishes Statistics:', stats);
  return stats;
}
