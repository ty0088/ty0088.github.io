# TODO


from cs50 import get_string


def main():
    text = get_string("Text: ")
    letterLen = count_letters(text)
    wordLen = count_words(text)
    sentenceLen = count_sentences(text)

    factor = 100 / wordLen
    l = letterLen * factor
    s = sentenceLen * factor
    grade = (0.0588 * l) - (0.296 * s) - 15.8
    roundGrade = round(grade)

    if roundGrade >= 16:
        print("Grade 16+")
    elif roundGrade < 1:
        print("Before Grade 1")
    else:
        print(f"Grade {roundGrade}")


def count_letters(text):
    count = 0
    for char in text:
        if char.isalpha():
            count += 1
    return count


def count_words(text):
    count = 0
    txtLen = len(text)
    for i in range(txtLen):
        if text[i] != " " and i == txtLen - 1:
            count += 1
        elif text[i] != " " and text[i + 1] == " ":
            count += 1
    print(count)
    return count


def count_sentences(text):
    count = 0
    for i in range(len(text)):
        if text[i].isalpha() and (
            text[i + 1] == "." or text[i + 1] == "!" or text[i + 1] == "?"
        ):
            count += 1
    return count


main()
