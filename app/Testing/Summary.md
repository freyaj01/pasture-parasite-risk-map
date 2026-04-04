### NFR Testing Summary

Overall, the system was evaluated against key non-functional requirements to assess performance, usability, reliability, and deployment quality. Testing highlighted both strengths and areas for improvement, demonstrating iterative development and refinement throughout the project.


**NFR07 – Reliability**  
Tested through API error handling by simulating network failure and observing system response.

- Initial Issue: API failures were not handled, resulting in blank sections with no user feedback  
- Improvement: Error handling was implemented to display clear messages when data cannot be fetched  

**Result:** PASS (after fix)  
The system now handles API failures more gracefully and provides appropriate user feedback, improving reliability and user trust.


**NFR05 – Usability**  
Tested through user interaction with the interface, including mobile navigation and map usability.

- Strengths:  
  - Interactive map functions correctly (zoom, selection, data display)  
  - Risk information is clearly presented using simplified text labels (e.g. “High”, “Very High”)  

- Limitations:  
  - Mobile dropdown navigation was not fully optimised, reducing ease of use on smaller screens  

**Result:** PARTIALLY MET  
While core functionality is intuitive, some mobile usability improvements are still required.


**Additional Observations:**
- The system demonstrates strong performance and fast load times, contributing positively to overall user experience  
- Clear visual design and information panels support first-time users in understanding the system without training  
- Iterative fixes (e.g. error handling, readability improvements) show continuous refinement aligned with professional development practices  


**Conclusion:**  
All non-functional requirements were met/improved upon during development. Where limitations were identified, appropriate fixes or future improvements have been considered, reflecting a structured and user-focused development approach.