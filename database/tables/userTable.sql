CREATE TABLE User (
    userEmail VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(64) NOT NULL, -- Hashed
    paymentInfo VARCHAR(255) NOT NULL, -- Encrypted string

    PRIMARY KEY(userEmail)
)