-- Keep a log of any SQL queries you execute as you solve the mystery.
-- All you know is that the theft took place on July 28, 2021 and that it took place on Humphrey Street.


-- 1. Look for crime report of specific theft.
SELECT * FROM crime_scene_reports
    WHERE street = 'Humphrey Street'
    AND year = 2021
    AND month = 7
    AND day = 28;
-- Result:  Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today
--          with three witnesses who were present at the time – each of their interview transcripts mentions the bakery.


-- 2. Look for interviews on date of crime.
SELECT * FROM interviews
    WHERE year = 2021
    AND month = 7
    AND day = 28;
-- Results: Ruth -  Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away.
--                  If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.
--          Eugene - I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery,
--                   I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.
--          Raymond - As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say
--                    that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of
--                    the phone to purchase the flight ticket.


-- 3. Look at bakery security log on day of theft bewteen 10:15am - 10:25am for cars that left the parking lot and who the cars' owners are.
SELECT name FROM people
    WHERE license_plate IN
        (SELECT license_plate FROM bakery_security_logs
            WHERE year = 2021
            AND month = 7
            AND day = 28
            AND hour = 10
            AND minute BETWEEN 15 AND 25
        );
-- Results:  Vanessa, Barry, Iman, Sofia, Luca, Diana, Kelsey and Bruce.


-- 4. Check ATM transactions for persons withdrawing money on Leggett Street on 28/7/2021.
SELECT name FROM bank_accounts, atm_transactions, people
    WHERE bank_accounts.account_number = atm_transactions.account_number
    AND bank_accounts.person_id = people.id
    AND (
        year = 2021
        AND month = 7
        AND day = 28
        AND atm_location = 'Leggett Street'
        AND transaction_type = 'withdraw'
    );
-- Results: Bruce, Diana, Brooke, Kenny, Iman, Luca, Taylor and Benista.


-- Common names so far: Bruce, Diana, Iman, Luca


-- 5. Check who made phone calls to who on 28/7/2021 lasting < 1min.
SELECT callerpeople.name, caller, receiver, receiverpeople.name
    FROM people as callerpeople, phone_calls, people as receiverpeople
        WHERE callerpeople.phone_number = phone_calls.caller
        AND phone_calls.receiver = receiverpeople.phone_number
        AND (
            year = 2021 AND month = 7 AND day = 28 AND duration < 60
        );
-- Results: Callers - Sofia called Jack, Kelsey called Larry, Bruce called Robin, Kelsey called Melissa, Taylor called James, Diana called Philip, Carina called Jacqueline, Kenny called Doris and Benista called Anna.


-- Common names so far: Bruce (calling Robin) and Diana (calling Philip).


-- 6. Find first flight out of Fiftyville on 29/7/2021.
SELECT flights.id, originairport.full_name AS origin_airport, destinationairport.full_name AS destination_airport, destinationairport.city, year, month, day, hour, minute
    FROM airports AS originairport, flights, airports AS destinationairport
        WHERE originairport.id = flights.origin_airport_id
        AND destinationairport.id = flights.destination_airport_id
        AND originairport.city = 'Fiftyville'
        AND year = 2021
        AND month = 7
        AND day = 29
        ORDER BY hour, minute LIMIT 1;
-- Result: First flight out of Fiftyville on 29/7 is Flight ID 36 to LaGuardia Airport, New York City.


-- 7. Find either Bruce or Diana is a passenger on flight 36.
SELECT * FROM passengers, people
    WHERE passengers.passport_number = people.passport_number
    AND flight_id = 36
    AND name = 'Bruce' OR 'Diana';
-- Result: Bruce!
