import math;

value = 10; #input any value
print("juggler Sequence For " + str(value) + ":"); 
print(value)

def ifEven(number1):
	number1 = math.floor(number1 ** (1/2))
	print(number1)
	return number1
    
def ifOdd(number2):
	number2 = math.floor(number2 ** (3/2))
	print(number2)
	return number2 
    
    
    
while value != 1:
    if (str(value)[-1] == "0" or str(value)[-1] == "2" or str(value)[-1] == "4" or str(value)[-1] == "6" or str(value)[-1] == "8"):  
        value = ifEven(value);
    if (str(value)[-1] == "1" or str(value)[-1] == "3" or str(value)[-1] == "5" or str(value)[-1] == "7" or str(value)[-1] == "9"): 
        value = ifOdd(value);





