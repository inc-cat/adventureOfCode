left_row = []
right_row = []

with open("input.txt", "r") as file:
    for line in file:
        row = line.replace("\n", "").split("   ")
        left_row.append(int(row[0]))
        right_row.append(int(row[1]))

left_row.sort()
right_row.sort()

difference = 0
for entry in range(len(left_row)):
    difference += abs(left_row[entry] - right_row[entry])

print("Part 1:", difference)

total_similarity = 0
for left_side in left_row:
    for right_side in right_row:
        if left_side == right_side:
            total_similarity += left_side

print("Part 2:", total_similarity)
