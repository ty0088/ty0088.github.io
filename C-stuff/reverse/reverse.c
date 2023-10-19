#include <cs50.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "wav.h"

int check_format(WAVHEADER header);
int get_block_size(WAVHEADER header);

int main(int argc, char *argv[])
{
    // Ensure proper usage
    // TODO #1
    // check 3 arguments entered
    if (argc < 3)
    {
        printf("Usage: ./reverse input.wav output.wav\n");
        return 1;
    }

    // check input file ends in ".wav"
    if (strcmp(strstr(argv[1], "."), ".wav"))
    {
        printf("Input is not a WAV file.\n");
        return 2;
    }

    // check output file ends in ".wav"
    if (strcmp(strstr(argv[2], "."), ".wav"))
    {
        printf("Output is not a WAV file.\n");
        return 3;
    }

    // Open input file for reading
    // TODO #2
    FILE *inputFile = fopen(argv[1], "r");
    if (inputFile == NULL)
    {
        printf("Could not open %s.\n", argv[1]);
        return 4;
    }

    // Read header
    // TODO #3
    WAVHEADER header;
    fread(&header, sizeof(WAVHEADER), 1, inputFile);

    // Use check_format to ensure WAV format
    // TODO #4
    if (!check_format(header))
    {
        printf("Input file is not a WAVE format.\n");
        return 5;
    }

    // Open output file for writing
    // TODO #5
    FILE *outputFile = fopen(argv[2], "w");
    if (outputFile == NULL)
    {
        printf("Could not open %s.\n", argv[2]);
        fclose(inputFile);
        return 6;
    }

    // Write header to file
    // TODO #6
    int writeVal = fwrite(&header, sizeof(WAVHEADER), 1, outputFile);
    if (writeVal < 1)
    {
        printf("Could not write header to output file.\n");
        fclose(inputFile);
        fclose(outputFile);
        return 7;
    }

    // Use get_block_size to calculate size of block
    // TODO #7
    int block_size = get_block_size(header);

    // Write reversed audio to file
    // TODO #8
    // declare array to store each block read
    int data_size = header.subchunk2Size;
    int *dataArray = malloc((data_size / block_size) * sizeof(int));

    // iterate by block size step over the audio data
    for (int i = 1; i <= data_size / block_size; i++)
    {
        // set the pointer from the end of the file to position to read the next block
        // [-1] is the first byte from the end.
        int endPos = -i * block_size;
        fseek(inputFile, endPos, SEEK_END);
        // read the current block from input and write it to output file
        fread(&dataArray[i], block_size, 1, inputFile);
        fwrite(&dataArray[i], block_size, 1, outputFile);
    }

    // check file read/write positions end in the correct place
    long inputPosition = ftell(inputFile);
    long outputPosition = ftell(outputFile);
    // input should be after header, start of data (44) + block_size
    if (inputPosition != 44 + block_size)
    {
        printf("Something went wrong reading the input file...");
        return 8;
    }
    // output should be header + data chunk size
    if (outputPosition != 44 + data_size)
    {
        printf("Something went wrong writing to the output file...");
        return 9;
    }

    free(dataArray);
    fclose(inputFile);
    fclose(outputFile);
}

int check_format(WAVHEADER header)
{
    // TODO #4
    // locate "WAVE" substring
    string result = strstr((string) header.format, "WAVE");
    if (result)
    {
        return true;
    }

    return false;
}

int get_block_size(WAVHEADER header)
{
    // TODO #7
    // block size = number of channels * bytes per sample
    int numChannels = header.numChannels;
    int block_size = numChannels * (header.bitsPerSample / 8);
    return block_size;
}