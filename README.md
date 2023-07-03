# Lap 2 Project

## Getting Started
### 1. How to install the required libraries
1. In terminal navigate to the server folder by typing `cd server` and then pressing enter
2. Next, also in the terminal enter `npm install` and press enter
3. Wait for the node module installations to finish

### 2. How to run the server
1. Navigate to the server folder (if you haven't already) by entering into the terminal `cd server` after the prompt and then pressing enter
2. Create a file named '.env' in the api folder
3. Type 'PORT=3000' to set the port the server is listening on to 3000
4. Below this enter 'DB_URL=' and after the last character put the connection string (URL) to a postgres sql DB instance you've created to store data in the location associated with the string. 
5. Save the file. Your .env should look something like this afterwards:
    ```
    PORT=3000
    DB_URL=postgres://whlz?????:Vv6AYJtfW0BK????ffDjorZCQGAYx4E@tyke.db.elephantsql.com/whlz?????
    ```
6. In the terminal enter `npm run setup-db` and press the enter key. This will populate your sql db with data
7. After this, in the terminal, enter `npm start` and press the enter key. This will start the snack rankings api. 

And that's it! Your server is up and running
