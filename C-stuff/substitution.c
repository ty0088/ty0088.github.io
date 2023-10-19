#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

char encrypt_char(char plainChar, string key);
int getCharIndex(char a);

int main(int argc, string argv[])
{
    string cipherKey = argv[1];
    char keyCheck[25] = {0};

    // check correct amount of command line arguments and key argument length
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }
    else if (strlen(cipherKey) != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    // check input for duplicates and invalid characters (only a-z)
    int i;
    for (i = 0; i < strlen(cipherKey); i++)
    {
        if (toupper(cipherKey[i]) == keyCheck[getCharIndex(cipherKey[i])])
        {
            // if current cipher key char (ignore case) is present in keyCheck, return error message
            printf("Key must contain 26 unique characters.\n");
            return 1;
        }
        else {
            // if current cipher key char is not present in keyCheck, add char to keyCheck
            keyCheck[getCharIndex(cipherKey[i])] = toupper(cipherKey[i]);
        }
        if (!isalpha(cipherKey[i]))
        {
            printf("Key must contain 26 alphabetical characters.\n");
            return 1;
        }
    }

    // get plain text from user
    string plainText = get_string("plaintext: ");

    printf("ciphertext: ");

    //for each plain char in string, print encrypted char
    int j;
    for (j = 0; j < strlen(plainText); j++)
    {
        char plainChar = plainText[j];
        printf("%c", (char) encrypt_char(plainChar, cipherKey));
    }
    printf("\n");
    return 0;
}

//encrypt char according to key
char encrypt_char(char plainChar, string key)
{
    if (isalpha(plainChar))
    {
        // get char's alpha index position
        int charIndex = getCharIndex(plainChar);
        char newChar;
        // set cipher char keeping original case
        if (islower(plainChar))
        {
            newChar = tolower(key[charIndex]);
        }
        else
        {
            newChar = toupper(key[charIndex]);
        }
        // return cipher char
        return newChar;
    }
    else
    {
        // print non-alpha char
        return plainChar;
    }
}

//get a chars index A:0 to Z:25
int getCharIndex(char a)
{
        char upChar = toupper(a);
        return upChar - 65;
}