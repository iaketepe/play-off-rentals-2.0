# System Design Trade Offs and Changes

## Designing the Project Structure

### Choosing my core stack
- One of the difficult parts of this project was about integrating the technologies I was used to. Some time ago, I finished another project using PHP to handle my backend. Since PHP was something I was used to, I wanted to design this project with PHP for the backend as well. The problem? PHP is very heavy-handed. As a language, not only does it require web files like html to have a compatible format (.php). When using something like Laravel (A PHP framework) to handle other backend intractions, it forces the project into a PHP-centric ecosystem.
- This was difficult for me because the technologies I used for past projects relied on a more front end centric system. Tools like React, allowed me to abstract some of the backend, giving me the chance to focus on modularizing my components, handling, some backend interactions like routing.
- I thought about the idea of removing one and then committing to a different stack (e.g. React with Express.js and PHP with Laravel) but I couldn't decide. This is where I learned about PHP Blade. Blade allowed me to still have my codebase stay PHP-centric while giving me the flexibility to work with React on the client side.
- In conclusion, I chose to use PHP to handle my backend, expanding it with Laravel as my framework and relying on PHP blade to integrate tools like React for UI. This decision allows me to balance my experience in both tools, integrating them in a clean and reasonable way.

### Single Blade View vs Multiple Blade Views
- After I figured out what technologies I wanted to use. My next issue was actually designing the project structure. I came up with two choices:
    - Single PHP Blade view + dynamic react core
    - Multiple PHP Blade views each with their own react core
In both cases, the blade file being rendered would mount a React root, adding in what was needed to make up a webpage. The difference came down to simplicity and efficiency. Instead of having multiple views each with their own unique root, I could reduce it down to one root, passing data on route so the computer would know which 'page' needs to be brought up. This allows me to take advantage of PHP when it comes to routing, while relying on react in a relatively natural way.
#### Result: I chose to go with the single blade view.

## Dealing with RentCore
### Partial reload vs Full Page reload
### Handling partial reload
- Ajax Calls
- React
### Step 1: Geolocation
- The main point of this step is to serve as a 'soft wall' for the user. When a user submits their address, the rental service will confirm that their address is within the X km limit for dispatch. If they aren't in range the service will disable access to the next step. However, it is possible to continue first, allowing the user to check the machines available and confirm their location later on in the process.

- One of the challenges I had when it came to developing the geolocation step not understanding is actually needed to embed a map into a website.
    - After doing some research, I realized there were three parts to it:
        - Geodata - Getting the geographical data
        - Geocoding - Converting addresss strings to coordinates
        - Rendering - Applying coordinates onto geodata to render a map
    
