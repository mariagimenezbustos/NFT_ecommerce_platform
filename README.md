# NFT e-Commerce App

This full-stack MVP is an NFT online store that allows the user purchase fashion NFTs, get to know about the brands, as well get in contact with the NFT store. The user can also register and log in, and keep track of their orders in their user space. The NFT e-commerce app was a group project.

## Demonstration

https://github.com/mariagimenezbustos/NFT_ecommerce_platform/assets/134734638/d47769a6-f7b3-4dde-b1f3-e7be0d2403a8

## Setup

### Dependencies

- Run `npm install`in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=ecommerce
  DB_PASS=YOURPASSWORD
```

- Run the following commands to your MySQL console: `CREATE DATABASE ecommerce;` and then `USE ecommerce;`.
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create the required tables in your database: "payments", "orders", "users", "guests", "artists", "products", and "product_order".
- Make sure you understand how the tables are constructed. In your MySQL console, you can run `DESCRIBE tablename;` to see the structure of each table. Please mind that "tablename" in `DESCRIBE tablename;` needs to be replaced by the name of the table that you want to describe.

### Development

- Run `npm start` in project directory to start the Express server on port 5000.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
