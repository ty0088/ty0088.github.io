#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
} pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
void print_winner(void);
void swap(pair *a, pair *b);
bool checkCycle(int source, int dest);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    // search through candidates array for name
    for (int i = 0; i < candidate_count; i++)
    {
        if (strcmp(candidates[i], name) == 0)
        {
            // name found, update ranks array
            ranks[rank] = i;
            return true;
        }
    }
    // name not found, rank not recorded
    return false;
}

// Update preferences given one voter's ranks
void record_preferences(int ranks[])
{
    for (int i = 0; i < candidate_count - 1; i++)
    {
        for (int j = i + 1; j < candidate_count; j++)
        {
            int iCand = ranks[i];
            int jCand = ranks[j];
            if (preferences[iCand][jCand])
            {
                // if [i][j] already has a value, + 1 to value
                preferences[iCand][jCand] += 1;
            }
            else
            {
                // no value found, set to 1
                preferences[iCand][jCand] = 1;
            }
        }
    }
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    // track current next empty index for pairs
    int pairsIdx = 0;

    // check pairs of candidate with each other (preferences[i][j] vs preferences[j][i])
    for (int i = 0; i < candidate_count - 1; i++)
    {
        for (int j = i + 1; j < candidate_count; j++)
        {
            // add preferred candidate to pairs array if any, increment index
            if (preferences[i][j] > preferences[j][i])
            {
                pairs[pairsIdx].winner = i;
                pairs[pairsIdx].loser = j;
                pairsIdx++;
            }
            else if (preferences[i][j] < preferences[j][i])
            {
                pairs[pairsIdx].winner = j;
                pairs[pairsIdx].loser = i;
                pairsIdx++;
            }
        }
    }

    // update pair_count with number of pairs in array --> pairsIndx
    pair_count = pairsIdx;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    // selection sort (for simplicity) pairs array in descending strength order
    for (int i = 0; i < pair_count - 1; i++)
    {
        int maxIdx = i;
        for (int j = i + 1; j < pair_count; j++)
        {
            if (preferences[pairs[j].winner][pairs[j].loser] > preferences[pairs[maxIdx].winner][pairs[maxIdx].loser])
            {
                // store current max elem index
                maxIdx = j;
            }
        }
        // swap current pair with max pair
        swap(&pairs[maxIdx], &pairs[i]);
    }
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{

    // loop through pairs and check if current pair causes a cycle
    for (int k = 0; k < pair_count; k++)
    {
        int i = pairs[k].winner;
        int j = pairs[k].loser;

        if (!checkCycle(i, j))
        {
            // no cycle found, so lock pair
            locked[i][j] = true;
        }
    }
}

// Print the winner of the election
void print_winner(void)
{
    // Source of graph is any candidate that is not a locked destination/loser
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            if (locked[j][i])
            {
                // locked destination/loser candidate found, move onto next
                break;
            }
            if (j == candidate_count - 1 && !locked[j][i])
            {
                // candidate is not a locked destination/loser, print name
                printf("%s\n", candidates[i]);
            }
        }
    }
}

// function to swap the the position of two pairs
void swap(pair *a, pair *b)
{
    pair temp = *a;
    *a = *b;
    *b = temp;
}

bool checkCycle(int source, int dest)
{
    // if source is same as dest, a cycle is detected
    if (source == dest)
        return true;

    // look through locked array to see if current destination is has any locked sources
    for (int i = 0; i < candidate_count; i++)
    {
        if (locked[dest][i])
        {
            // if locked source, check locked source as destination against original source
            if (checkCycle(source, i))
            {
                // destination ends up at original source, cycle found
                return true;
            }
        }
        
    }

    // no cycle found
    return false;
}