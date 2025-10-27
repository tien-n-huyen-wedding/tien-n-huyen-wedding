/**
 * Test script for Google Apps Script API
 * Run this with: node test-google-script.js
 *
 * Make sure to update the SCRIPT_URL below
 */

const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

async function testAPI() {
  console.log('🧪 Testing Google Apps Script API...\n');

  try {
    // Test 1: Check if API is running
    console.log('1️⃣ Testing API availability...');
    const healthResponse = await fetch(SCRIPT_URL);
    const healthData = await healthResponse.json();
    console.log('✅ API Response:', healthData);

    // Test 2: Submit a test wish
    console.log('\n2️⃣ Testing wish submission...');
    const testWish = {
      name: 'Test User',
      message: 'This is a test wish from Node.js script'
    };

    const submitResponse = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testWish)
    });

    const submitData = await submitResponse.json();
    console.log('✅ Submit Response:', submitData);

    // Test 3: Get all wishes
    console.log('\n3️⃣ Testing wish retrieval...');
    const getResponse = await fetch(`${SCRIPT_URL}?action=get`);
    const getData = await getResponse.json();
    console.log('✅ Get Response:', getData);

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testAPI();
