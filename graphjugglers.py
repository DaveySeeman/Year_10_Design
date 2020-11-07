
import math
import matplotlib.pyplot as plt
plt.ylabel('Length of Juggler Sequence')
plt.xlabel('Starting number of Juggler Sequence')
plt.ylim(0, 20)


def ifEven(number1):
	number1 = math.floor(number1 ** (1/2))
	return number1
    
def ifOdd(number2):
	number2 = math.floor(number2 ** (3/2))
	return number2 
    
jugglinglength = 0;
    
for value in range(3,100):
	plt.plot([value-1],[jugglinglength-1], 'ro') #plot values on graph
	jugglinglength = 0;
	while value != 1:
	    if (str(value)[-1] == "0" or str(value)[-1] == "2" or str(value)[-1] == "4" or str(value)[-1] == "6" or str(value)[-1] == "8"):  
	        value = ifEven(value);
	        jugglinglength +=1 
	    if (str(value)[-1] == "1" or str(value)[-1] == "3" or str(value)[-1] == "5" or str(value)[-1] == "7" or str(value)[-1] == "9"): 
	        value = ifOdd(value);
	        jugglinglength +=1

plt.show()