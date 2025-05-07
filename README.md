My Mart - A Next.js E-Commerce App


My Mart is a Next.js e-commerce app with a product catalog, user authentication, and a filterable sidebar.


Step 1: Clone the Repository
a. Clone the repo

    git clone https://github.com/vipulmehra5178/productListingPage
b. Nvaigate to the project
 
 
    cd productListingPage


Step 2: Install Dependencies

a.Run:  

    npm install

Step 3: Set Up .env.local

a. Create a .env.local file:  
           
    touch .env.local


Add:

    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mydb?retryWrites=true&w=majority
    
    NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com

Replace credentials  with your MongoDB Atlas credentials.

Step 4: Run the Project

a.Start the server:  
  
    npm run dev


Step 5:-

Visit:  
     
    http://localhost:3000



