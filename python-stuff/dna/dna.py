import csv
import sys


def main():
    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("usage: python dna.py database.csv sequence.txt")
        sys.exit(0)

    # TODO: Read database file into a variable
    dnaDb = []
    with open(sys.argv[1], "r") as dbFile:
        dbReader = csv.DictReader(dbFile)
        dbHeaders = dbReader.fieldnames
        for row in dbReader:
            dnaDb.append(row)

    # TODO: Read DNA sequence file into a variable
    seqFile = open(sys.argv[2], "r")
    dnaSeq = seqFile.read()
    seqFile.close()

    # TODO: Find longest match of each STR in DNA sequence
    # for each STR from db headers (skip "name"), search DNA seq and add results to dict
    matchResults = {}
    for i in range(1, len(dbHeaders)):
        matches = longest_match(dnaSeq, dbHeaders[i])
        matchResults[dbHeaders[i]] = matches

    # TODO: Check database for matching profiles
    result = "No Match"
    # check each person from db
    for person in dnaDb:
        for i in range(1, len(dbHeaders)):
            # check if each STR matches current person
            if int(person[dbHeaders[i]]) != matchResults[dbHeaders[i]]:
                # skip person if no match
                break
        if (
            int(person[dbHeaders[i]]) == matchResults[dbHeaders[i]]
            and i == len(dbHeaders) - 1
        ):
            # if we get to end of checks and last STR still matches, set result to person name
            result = person["name"]
            break
    print(result)

    return result


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):
        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:
            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
