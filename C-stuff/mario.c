#include <cs50.h>
#include <stdio.h>

int main(void)
{
    //prompt for heigh
    int height;
    do
    {
        height = get_int("Height: ");
    }
    while (height < 1 || height > 8);

    // height = 1 --> 7 spaces + 1 hash + 2 spaces + 1 hash + new line
    // height = 2 --> 6 spaces + 2 hash + 2 spaces + 2 hash + new line
    // height = 3 --> 5 spaces + 3 hash + 2 spaces + 3 hash + new line
    // height = 4 --> 4 spaces + 4 hash + 2 spaces + 4 hash + new line
    // height = 5 --> 3 spaces + 5 hash + 2 spaces + 5 hash + new line
    // height = 6 --> 2 spaces + 6 hash + 2 spaces + 6 hash + new line
    // height = 7 --> 1 spaces + 7 hash + 2 spaces + 7 hash + new line
    // height = 8 --> 8 hash + 2 spaces + 8 hash + new line

    //print each line
    int i;
    for (i = 0; i < height; i++)
    {
        //print initial spaces before bricks
        int j;
        for (j = 1; j < height - i; j++)
        {
            printf(" ");
        }

        //print left bricks
        int k;
        for (k = 0; k <= i; k++)
        {
            printf("#");
        }

        //print gap
        printf("  ");

        //print right bricks
        for (k = 0; k <= i; k++)
        {
            printf("#");
        }

        //print new line
        printf("\n");
    }
}