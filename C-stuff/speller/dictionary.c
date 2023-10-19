// Implements a dictionary's functionality

#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
// N = (27^2 x (26 + 1)) + (27 x (26 + 1)) + 26
const unsigned int N = 20438;

// Hash table
node *table[N];

// Init size of dictionary
int dictSize;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    // 1. hash first 3 chars of word (case insensitive)
    // 2. init relevant hash bucket
    // 3. iterate over hash bucket comparing list->word to word - while(ptr != NULL) and strcasecmp()
    // 4. if word matches, return true
    // 5. end of list (ptr == NULL) and no match, return false

    // printf("\n- check - current word = %s\n", word);
    int hashVal = hash(word);
    node *ptr = table[hashVal];
    while (ptr != NULL)
    {
        // printf("- check - [%s] compare to [%s]\n", ptr->word, word);
        if (strcasecmp(ptr->word, word) == 0)
        {
            // printf("- check - word matches\n");
            return true;
        }
        ptr = ptr->next;
    }

    // printf("- check - no match\n");
    return false;
}

// return char value where A = 0, B = 1, ..., Z = 25, ' = 26
// assume each char will only be alphabetical characters and apostrophe
unsigned int getCharVal(char a)
{
    // printf("- getCharVal - char '%c' value = %i\n", a, toupper(a) - 'A' < 0 ? 26 : toupper(a) - 'A');
    return toupper(a) - 'A' < 0 ? 26 : toupper(a) - 'A';
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    // only the first 3 letters of the word are used for the hash
    // for only char or the last letter of 2 or 3 chars, using getCharVal
    // for any of the chars, add (27^charIdx * (getCharVal(charIdx) + 1)) where charIdx > 0
    int wordLen = strlen(word);

    if (wordLen == 1)
    {
        // printf("- hash - '%s': word length %i\n", word, wordLen);
        return getCharVal(word[0]);
    }
    else if (wordLen == 2)
    {
        // printf("- hash - '%s': word length %i\n", word, wordLen);
        return (27 * (getCharVal(word[0]) + 1)) + getCharVal(word[1]);
    }
    else if (wordLen > 2)
    {
        // printf("- hash - '%s': word length %i\n", word, wordLen);
        return (pow(27, 2) * (getCharVal(word[0]) + 1)) + (27 * (getCharVal(word[1]) + 1)) + getCharVal(word[2]);
    }
    
    return 99999;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO
    // 1. open dictionary file
    // 2. read in strings from file one word at a time
    // 3. create new node for each word, return false is memory allocation fails
    // 4. copy word into node
    // 5. get hash value for current word
    // 6. insert node into hash table at hash value and increase dictSize by 1
    // 7. close file and return true

    int hashVal;
    char word[LENGTH + 1];
    dictSize = 0;

    FILE *dictFile = fopen(dictionary, "r");
    if (dictFile == NULL)
    {
        printf("Could not open %s.\n", dictionary);
        return false;
    }

    while (fscanf(dictFile, "%s", word) != EOF)
    {
        node *newNode = malloc(sizeof(node));
        if (newNode == NULL)
        {
            printf("not enough memory to allocate new node\n");
            return false;
        }
        strcpy(newNode->word, word);
        hashVal = hash(word);
        newNode->next = table[hashVal];
        table[hashVal] = newNode;
        dictSize++;
        // printf("add word to appropriate hash bucket\n");
    }

    // printf("- load - dict size = %i\n", dictSize);

    // if fscanf returns EOF, exit loop, close open file and return true
    fclose(dictFile);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    return dictSize;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    // for each buckety free memory
    int i;
    for (i = 0; i < N; i++)
    {
        node *ptr = table[i];
        while (ptr != NULL)
        {
            node *next = ptr->next;
            free(ptr);
            ptr = next;
        }
    }

    // where to return false for failed unload???
    if (i != N)
    {
        printf("not all memory freed\n");
        return false;
    }

    // printf("memory freed\n");
    return true;
}
