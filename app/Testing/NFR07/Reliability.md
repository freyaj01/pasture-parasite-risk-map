### NFR07 – Reliability (API Error Handling)

**Test Case:**  
API Error Handling  

**Requirement:**  
The system must handle external API failures gracefully and provide clear feedback to the user.


**Test Steps:**
1. Open the map  
2. Turn off internet connection  
3. Select a location  
4. Open the rainfall section  


**Expected Result:**  
A clear error message should be displayed when data cannot be fetched.


**Actual Result (Initial):**  
No message was shown and the section appeared blank.


**Outcome (Initial):**  
FAIL  


**Fix Applied:**  
Error handling was implemented to detect when data cannot be retrieved from the API and display a user-friendly error message.


**Actual Result (After Fix):**  
A clear error message is now displayed when data cannot be fetched.


**Outcome (Final):**  
PASS  


**Evidence:**  
- Initial state: Blank section when offline (see screenshot)  
- After fix: Error message visible when API request fails