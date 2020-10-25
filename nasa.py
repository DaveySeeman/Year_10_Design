import requests
from tkinter import *

Average=""

def getKpIndex(): #function that finds average KpIndex for entered month
	Average=""
	AvgTotal=0
	url = "https://api.nasa.gov/DONKI/GST?startDate=" + str(E1.get()) + "-" + str(E2.get()) + "-01&endDate=" + str(E1.get()) + "-" + str(E2.get()) + "-30&api_key=DEMO_KEY"
	response = requests.get(url)
	indstr="kpIndex"
	findall = re.finditer(indstr, response.text)
	matches_positions = [match.start() for match in findall]
	for i in range(0,len(matches_positions)):
		b = slice(matches_positions[i]+9,matches_positions[i]+10)
		AvgTotal = AvgTotal + int(response.text[b])
	Average = AvgTotal/len(matches_positions)
	l7 = Label(indexFrame,text=Average,bg="white",fg="blue")
	l7.pack(side=TOP)


#GUI:


root = Tk()
root.title("Geomagnetic Storms Measurer")
root.geometry("615x320")

topframe = Frame(root,bg="Blue",height=380)
topframe.pack(fill=X)

#date entries
cframe = Frame(root,borderwidth = 1.5, relief=RAISED, bg="blue")
cframe.place(x=17,y=100)
l2 = Label(cframe,text=" Enter Date Below (YYYY,MM)",bg="Blue",fg="white")
l2.pack(side = TOP)
l3 = Label(cframe,text="Year\n\n\n Month",bg="Blue",fg="white")
l3.pack(side = LEFT)
E1 = Entry(cframe)
E1.pack(side=TOP,ipady=10)
E2 = Entry(cframe)
E2.pack(side=TOP,ipady=10)


#submit
submitFrame = Frame(root,borderwidth = 1.5, relief=RAISED)
submitFrame.place(x=100,y=255)
B1 = Button(submitFrame, command = getKpIndex, text="Find KP Index",fg="blue")
B1.pack(side = BOTTOM)

#for answer
labelFrame = Frame(root, borderwidth=1.5, relief=RAISED)
labelFrame.place(x=350,y=150)
l5 = Label(labelFrame, text="Average KP Index on Entered \n    Month:", fg='blue')
l5.pack(side = TOP)
indexFrame = Frame(root,borderwidth = 1.5, relief=RAISED)
indexFrame.place(x=375,y=220)


#info
infoFrame = Frame (root, borderwidth=1.5, relief=RAISED)
infoFrame.place(x=50,y=20)
info = Label(infoFrame, text="KP index is a measure of the severity of geomagnetic storms against a planet. \nThis program finds the average KP index against earth for\n any month from the start of 2015 to the end to 2019.", fg='blue',bg='white')
info.pack(side = TOP)

root.mainloop()
