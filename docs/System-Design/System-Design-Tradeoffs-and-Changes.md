# System Design Trade Offs and Changes

## Designing the Project Structure

### Integrating React with PHP

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
    
