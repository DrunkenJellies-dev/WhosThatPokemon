# Who's That Pokemon?

Who's that Pokemon is a guessing game where the user guesses the name of the Pokemon's silhouette displayed. Inspired from the mid-episode advert transition, you get to use your knowledge of Pokemon to complete to try and get the highest score or streak you can; it might also help improve your knowledge overall! All of the information shown to the user is gathered from the well documented PokeAPI which houses a wide variety of information about everything Pokemon. This also has three difficulty settings to choose from ranging from easy, medium and hard so that you can further challenge your Pokemon Knowledge.

<!-- Mock Up Image -->
![mock-up-image](/assets/documentation/mock_up.png)

<!-- Whole Screen Image -->
![whole-screen-image](/assets/documentation/desktop_display.png)

## Features
### Play Area
This section is where the main content is played it includes:
* The title of the of the game 'Who's That Pokemon?'.
* The Image of the Pokemon so that the user knows what they are guessing against which is pulled from PokeAPI and displayed with a silhouette while guessing and then once a guess has been made the silhouette is removed so that the user can see what the original Pokemon looks like to confirm their answer.
* The Types of the Pokemon for easy and medium mode to make the guessing easier for those modes styled to look like the colors that the game uses. This information is pulled from PokeAPI and displayed with styling to match the type displayed and the amount of types that the Pokemon has.
* The description of the Pokemon for easy mode to make the guessing easier for users on that mode. This information is pulled from PokeAPI and where the Pokemon name is contained within the Description the it is replaced by three questions marks ('???') as to not give the answer away to the user.
* The multiple choice answer selection where four names are shown and the user has to pick the correct one. This is only displayed for easy mode to make the guessing easier. The names included in the choice question is the original Pokemon name that is generated as well as the 3 more randomly generated names pulled from PokeAPI.
* A text box with a submit button where a user can enter the name of the pokemon as a guess and submit the answer. This is only displayed for medium and hard mode to make the guessing a bit harder for users that decide to challenge themselves a bit more. This is also cleared of all information once a new game starts so that the user doesn't have to clear it themselves.

<!--Easy Mode -->
![easy-mode-display](/assets/documentation/easy_mode.png)

<!--Medium Mode-->
![medium-mode-display](/assets/documentation/medium_mode.png)

<!--Hard Mode-->
![hard-mode-display](/assets/documentation/hard_mode.png)

### Score tracking
This section displays the current score that the user has achieved which increments by one for every correct answer and increments the incorrect score by one for every incorrect answer. There is also a streak system where the user gets to try and carry on a streak of guessing pokemon and then sets the highest streak to the highest streak that has been achieved so far. The current streak score is also set back to zero when the user gets a guess incorrect.

<!--Score Tracker Section-->
![score-tracking-section](/assets/documentation/score_section.png)

### Difficulty Selection 
This section includes three buttons that each refer to the difficulty that the user can pick between (easy, medium, and hard). This allows the user to customize how they would like to play the game. Upon picking an option the user is generated a new Pokemon to guess as so that the option to go to easy mode see more information and go back to hard to answer is removed to create a more fair playground if users where to compete with one another.

<!-- Difficulty Selection -->
![difficulty-section](/assets/documentation/difficulty_section.png)

## Design
The webpage has been designed with mobile responsiveness in mind where the elements used match the screen size that is used. For example, the multiple choice and difficulty buttons all adjust their placement so that they don't' overlap and fall out of place. In addition, all of the containers around the elements adjust their width along with all of the elements inside so that they all fit on the screen in an organized manner. This was completed by testing on real mobile devices and the Google Chrome Dev tools.

<!-- Desktop Image -->
![desktop-display](/assets/documentation/desktop_display.png)

<!-- Tablet Image -->
![tablet-display](/assets/documentation/tablet_display.png)

<!-- Mobile Image -->
![mobile-display](/assets/documentation/mobile_display.png)

## Testing

### Validator testing
* HTML - No errors were found when when submitting to the official WSC Validator. (https://validator.w3.org/)
<!-- HTML Validator -->
![html-validator](/assets/documentation/html_validator.png)

* CSS - No errors were found when submitting to the official Jigsaw W3 Validator. (https://jigsaw.w3.org/css-validator/)
<!-- CSS Validator -->
![css-validator](/assets/documentation/css_validator.png)

* JAVASCRIPT - No major errors were found when when submitting to the jshint validator. (https://jshint.com/)
<!--JavaScript Validator-->
![javascript-validator](/assets/documentation/javascript_validator.png)

### Manual Testing
Manual Testing was performed to make sure that the website works well on all platforms.
* Browsers
    * Chrome
    * Safari
    * Microsoft Edge
    * Firefox
    * Opera

* Devices
    * Samsung Galaxy S23 Ultra
    * iPhone 12
    * Google Pixel 4a
    * Windows Desktop
    * Mac OS Desktop

During testing I also handed off my website to a QA tester to do some exploratory black box testing on both mobile and desktop which allowed them to better find bugs that I might not have found on my own due to me having done all of the development.

#### Issues Found
While testing I found that there were two errors:
* Bug: The text answer submit would not clear the previous guess after it had been submitted
    * Fix: I implemented a line of code at the beginning of runGame that would clear the .value of the text box element

* Bug: If hard mode was selected when the previous difficulty selected was easy then the Pokemon description would be visible.
    * Fix: I added a toggle to add the .hidden styling to the Pokemon description when displaying the difficulty format on line 125

## Deployment
The site was deployed to GitHub Pages.
1. Navigate to the Github repo being deployed
2. Select 'Settings'
3. Select 'Pages'
4. Scroll to the 'Build and deployment'/'Source' section
5. Find sub-section 'Branch'
6. From drop-down menu 'none'/'select branch' select source 'main' (or the preferred branch that you would like live)
7. Click 'Save'
8. Wait until you can see a link for the deployed page within Github Page section (this can take a while)
 
## Technologies
* Visual Studio Code - used to develop the website
* Github - used to host source code and deploy live site on github pages
* Sourcetree - used to commit and push code 
* HTML - used to create the elements for the website
* CSS- used to style the website
* PokeAPI - used to generate Pokemon information
* JavaScript - used to create dynamic content and make page interactive
* Techsini.com- used to create the mock up image
* W3C Validator- used to checking HTML for errors
* E3c Jigsaw - used to check CSS for errors
* jshint validator - used to check javascript code for errors
* markdownlivepreview.com - used to write the README.md while seeing a preview
* shareX - to gather screenshots for the README

## Credits
* The inspiration to use PokeAPI within a game format came from: https://www.youtube.com/watch?v=dVtnFH4m_fE&ab_channel=KennyYipCoding
* google fonts
* javascript code to shuffle an array (fisher-yates shuffle method) came from: https://stackoverflow.com/questions/1519736/random-shuffling-of-an-array
    https://stackoverflow.com/questions/58750774/ask-user-enter-name-with-javascript-and-html
