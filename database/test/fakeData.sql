INSERT INTO `user`
VALUES (
    "myemail@gmail.com",
    "John",
    "Doe",
    "1234567890"
)

INSERT INTO `booking` (`userEmail`, `bookingDate`, `ticketsAmount`)
VALUES (
    "myemail@gmail.com",
    NOW(),
    12
)

INSERT INTO `payment` (`bookingId`, `amountPaid`, `paymentDate`, `paymentMethod`)
VALUES (1, 12, NOW(), "card")

INSERT INTO `ticket` (`bookingId`, `ticketType`)
VALUES (
    1, "Adult"
)

INSERT INTO `reservation` (`ticketId`, `reservationDate`)
VALUES (1, NOW())