SHAHI AGRO FARM — SHAHI GRASS SILAGE website

Files:
- index.html — Home
- about.html — About
- benefits.html — Benefits
- order.html — Order
- contact.html — Contact
- style.css — Design and responsive styling
- script.js — Navigation, animations and order calculator
- assets/ — benefit illustrations

Order logic:
- 50 KG per packet
- ৳350 per packet
- Minimum 20 packets
- Maximum 400 packets
- Total weight = quantity × 50 KG
- Total price = quantity × ৳350

Note:
The current order form performs front-end calculation and displays a confirmation summary. It does not send orders to a server or payment gateway yet.

Payment section:
- bKash official number: 01799900886
- Customer must select bKash or Nagad
- Customer must provide the number used to make payment
- Customer must provide a payment transaction ID
- The front-end requires these fields before the order can be submitted for verification
- Actual payment verification still requires manual/backend verification of the transaction ID
