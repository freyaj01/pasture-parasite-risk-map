### NFR01 – Performance

**Requirement:**  
The web application must load the homepage and interactive map within 3 seconds on a standard connection (e.g. >10 Mbps) when accessed from a browser (e.g. Chrome, Safari).

**Test Steps:**
1. Open the website  
2. Simulate a slow internet connection (or use limited data mode)  
3. Observe the loading time  

**Expected Result:**  
The map should load within an acceptable time (≤ 3 seconds) or display a loading indicator if delayed.

**Actual Result:**  
The map loads very quickly, in less than 1 second.

**Outcome:**  
PASS  

**Evidence:**  
The map loaded so quickly that a loading screen could not be captured.