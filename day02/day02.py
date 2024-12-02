lines = []

with open("input.txt", "r") as file:
    for line in file:
        lines.append([int(x) for x in line.strip().split()])

def authenticate(entry):
    current_entry_sorted = sorted(entry)
    current_entry_sorted_reversed = sorted(entry, reverse=True)

    if current_entry_sorted != entry and current_entry_sorted_reversed != entry:
        return False
    
    for index in range(len(entry) - 1):
        if abs(entry[index] - entry[index + 1]) == 0:
            return False
        elif abs(entry[index] - entry[index + 1]) > 3:
            return False
    return True

test = [x for x in lines if authenticate(x)]
print("Part 1:", len(test))

def remove_one(entry):
    for index in range(len(entry)):
        current_splice = list(entry)
        del current_splice[index]
        if authenticate(current_splice):
            return True

test_2 = ([x for x in lines if remove_one(x)])
print("Part 2:", len(test_2))