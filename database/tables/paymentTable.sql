CREATE TABLE Payment (
    paymentId INT NOT NULL AUTO_INCREMENT,
    bookingId INT NOT NULL,
    amountPaid INT NOT NULL,
    paymentDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paymentMethod ENUM("card", "cash", "voucher") NOT NULL,

    PRIMARY KEY(paymentId),
    FOREIGN KEY(bookingId) REFERENCES Booking(bookingId)
)