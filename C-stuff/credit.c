#include <cs50.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    // prompt for credit card number
    long ccNumber = get_long("Number: ");

    // initialise variables
    int sumOne = 0;
    int sumTwo = 0;
    int currDigit = -1;
    int prevDigit = -1;
    long divisor = 1;
    string cardType = "INVALID\n"; // pre define cardType as invalid for cards that pass check sum but are not valid

    int i;
    for (i = 1; i <= 16; i++)
    {
        divisor = divisor * 10; // increase divisor each step
        if (currDigit >= 0)
        {
            // if there is a valid currDigit from previous step, set to prevDigit
            prevDigit = currDigit;
        }
        currDigit = (ccNumber % divisor) / (divisor / 10); // get current digit
        if (i % 2 == 0)
        {
            // if current digit is every other digit starting with second-to-last digit, times current digit by 2
            int doubleCurrDigit = currDigit * 2;
            int digitVal;
            if (doubleCurrDigit >= 10)
            {
                // if product is more than single digit separate them and set digitVal to sum of both digits
                int firstSF = (doubleCurrDigit % 100) / 10;
                int secondSF = doubleCurrDigit % 10;
                digitVal = firstSF + secondSF;
            }
            else
            {
                // if product is a single digit, set digitVal to doubleCurrDigit
                digitVal = doubleCurrDigit;
            }
            sumTwo += digitVal;
        }
        else
        {
            // else add to sumOne
            sumOne += currDigit;
        }

        // if 13th digit == 4 then visa
        if (i == 13 && currDigit == 4)
        {
            cardType = "VISA\n";
        }
        // if 15th digit == 3 and prevDigit is a 4 or 7 then american express
        if ((i == 15 && currDigit == 3) && (prevDigit == 4 || prevDigit == 7))
        {
            cardType = "AMEX\n";
        }
        // if 16th digit == 5 and prevDigit is a 1, 2, 3, 4 or 5 then mastercard
        if ((i == 16 && currDigit == 5) && (prevDigit > 0 && prevDigit < 6))
        {
            cardType = "MASTERCARD\n";
        }
        // if 16th digit == 4 then visa
        if (i == 16 && currDigit == 4)
        {
            cardType = "VISA\n";
        }
    }

    // check check sum and print the answer
    int checkSum = sumOne + sumTwo;
    if (checkSum % 10 != 0)
    {
        printf("INVALID\n");
    }
    else
    {
        printf("%s", cardType);
    }
}
