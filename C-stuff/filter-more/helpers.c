#include "helpers.h"
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

// BITMAPFILEHEADER - first header is 14 bytes long (8 bits in a byte).
// BITMAPINFOHEADER - second header is 40 bytes long (8 bits in a byte).
// Immediately following these headers is the actual bitmap. BGR triples.

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    // grayscale when red, green, blue values are the same.
    // take an average of the rgb values.
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            RGBTRIPLE *pixel = &image[i][j];
            int average = round((image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3.0);
            (*pixel).rgbtBlue = average;
            (*pixel).rgbtGreen = average;
            (*pixel).rgbtRed = average;
        }
    }
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // start from i -> top to bottom, j -> left most and right most pixel
    // swap left pixel with right pixel
    // increment towards centre
    // centre line of pixels (if present) will not be swapped
    int right;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width / 2; j++)
        {
            right = width - j - 1;
            RGBTRIPLE *a = &image[i][j];
            RGBTRIPLE *b = &image[i][right];
            RGBTRIPLE tmp = *a;
            *a = *b;
            *b = tmp;
        }
    }
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // new value of each pixel would be the average of the values of all of the pixels that surround it and including itself
    // make a new temp copy of image
    // use temp copy to work out average values and overwrite values in original image

    // allocate memory for temp reference image
    RGBTRIPLE(*refImg)[width] = malloc(sizeof(int[height][width]));
    // check for memory allocation error

    if (refImg == NULL)
    {
        printf("There was a problem allocating memory...");
    }

    // copy image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            refImg[i][j] = image[i][j];
        }
    }

    // current and offset co-ordinates of pixel group
    int offsets[9][2] = {{0, 0}, {-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};

    // get average value of pixel group and set pixel values
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // loop through coords
            int divCount = 0;
            int blueSum = 0;
            int greenSum = 0;
            int redSum = 0;
            for (int k = 0; k < 9; k++)
            {
                int iOff = i + offsets[k][0];
                int jOff = j + offsets[k][1];
                if ((iOff < 0 || iOff > height - 1) || (jOff < 0 || jOff > width - 1))
                {
                    // if offsets are out of bounds, skip current offset
                    continue;
                }
                else
                {
                    // if offsets valid, sum RGB values and +1 to divCount
                    blueSum += refImg[iOff][jOff].rgbtBlue;
                    greenSum += refImg[iOff][jOff].rgbtGreen;
                    redSum += refImg[iOff][jOff].rgbtRed;
                    divCount++;
                }
            }
            // divide RGB values by divCount to get averages and set to image[i][j]
            RGBTRIPLE *pixel = &image[i][j];
            (*pixel).rgbtBlue = round(blueSum / (double) divCount);
            (*pixel).rgbtGreen = round(greenSum / (double) divCount);
            (*pixel).rgbtRed = round(redSum / (double) divCount);
        }
    }

    // free memory
    free(refImg);
}

int cap255(int a);

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // for each pixel, sum the product of each surrounding pixel colour multiplied by its relevant G value
    // do this for x and y directions
    // get final value (G^2 = Gx^2 + Gy^2)

    // offset co-ordinates of pixel group and gx/gy values
    int offsets[8][2] = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};
    int gxVal[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int gyVal[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

    // make a copy of the image to use as ref
    // allocate memory for temp reference image
    RGBTRIPLE(*refImg)[width] = malloc(sizeof(int[height][width]));

    // check for memory allocation error
    if (refImg == NULL)
    {
        printf("There was a problem allocating memory...");
    }

    // copy image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            refImg[i][j] = image[i][j];
        }
    }

    // for each pixel, get Gx and Gy, sum each one, get G, then round and cap G if req
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int blueGx = 0, blueGy = 0;
            int greenGx = 0, greenGy = 0;
            int redGx = 0, redGy = 0;
            for (int k = 0; k < 8; k++)
            {
                // get Gx and Gy of each colour for pixel group and add to sums
                int iOff = i + offsets[k][0];
                int jOff = j + offsets[k][1];
                int gOffI = 1 + offsets[k][0]; // g offset i relative to the centre pixel (1, 1)
                int gOffJ = 1 + offsets[k][1]; // g offset j relative to the centre pixel (1, 1)
                if ((iOff >= 0 && iOff < height) && (jOff >= 0 && jOff < width))
                {
                    // if pixel is within bounds, add values to sums
                    // out of bound pixels are counted as 0 value (ignore)
                    blueGx += (gxVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtBlue);
                    blueGy += (gyVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtBlue);
                    greenGx += (gxVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtGreen);
                    greenGy += (gyVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtGreen);
                    redGx += (gxVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtRed);
                    redGy += (gyVal[gOffI][gOffJ] * refImg[iOff][jOff].rgbtRed);
                }
            }
            // get G values, round and capped to 255
            int gBlue = cap255(round((sqrt(pow(blueGx, 2) + pow(blueGy, 2)))));
            int gGreen = cap255(round((sqrt(pow(greenGx, 2) + pow(greenGy, 2)))));
            int gRed = cap255(round((sqrt(pow(redGx, 2) + pow(redGy, 2)))));

            // set new pixel value to image
            RGBTRIPLE *pixel = &image[i][j];
            (*pixel).rgbtBlue = gBlue;
            (*pixel).rgbtGreen = gGreen;
            (*pixel).rgbtRed = gRed;
        }
    }
    // free memory
    free(refImg);
}

// function to cap an int to max of 255
int cap255(int a)
{
    if (a > 255)
        return 255;
    return a;
}
