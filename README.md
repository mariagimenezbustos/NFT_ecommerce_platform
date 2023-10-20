# NFT e-Commerce App

This full-stack MVP is an NFT online store that allows the user purchase fashion NFTs, get to know about the brands, as well get in contact with the NFT store. The user can also register and log in, and keep track of their orders in their user space. The NFT e-commerce app was a group project. Play with the deployed NFT store here: [Heroku App](https://still-atoll-25533-7804280e1160.herokuapp.com/).

## Built With

- React (^18.2.0)
- HTML5
- CSS3
- JavaScript (ES6)
- React Router (^6.15.0)
- MySQL (^2.18.1)
- Node.js (20.4.0)
- Express.js (4.18.2)
- Tailwind CSS (^3.3.3)
- Stripe (^13.3.0)
- SendGrid (^7.7.0)

## Setup

> **Note**
> Please mind that if you're viewing the deployed version of Eurocapi you do not need to follow these steps.

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`.
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=root
  DB_PASS=YOUR_PASSWORD
  SUPER_SECRET=YOUR_SUPER_SECRET_PASSWORD
  STRIPE_KEY=YOUR_STRIPE_KEY
  SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
```
> **Note**
> Do not forget to substitute the last four passwords (those in capital letters) for your real ones. If you do not have one yet, please create a Stripe and a SendGrid account to get your API keys.

- Run the following commands to your MySQL console: `CREATE DATABASE root;` and then `USE root;`.
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create the required tables in your database: "payments", "orders", "users", "guests", "artists", "products", and "product_order".
- Make sure you understand how the tables are constructed. In your MySQL console, you can run `DESCRIBE tablename;` to see the structure of each table. Please mind that "tablename" in `DESCRIBE tablename;` needs to be replaced by the name of the table that you want to describe.

### Development

- Run `npm start` in project directory to start the Express server on port 5000.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
