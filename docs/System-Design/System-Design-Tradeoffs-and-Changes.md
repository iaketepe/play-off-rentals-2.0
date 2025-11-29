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
- Originally, when I thought about implementing this, I wanted to use some google maps integration. However, I wasn't interested in having to give payment information to access a free tier, so I tried to create the system myself.
- One of the challenges from that was realizing I didn't know what I needed to embed a searchable map into a website.
    - After doing some research, I realized there were three parts to it:
        - Geodata - Getting the geographical data
            - Raster Tiles (Pre-rendered image files)
            - Vector Tiles (Geometric data tiles)
        - Geocoding - Converting address strings to coordinates (Think Google maps search result autocomplete)
        - Rendering - Applying coordinates onto geodata to render a map
- I had found a library I wanted to use called leaflet. It had a very small size (42 KB), and I believed it would work well with my react frontend. Since the library supported raster tiles, I planned on using raster tiles for geodata.
- When it came to finding my geodata, I originally looked for OpenStreetMap. However, after realizing that they are not a cloud 'service' and do not want to be directly used for production, I had to look for another provider that relied on them indirectly.
- My options were:
    - LocationIQ (Free Tier: 5000 requests / Day)
        - Has more requests
        - Provides Geocoding
        - Had more technical overhead for backend integration
    - Geoapify (Free Tier: 3000 requests / Day)
        - Follows standard integration (Backend uses ApiKey)
        - Provides Geocoding
        - Has less requests
    - MapTiler (Free Tier: 3333 requests / Day)
        - Middle Ground
        - Uses vector tiles
- Eventually I chose Geoapify for my Geodata provider. Since Geoapify also provides geocoding, I thought about using it for that as well. The only problem is having one provider for both, would halve the number daily requests. However, since LocationIQ can provide geocoding and because I believe users are likely to rewrite their search query more than just rendering that result, I planned on using it to maximize the amount of requests users could make.

### Step 2: Rental Catalogue
- Step 2 was relatively straightforward. I started by creating a SQL schema in Supabase to define the tables for the store. For storing arcade machine images, I leveraged Supabase’s storage buckets (S3-compatible), keeping image files separate from the database and storing their URLs in the tables.

<img width="1179" height="630" alt="image" src="https://github.com/user-attachments/assets/cb7038ee-55d8-438b-98ce-7de4e1947080" />

- In order to access the data from my backend, I used Laravel’s recommended ORM, Eloquent. After installing the dependency and creating ORM models for each table, I was able to query and manipulate their records as needed.

### Step 3: Payment Processing
#### Handling the Cart
- Step 3 needed a bit of work to implement. First, I needed to get information from the previous step on the cart of arcade machines chosen. This meant I had to figure out a persistent storage method for cart-related information between steps or even between pages on the site. 
- To figure this out, I decided that I would store this information on the client side, having each user use their 'local' storage. This way, I could minimize extra computations my server would have to calculate, only having it verify that the transaction could be completed and execute it.
- Something I didn't realize was the different types of 'local' storage accessible from a web standpoint:
    - LocalStorage: A form of web storage that doesn't expire until explicitly cleared.
    - SessionStorage: A form of web storage that only expires when all windows/pages tied to a given site are closed.
    - Cookies: One of the older forms of client storage.
- The problem with cookies is how easy they are to access. Allowing for issues like Cross Site Request Forgery (CSRF) to occur. Therefore, it made more sense to focus on using local or session, with session being the final choice to minimize need for user intervention when clearing the storage.

#### Dealing with Payment
- The next part was actually implementing a payment processing service. I was interested in using a platform like Stripe or Paypal, though I stayed with stripe due to its free sandbox environment. Another thing was stripe connection with Laravel. In the Laravel ecosystem, there is a package that supports payment processing called 'Laravel Cashier'. There was a version of it that was built for stripe. So, I planned on using the tool for my own payment processing.

## Site Reliability
### Adding Lazy Loading
- After checking over my site, inspecting it, testing its responsiveness, I realized my site felt slower than it should have been. resizing the screen yielded a lot of lag.
- After doing some research, it seemed like there were a couple of reasons why my site gave this result:
    - Too many UI calculations (Overriding CSS, Too many HTML elements, etc)
    - Too much javascript being executed at once
- Trying to understand this out a bit more, I inspected my site's network traffic. I realized every time my site loaded a page, it would grab all of the data it needs for every page, create all pages as objects and only render the page that was asked. 
- To fix this, I implemented React lazy loading, making sure that on load only the requested page would be loaded.


### Dealing with Deployment
After setting up my home page and my rent process, I decided I had enough of a viable product to deploy. I ended up deploying my project on render since render was what I used in the past.

#### Dealing with Cloud Networking issues
- These networking issues were one of the most challenging parts of this project. A notable issue was the 'Mixed Content' error. To give some context, this site was deployed with HTTPS. However, when my site was given a page request, it would reference the necessary files using HTTP requests. 
- Since laravel has its own implicit handling, it would block the request, preventing any vulnerabilities. However, if I wanted to allow users to actually access the site I had to fix this build issue.
- To fix the issue, I would add a script to redirect any requests referencing HTTP (e.g. http://play-off-rentals-2-0.onrender.com) to a secure HTTPS variant. I would also use curl requests to verify the redirect worked correctly.
- I also added an app service provider script that would check the app environment (mode = local or production), using it to force HTTPS responses.
- Finally, I checked my environment variables to make sure that my app environment was set to production. After realizing it was set to local, I updated it promptly. After checking my site again, I was finally able to see my page rendered.


#### Dealing with Cloud Routing
- The next problem was routing. Even though my site had been deployed and I could only access the home page, recieving a 404 as the result of checking my rent page.
- After doing some research, I realized that my cloud server may have been ignoring my htaccess file, so I updated my dockerfile making sure my cloud server would allow for htaccess overrides.
- After doing so, I was able to access all of my pages including my rent sub process pages.

#### Dealing with Cloud Service Updates
- After trying to deploy my new faq page, I seem to have been met with a deployment failure. Thankfully, the failed deployment didn't mess with the current deployment of my site. So I could continue to figure out the issue without having to revert my changes and update my deployment.
- After doing some research, I realized my deployment build failed because render updated how it allows premissions. Npm install works by taking and potentially updating the dependencies list, relying on operations like chown. This seems to have been recently patched my cloud service provider, who seems to no longer be allowing for that.
- So I switched from npm install to npm clean install (npm ci). This makes it so that npm sets up my dependencies exactly how I had set it up. No inferences or anything else. This allowed my deployment to be updated.
