#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void)
{
    // index = 0.0588 * L - 0.296 * S - 15.8
    // where L is the average number of letters per 100 words in the text, and S is the average number of sentences per 100 words in
    // the text.

    string text = get_string("Text: ");
    int letterLen = count_letters(text);
    int wordLen = count_words(text);
    int sentenceLen = count_sentences(text);

    float factor = 100.0 / (float) wordLen;

    float L = (float) letterLen * factor; // average number of letters per 100 words

    float S = (float) sentenceLen * factor; // average number of sentences per 100 words

    float grade = 0.0588 * L - 0.296 * S - 15.8;
    int roundGrade = round(grade);

    if (roundGrade >= 16)
    {
        printf("Grade 16+\n");
    }
    else if (roundGrade < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", roundGrade);
    }
}

int count_letters(string text)
{
    int len = strlen(text);
    int count = 0;
    int i;
    for (i = 0; i < len; i++)
    {
        if (isalpha(text[i]))
        {
            count++;
        }
    }
    return count;
}

int count_words(string text)
{
    int len = strlen(text);
    int count = 0;

    // loop through text chars and check for space
    int i;
    for (i = 0; i < len; i++)
    {
        // non-space char followed by a space +1
        if (text[i] != ' ' && text[i + 1] == ' ')
        {
            count++;
        }
        else if (text[i] != ' ' && i == len - 1)
        {
            count++;
        }
    }
    return count;
}

int count_sentences(string text)
{
    int len = strlen(text);
    int count = 0;

    int i;
    for (i = 0; i < len; i++)
    {
        // current char is alpha followed by .!?
        if (isalpha(text[i]) && (text[i + 1] == '.' || text[i + 1] == '!' || text[i + 1] == '?'))
        {
            count++;
        }
    }
    return count;
}