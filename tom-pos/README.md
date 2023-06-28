# The Blog Spot API

## Live Access
A live implementation of this web app can be found at https://ty0088.github.io/tom-pos.

![TOM POS screenshot](https://raw.githubusercontent.com/ty0088/ty0088.github.io/main/tom-pos/screenshots/tom_pos_screenshot.png)

## Project Description
"TOM POS" is a web based Point of Sale (POS) terminal built using React for use in the hospitality (restaurants, bars, etc) industry. 

## Project Features
* User authentication - user authentication is built using [Firebase Authentication](https://firebase.google.com/docs/auth).
* Database - Order, inventory and user data is stored on non-relational [Firestore database](https://firebase.google.com/docs/database).
* Order creation and management - Orders can be created, closed/tendered or parked (in the case of ongoing orders). Multiple orders can be opened and closed at different time. Closed orders can be re-opened and edited if necessary. Order history is preserved and listed under either open or closed orders.
* Order tendering - Orders can be tendered with adjustable discounts and tips. Tendering can take into account amount paid via cash and/or card. The change due back to the customer is also automatically worked out and displayed to the user. Orders cannot be closed if the full amount due is not tendered.
* Receipts - Both customer and kitchen (for food) receipts can be printed. Kitchen receipts are automatically printed at tendering if food items are present in the order, whilst customer receipt printing is optional although a prompt is given at tendering. Both kinds of receipts can be manually printed at any time with an open or closed order.
* Menu management - Items are grouped together by sub-menus. Items belonging to the same sub-menu are displayed in the terminal together when the sub-menu is selected. Sub-menus can be root level, parents and children. For example Food (root) -> Mains -> Veg Options / Non-Veg Options.
* VAT/Sales tax - Items incorporate VAT/sales tax. VAT are managed under different "bands" which the user sets i.e. Band "S" for standard rate @ 20%. VAT bands are then attached to items. 
* Item management - Items are created by the user. Items must belong to a sub-menu, have a price and a VAT band. Optionally items can have a description, Modifications (Mods) and Options. Mods and Options are preset at the item level and allow the user to adjust the item (both physically and cost-wise) at the order stage. For example, an Modification to a "Burger" item may be "No salad" at zero cost, whilst an Option to the "Burger" could be "Add cheese" for an addition cost of £2.00. If an item has Mods/Options available, on adding to an order, a prompt will appear allowing the user to select which options/mods to select or not select. Items without mods/options will be added to the order without such a prompt. Users can also adjust whether an item will print to a kitchen receipt.
* Cash up - TOM POS includes a feature to allow the user to carry out a daily cash up to account for the days takings. The cash up feature requires the user to input the total cash takings and card takings of the day and the system will indicate whether this matches the orders taken for the day. The day time settings can be adjusted to take into account the fact that an operating day may spread pass the calendar day i.e. 10am to 2am (next day). 

## Purpose
This web app was created as part of my self-learning on [The Odin Project](https://www.theodinproject.com/) and due to my own experiences of using a POS system. My aim was to recreate a POS terminal which included enough features that would allow it to be usable in a real environment. 

## Future
In it's current state, there are no further plans to develop this app.

## How to Use this Project
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## License
The license for all my code can be found [here](https://github.com/ty0088/ty0088.github.io/blob/main/license.md).
