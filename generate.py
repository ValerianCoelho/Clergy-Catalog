import sqlite3
import random
from datetime import datetime, timedelta

# Connect to SQLite database
conn = sqlite3.connect('database 2.db')
c = conn.cursor()

# Create person table
c.execute('''CREATE TABLE IF NOT EXISTS person (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fname TEXT,
                lname TEXT,
                email TEXT,
                contact1 TEXT,
                contact2 TEXT,
                contact3 TEXT,
                pan TEXT,
                sbn INTEGER UNIQUE,
                beneficiary1 TEXT,
                beneficiary2 TEXT,
                address TEXT,
                isDeleted TEXT
             )''')

# Create donation table
c.execute('''CREATE TABLE IF NOT EXISTS donation (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sbn INTEGER,
                purpose TEXT,
                amount REAL,
                paymentMode TEXT,
                date TEXT,
                receipt TEXT
             )''')

# Custom data lists
first_names = ['John', 'Jane', 'Michael', 'Emily', 'Chris',
               'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah',
               'Charlotte', 'William', 'Sophia', 'James', 'Amelia',
               'Benjamin', 'Harper', 'Lucas', 'Mia', 'Henry',
               'Evelyn', 'Alexander', 'Abigail', 'Ethan', 'Emily',
               'Mason', 'Ella', 'Logan', 'Scarlett', 'Oliver',
               'Grace', 'Jacob', 'Lily', 'Michael', 'Chloe',
               'Daniel', 'Avery', 'Matthew', 'Sofia', 'Jackson',
               'Riley', 'Sebastian', 'Layla', 'Aiden', 'Zoey']

last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown',
              'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
              'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
              'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
              'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker',
              'Hall', 'Allen', 'Young', 'Hernandez', 'King',
              'Wright', 'Lopez', 'Hill', 'Scott', 'Green',
              'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter']

purposes = ['Education Fund', 'Medical Aid', 'Food Drive',
            'Shelter Support', 'Environmental Conservation',
            'Disaster Relief', 'Community Development',
            'Animal Welfare', 'Arts and Culture Program',
            'Elderly Care', 'Mental Health Services', 'Youth Sports Program']

payment_modes = ['Credit Card', 'PayPal', 'Cash']
addresses = [
    '123 Main St',
    '456 Elm St',
    '789 Oak St',
    '321 Maple Ave',
    '654 Pine St',
    '987 Cedar Ln',
    '741 Birch Dr',
    '852 Walnut St',
    '963 Spruce Ave',
    '159 Sycamore Blvd',
    '357 Chestnut St',
    '258 Ash Ln',
    '456 Juniper Ave',
    '753 Laurel St',
    '852 Magnolia Dr',
    '951 Poplar Ave',
    '147 Birch St',
    '369 Willow Ln',
    '258 Oakwood Ave',
    '741 Redwood St',
    '852 Cedar Ave',
    '963 Elmwood Blvd',
    '159 Pine Ave',
    '357 Maple St',
    '654 Hickory Ln',
    '147 Birchwood Dr',
    '369 Cherry Ave',
    '258 Chestnut St',
    '852 Willow Ave',
    '963 Cedar St',
    '741 Maple Ln',
    '159 Elm Ave',
    '357 Oakwood Blvd',
    '654 Ash St',
    '147 Walnut Ln',
    '369 Poplar Ave',
    '258 Birchwood Blvd',
    '852 Cedar Ln',
    '963 Pine St',
    '159 Maple Ave',
    '357 Elmwood Dr'
]


# Function to generate random date within a range
def generate_random_date(start_date="2023-01-01", end_date="2024-12-31"):
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    random_date = start + timedelta(days=random.randint(0, (end - start).days))
    return random_date.strftime("%Y-%m-%d")

# Function to generate dummy data and insert into donation table
def generate_donation_data(num_entries, sbn):
    for _ in range(num_entries):
        purpose = random.choice(purposes)
        amount = round(random.uniform(1000, 10000), 2)
        payment_mode = random.choice(payment_modes)
        date = generate_random_date()  # You can change this to generate random dates if needed
        receipt = random.randint(100000, 999999)  # Generating random receipt numbers
        
        c.execute('''INSERT INTO donation (sbn, purpose, amount, paymentMode, date, receipt) 
                     VALUES (?, ?, ?, ?, ?, ?)''',
                     (sbn, purpose, amount, payment_mode, date, receipt))
        conn.commit()

# Function to generate dummy data and insert into person table
def generate_person_data(num_entries):
    for _ in range(num_entries):
        fname = random.choice(first_names)
        lname = random.choice(last_names)
        email = f"{fname.lower()}.{lname.lower()}@example.com"  # Generating email using fname and lname
        contact1 = "123-456-7890"
        contact2 = "456-789-0123"
        contact3 = "789-012-3456"
        pan = "ABCDE1234F"
        sbn = random.randint(10000000000000, 99999999999999)  # Generating random sbn
        beneficiary1 = random.choice(first_names) + " " + random.choice(last_names)
        beneficiary2 = random.choice(first_names) + " " + random.choice(last_names)
        address = random.choice(addresses)
        is_deleted = random.choices(['true', 'false'], weights=[0.1, 0.9])[0]
        
        c.execute('''INSERT INTO person (fname, lname, email, contact1, contact2, contact3, pan, sbn, beneficiary1, beneficiary2, address, isDeleted) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                     (fname, lname, email, contact1, contact2, contact3, pan, sbn, beneficiary1, beneficiary2, address, is_deleted))
        conn.commit()
        generate_donation_data(random.randint(1, 4) , sbn)

# Generate dummy data
num_person_entries = 500
generate_person_data(num_person_entries)

# Close database connection
conn.close()
