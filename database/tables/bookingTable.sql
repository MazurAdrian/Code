CREATE TABLE Booking (
    bookingId INT NOT NULL AUTO_INCREMENT,
    userEmail VARCHAR(255) NOT NULL,
    bookingDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticketsAmount FLOAT NOT NULL,

    PRIMARY KEY(bookingId),
    FOREIGN KEY(userEmail) REFERENCES User(userEmail)
)