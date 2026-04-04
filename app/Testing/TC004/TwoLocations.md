### Test Case – Dynamic Data Update Between Locations

**Related Requirements:**  
US04, FR02, FR05, NFR07 (Reliability)


**Preconditions:**  
- Two locations exist (Area D and Area E)  
- Mock API is set up  
- Each location returns different rainfall values  


**Test Steps:**
1. Go to location selection  
2. Select "City Area D" and click "View Details"  
3. Observe the rainfall value displayed  
4. Return to location selection  
5. Select "City Area E" and click "View Details"  
6. Observe whether the rainfall value updates  


**Expected Result:**  
- Area D displays high rainfall correctly  
- Switching to Area E updates the display  
- Area E shows low rainfall  
- Previous data from Area D does not persist  


**Actual Result:**  
- Area D displayed high rainfall correctly  
- Switching to Area E updated the rainfall value as expected  
- Area E displayed low rainfall correctly  
- No residual data from Area D remained  


**Outcome:**  
PASS  


**Status:**  
Green  


**Evidence:**  
Correct data is displayed dynamically when switching between locations, confirming that API data is refreshed and state is properly updated.