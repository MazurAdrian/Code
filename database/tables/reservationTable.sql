CREATE TABLE Reservation (
    reservationId INT NOT NULL AUTO_INCREMENT,
    ticketId INT NOT NULL,
    reservationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(reservationId),
    FOREIGN KEY(ticketId) REFERENCES Ticket(ticketId)
)