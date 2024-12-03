import re

text = ""
with open("input.txt", "r") as file:
    for line in file:
        text += line


def authenticate(text):
    regex = re.compile(r"mul\(\d{1,3},\d{1,3}\)")
    mul_results = regex.findall(text)

    multiply_numbers = re.compile(r"\d{1,3}")

    def str_int(split):
        extracted = multiply_numbers.findall(split)
        numbers = [int(a) for a in extracted]
        return numbers[0] * numbers[1]

    results = map(str_int, mul_results)
    return sum(list(results))


print("Part 1:", authenticate(text))


def authenticate_2(text):
    regex = re.compile(r"do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)")
    mul_results = regex.findall(text)

    accept = True

    def extract(entry):
        nonlocal accept
        if not accept and entry[0] == "m":
            return 0
        elif not accept and entry == "do()":
            accept = True
            return 0
        elif not accept and entry == "don't()":
            return 0
        elif accept and entry == "don't()":
            accept = False
            return 0
        elif accept and entry == "do()":
            return 0

        reg_split = r"\d{1,3}"
        reg_compile = re.compile(reg_split)
        numbers = reg_compile.findall(entry)

        return int(numbers[0]) * int(numbers[1])

    results = sum(list(map(extract, mul_results)))


    return results


print(authenticate_2(text))
