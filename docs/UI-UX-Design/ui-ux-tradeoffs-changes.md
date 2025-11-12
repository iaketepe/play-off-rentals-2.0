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
#### Notable Bugs
- [Used onBlur to setIsOpen variable to false, closing navbar onClick](https://github.com/iaketepe/play-off-rentals-2.0/commit/45af7583bb1ced9f28ef888841c90baed1351235)
- [Updated z-index to combat render override on RentOne](https://github.com/iaketepe/play-off-rentals-2.0/commit/47b8ba993f43d1ce6facdfc58fb4c38e98b86633)

### Dealing with the Footer
#### Table element vs Div with class="grid"
When it came to my Footer. I wasn't sure whether I wanted to design my hours of operations section with grid or with the table element. The table element has implicit aria and it also works well for the aesthetic of my design. On the other hand, using grid will still work well, but will take more time to implement.
#### Result: I went with the table element. The technically better accessibility along with the ease of implmentation made it a better decision. 

### Switching header text to labels for WCAG screen reader accessibility
I started out by creating my footer with header elements for titles like 'contact information' and 'hours of operations'. However, when I was using lighthouse, to review my site, I realized my accessibility score was lower than expected. After consulting the [WCAG's Headings section](https://www.w3.org/WAI/test-evaluate/preliminary), I realized that the way I was using my headers wasn't consistent enough. 

My footer headers used h5 and h6 when on some pages I didn't even use h4 or h3. So to make my page more accessible, I converted my headers to labels, keeping the css the same. Since the order of text is straight-forwards (from top to bottom), screen readers should have no trouble sifting through text. Keeping the css as it is, will also make sure that regular users will have no issues either.


### Dealing with RentTwo
#### Cart + Machines vs + Machines Only
I wanted to understand how I should design my RentTwo Component. This component would act as the catalog, showcasing each machine. The customer would choose their machines and how many they wanted.
What I wasn't sure about was whether I should  have the cart on this page or if I should add the cart in the RentThree component. Since my site was simple, having a machines only component would be reasonable. It would make seeing the cart a new and different part of the site. However, I feel like having the two together is common in web stores.
#### Result: I went with the machine only version. I can update the component over time, but I believe focusing on creating the component and getting a version of my site deployed is more important. Having a machine only version supports that.

### Dealing with RentThree
#### Cart Breakdown
For the cart, I wanted to keep things simple, so I seperated the element into two sections, the list of products from the cart, and the payment breakdown. The list of products shows information on the price and quantity, whilethe breakdown shows information on subtotal, tax, fees, and the final cost.

#### Payment Form Coherence
When I added stripe to my RentThree section, I initially believed I would be able to have stripe deal with information like name, address, email, etc. This is because of the [billingDetails](https://docs.stripe.com/js/elements_object/create_payment_element#payment_element_create-options-fields-billingDetails) section in their Payment Element documentation.

<img width="636" height="613" alt="image" src="https://github.com/user-attachments/assets/a9e7ce81-e986-4667-bc88-76fa6037e910" />

However, after trying to implement it, I see stripe getting stripe to output those fields is not likely. There is only the 'auto' segment, which Stripe controls the frequency for. Therefore, I must create the fields myself. 

This issue poses a new challenge, how can I make my input field CSS coexist with stripe's CSS? To figure that out, I had to inspect the stripe elements, identifying the subtle changes that occur. For example, onFocus the stripe elements will add a blue 'border' or ring effect. 

So I had to take those into account when creating my own input fields. I also kept the required style error handling, opting for coexistence rather than a full assimiliation of behaviour.

<img width="596" height="596" alt="image" src="https://github.com/user-attachments/assets/d9f462ea-5c04-4504-875e-5f38e9a2e570" />

NOTE: From the name fields to Rental Period are my fields. Stripes fields are from the 'Secure, fast checkout with Link' to the Country field
