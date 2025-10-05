# UI/UX Trade Offs & Design Changes:

## Page Design
When it came to designing my pages. I wanted to have an easy, standardizable way to handle them. Since I planned on using React to modularize parts of the page. I decided on a three part page:
- Component 1: Header
- Component 2: Page Core
- Component 3: Footer

Designing with this structure in mind, gives me more seperation when designing my page. It also makes adding changes over time easier. Instead of having to go into each individual page to modify the header and footer, I can update the components directly and have their changes expand to any other page. 

## Dealing with General Page Components
Since this is a web store. I have to design my header and footer, to fit the theme and function of one. This means both must adhere to good UX practices like accessibility and responsive design. 

### Dealing with the Header
For my Header's mobile I planned to have all 


### Dealing with the Footer
When it came to my Footer. I wasn't sure whether I wanted to design my hours of operations section with grid or with the table element. The table element has implicit aria and it also works well for the aesthetic of my design. On the other hand, using grid will still work well, but will take more time to implement.
#### Result: I went with the table element. The technically better accessibility along with the ease of implmentation made it a better decision. 
