import csv


# Prints all favorites in CSV using csv.reader
# Open CSV file
def one():
    with open("favorites.csv", "r") as file:
        # Create reader
        reader = csv.reader(file)

        # Skip header row
        next(reader)

        # Iterate over CSV file, printing each favorite
        for row in reader:
            # can store favourite in variable
            # print(row[1])
            favorite = row[1]
            print(favorite)


# Prints all favorites in CSV using csv.DictReader
# Open CSV file
def two():
    with open("favorites.csv", "r") as file:
        # Create DictReader
        reader = csv.DictReader(file)

        # Iterate over CSV file, printing each favorite
        for row in reader:
            print(row["language"])


# Counts favorites using variables
# Open CSV file
def three():
    with open("favorites.csv", "r") as file:
        # Create DictReader
        reader = csv.DictReader(file)

        # Counts
        scratch, c, python = 0, 0, 0

        # Iterate over CSV file, counting favorites
        for row in reader:
            favorite = row["language"]
            if favorite == "Scratch":
                scratch += 1
            elif favorite == "C":
                c += 1
            elif favorite == "Python":
                python += 1

    # Print counts
    print(f"Scratch: {scratch}")
    print(f"C: {c}")
    print(f"Python: {python}")


# Counts favorites using dictionary
# Open CSV file
def four():
    with open("favorites.csv", "r") as file:

        # Create DictReader
        reader = csv.DictReader(file)

        # Counts
        counts = {}

        # Iterate over CSV file, counting favorites
        for row in reader:
            favorite = row["language"]
            if favorite in counts:
                counts[favorite] += 1
            else:
                counts[favorite] = 1

    # Print counts
    for favorite in counts:
        print(f"{favorite}: {counts[favorite]}")

    # counts can be sorted by key
    for favorite in sorted(counts):
        print(f"{favorite}: {counts[favorite]}")

    # counts can be sorted by value utilising the get_value fn below
    # for favorite in sorted(counts, key=get_value, reverse=True):
    #     print(f"{favorite}: {counts[favorite]}")

    # can use anonymous fn (lambda) to get value
    # column to examine can be changed in lambda i.e. key=lambda problem: counts[problem]
    for favorite in sorted(counts, key=lambda language: counts[language], reverse=True):
        print(f"{favorite}: {counts[favorite]}")

    # user can provide input
    favorite = input("Favorite: ")
    if favorite in counts:
        print(f"{favorite}: {counts[favorite]}")


    def get_value(language):
        return counts[language]


four()
