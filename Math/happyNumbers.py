valuelist = [];
value = 32; #input any value here to see if it is perfect

def squareAddDigits(list, number):
	new = 0;
	for i in range(0, len(str(number))):
		new = new + int(str(number)[i])**2;
	return new;



while value != 1 and value not in valuelist:
		valuelist.append(value);
		value = squareAddDigits(valuelist, value);

if (value == 1):
	valuelist.append(value);
	print("Sequence: " + str(valuelist));
	print(str(valuelist[0]) + " is happy because it reaches 1");
else:
	valuelist.append(value);
	print("Sequence: " + str(valuelist));
	print(str(valuelist[0]) + " is unhappy because it will never reach one");


