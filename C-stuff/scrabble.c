#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Points assigned to each letter of the alphabet
int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

int compute_score(string word);

int main(void)
{
    // Get input words from both players
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    // Score both words
    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    // TODO: Print the winner
    if (score1 > score2)
    {
        printf("Player 1 wins!\n");
    }
    else if (score1 < score2)
    {
        printf("Player 2 wins!\n");
    }
    else
    {
        printf("Tie!\n");
    }
}

int compute_score(string word)
{
    // TODO: Compute and return score for string
    int wordLen = strlen(word);
    int totalScore = 0;
    int i;
    for (i = 0; i < wordLen; i++)
    {
        // for each char in string find char decimal (ignore case)
        char upChar = toupper(word[i]);
        int charDec = upChar - 65;
        printf("char = %c\n", upChar);
        printf("charDec = %i\n", charDec);
        if (charDec >= 0 && charDec <= 25)
        {
            // if char is a letter, add its score to total
            printf("char is letter and worth %i points\n", POINTS[charDec]);
            totalScore += POINTS[charDec];
        }
        printf("total score = %i\n", totalScore);
    }

    return totalScore;
}
