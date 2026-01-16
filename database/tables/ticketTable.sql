CREATE TABLE Ticket (
    ticketId INT NOT NULL AUTO_INCREMENT,
    bookingId INT NOT NULL,
    ticketType ENUM("Adult", "Child", "Toddler", "Student") NOT NULL,

    PRIMARY KEY(ticketId),
    FOREIGN KEY(bookingId) REFERENCES Booking(bookingId)
)