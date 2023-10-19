# TODO


from cs50 import get_int
import math


def main():
    ccNo = get_int("Number: ")

    sumOne = 0
    sumTwo = 0
    currDigit = -1
    prevDigit = -1
    divisor = 1
    cardType = "INVALID\n"

    for i in range(1, 17):
        divisor = divisor * 10

        if currDigit >= 0:
            prevDigit = currDigit

        currDigit = math.floor((ccNo % divisor) / (divisor / 10))
        # print(f"currDigit: {currDigit}")

        if i % 2 == 0:
            doubleDigit = currDigit * 2
            digitVal = 0

            if doubleDigit >= 10:
                firstSf = math.floor((doubleDigit % 100) / 10)
                secondSf = math.floor(doubleDigit % 10)
                digitVal = firstSf + secondSf
            else:
                digitVal = doubleDigit

            # print(f"digitVal: {digitVal}")
            sumTwo += digitVal
        else:
            sumOne += currDigit

        if i == 13 and currDigit == 4:
            cardType = "VISA\n"

        if (i == 15 and currDigit == 3) and (prevDigit == 4 or prevDigit == 7):
            cardType = "AMEX\n"

        if (i == 16 and currDigit == 5) and (prevDigit > 0 and prevDigit < 6):
            cardType = "MASTERCARD\n"

        if i == 16 and currDigit == 4:
            cardType = "VISA\n"

    checkSum = sumOne + sumTwo
    # print(f"sumOne: {sumOne}")
    # print(f"sumTwo: {sumTwo}")
    # print(f"checkSum: {checkSum}")

    if checkSum % 10 != 0:
        print("INVALID\n")
    else:
        print(f"{cardType}\n")


main()
