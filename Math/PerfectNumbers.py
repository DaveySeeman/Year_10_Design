import math
def getFactors(value):
    factorList = [1]
    for f in range(2, math.floor(math.sqrt(value) + 1)):
        if value % f == 0:
            factorList.append(f)
            factorList.append (value // f)
    return factorList

def sumList(list):
    total = 0
    for n in list:
        total += n
    return total

def printPerfect(number, factorTotal):
    if number == factorTotal:
        print (number)


#main
for num in range (2, 1001):
    factors = getFactors(num)
    factorSum = sumList(factors)
    printPerfect(num, factorSum)
print ("List Complete")
