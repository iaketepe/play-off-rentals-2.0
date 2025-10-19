# System Design Trade Offs and Changes

## Designing the Project Structure

### Choosing my Core Stack
- One of the difficult parts of this project was about integrating technologies I was used to. Before this project, I finished another using PHP for my backend. Since PHP was something I worked with, I wanted to use PHP to design this project. The problem? PHP is very heavy-handed. As a language, not only does it require web files like HTML to have a compatible format (.php). When using something like Laravel (A PHP framework) to handle other backend interactions, it forces the project into a PHP-centric ecosystem.
- This was difficult for me because the technologies I used for past projects relied on a more front end focused system. Tools like React, allowed me to abstract some of the backend, giving me the chance to focus on modularizing my components, handling, some backend interactions like routing.
- I thought about the idea of removing one and then committing to a different stack (e.g. React with Express.js and PHP with Laravel) but I couldn't decide. This is where I learned about PHP Blade. Blade allowed me to still have my codebase be PHP-centric while giving me the flexibility to work with React on the client side.
- In conclusion, I chose to use PHP to handle my backend, expanding it with Laravel as my framework and relying on PHP Blade to integrate tools like React for UI. This decision allows me to balance my experience in both tools, integrating them in a clean and reasonable way.

### Single Blade View vs Multiple Blade Views
- After I figured out what technologies I wanted to use. My next issue was actually designing the project structure. I came up with two choices:
    - Single PHP Blade view + dynamic react core
    - Multiple PHP Blade views each with their own react core
In both cases, the Blade file being rendered would mount a React root, adding in what was needed to make up a webpage. The difference came down to simplicity and efficiency. Instead of having multiple views each with their own unique root, I could reduce it down to one root, passing data on route so the computer would know which 'page' needs to be brought up. This allows me to take advantage of PHP when it comes to routing, while relying on react in a relatively natural way.
#### Result: I chose to go with the single Blade view.

## Dealing with RentCore
- RentCore is one of the most important parts of my web store. It's where the client goes to try to actually rent arcade machines from the store. It has three parts:
    - RentOne (GeoCheck): Verify Client Service location is valid.
    - RentTwo (Catalog): Check catalog of arcade machines and select the ones desired.
    - RentThree (Payment): Confirm your cart selection and checkout.
### Handling Partial Reload
- The issue with RentCore is I wasn't sure how to deal with routing. I knew relying on partial reload was better because I didn't want people to have to reload to switch between steps. However, I didn't want to rely on ajax calls just to do the changes, because of the potential performance issue.
- This is where I realized I could take advantage of my React view by doing some React 'micro-routing'. Essentially, I would create my RentCore as a component and design sub components for the different steps in the process. Then I would switch the component being rendered based on my previous and next buttons. By doing this I get the natural flow, I was looking for while keeping performance steady.

### Step 1: Geolocation
- The main point of this step is to serve as a 'soft wall' for the user. When a user submits their address, the rental service will confirm that their address is within the X km limit for dispatch. If they aren't in range the service will disable access to the next step. However, it is possible to continue first, allowing the user to check the machines available and confirm their location later on in the process.

- One of the challenges I had when it came to developing the geolocation step was not understanding is actually needed to embed a map into a website.
    - After doing some research, I realized there were three parts to it:
        - Geodata - Getting the geographical data
        - Geocoding - Converting address strings to coordinates
        - Rendering - Applying coordinates onto geodata to render a map

### Step 2: Rental Catalogue


### Step 3: Payment Processing


## Site Reliability
### Adding Lazy Loading
- After checking over my site, inspecting it, testing its responsiveness, I realized my site felt slower than it should have been. resizing the screen yielded a lot of lag.
- After doing some research, it seemed like there were a couple of reasons why my site gave this result:
    - Too many UI calculations (Overriding CSS, Too many HTML elements, etc)
    - Too much javascript being executed at once
- Trying to understand this out a bit more, I inspected my site's network traffic. I realized every time my site loaded a page, it would grab all of the data it needs for every page, create all pages as objects and only render the page that was asked. 
- To fix this, I implemented React lazy loading, making sure that on load only the requested page would be loaded.
    
