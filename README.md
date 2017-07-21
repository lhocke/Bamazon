# Bamazon

A CLI store emulator that allows customers to view and purchase items, and for managers to check item listings, see low inventory, add items, and update item details as needed.

#Customer

To run the customer app, open bamazonCustomer.js in node. You will be shown a table of items, asked to make a selection, and asked to specify the quantity of that item that you wish to purchase. If the available stock is lower than your requested quantity you will be shown an error message and asked to choose again, otherwise you will be shown the total for your purchase and asked if you want to purchase another item. If you enter yes, you will be taken back to the table and shown an updated listing from the database. Otherwise you will be shown a thank you message and the program will end.

Customer Walkthrough Video Here: <a href="http://www.youtube.com/watch?feature=player_embedded&v=O84DuyJRV3c" target="_blank" <img src="http://img.youtube.com/vi/O84DuyJRV3c/0.jpg" alt="Bamazon Customer Walkthrough" width="240" height="180" border="10" /></a>

#Manager

To run the manager app, open bamazonManager.js in node. You will be asked to choose from a list of four actions; "View Items", "See Low Inventory", "Update Stock", and "Add An Item". The first two will return a table similar to the one the customer receives or one that displays all items with an inventory under 4 based on your choice. Update Stock will allow you to select an item from the list and update the database with the appropriate number of items. Add an item allows you to enter a new item into the database with the name, department, price, and quantity. 

Manager Walkthrough Video Here: <a href="http://www.youtube.com/watch?feature=player_embedded&v=AmBy0yFeMks" target="_blank" <img src="http://img.youtube.com/vi/AmBy0yFeMks/0.jpg" alt="Bamazon Customer Walkthrough" width="240" height="180" border="10" /></a>