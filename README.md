I'm Dave Harned, submitting my response to Emma Inc's Code Challenges, on 8/15/16.

Challenge A)

Write a function (Javascript, Python, or Scala).
The function *must* accept a list of URLs and return a subset of those links that are either written incorrectly or do not return a success status code, alone with a way to identify what was wrong with each link.

Challenge B)

Write a front-end single page app (Javascript + React).
The application must include a form with a single input for a valid URL. Submitting the form will request the URL, and the application must parse the HTML response, generate a list of links contained on the page, and display the list beautifully in the UI.

--------
To get started:
	1. Download or clone the repository from https://github.com/davi3blu3/emma_challenge.git
	2. Run 'npm install' to initialize dependencies

To view Challenge A:
	1. My function is found in ./validate.js, which can be imported to another file with "require('./validate.js)"
	2. The function can be called with "validator.iterate(array)" where array is an array of URLs in string form.
	3. Alternately, you can see the results of this function by running "mocha /tests/validate-test.js"
	4. See line 81 of /test/validate-test.js to input a custom array, which can then be tested the same way.



--------

Full disclosure:
The instructions mentioned a 3 hour time limit, but didn't say whether that was for each or both challenges. I did not finish both challenges in 3 hours, so I made a git commit titled "Three Hour Mark". You can reference this to see the progress I had made in each challenge at that point, but I wanted to complete them both.