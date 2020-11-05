#https://developer.marvel.com/account

import requests
import hashlib
import json
from tkinter import *

#Get data

def getKeys():
	keys = open("key.txt", "r")
	publicKey = keys.readline().strip()
	privateKey = keys.readline().strip()
	keys.close()
	key = [privateKey, publicKey]
	return key

def getHash(publicKey, privateKey):
	key = "1" + privateKey + publicKey
	result = hashlib.md5(key.encode())
	return result.hexdigest()

key = getKeys()
publicKey = key[1]
result = getHash(key[1], key[0])

url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=T&orderBy=name&ts=1&apikey="+publicKey+"&hash="+result
response = requests.get(url)
data = json.loads(response.text)

#display descriptions

def findDesc():
	descFrame = Frame(root, borderwidth = 1.5)
	descFrame.place(x=40,y=280)
	place = next((index for (index,d) in enumerate(data['data']['results']) if d["name"] == E1.get()), None) #find list index value from name entry
	description = str(data['data']['results'][place]['description'])
	if (description==""):
		description = "There is no description for " + data['data']['results'][place]['name']
	for i in range(5,len(description)): #go down a line after every 50 characters
		if (i%50 == 0):
			if(description[i]==" "):
				description = description[:i] + "\n" + description[i:]
			else:
				description = description[:i] + "-\n" + description[i:] #hyphen if these is no space
	desc = Label(descFrame,text = description, bg="Green", fg="white") #Print description
	desc.pack(side=TOP)

#GUI

root=Tk()
root.geometry("650x500")

#GUI Organization

instructionsframe = Frame(root, borderwidth = 1.5, relief=RAISED, bg="Green")
instructionsframe.place(x=10,y=20)
B1 = Label(instructionsframe, text="Input the name of a marvel character whose\n name starts with the letter T. This\n program will find and display that\n character's description from the marvel website.",fg="green")
B1.pack(side = BOTTOM)
Entryframe = Frame(root,borderwidth = 1.5, relief=RAISED, bg="Green")
Entryframe.place(x=70,y=120)
E1 = Entry(Entryframe)
E1.pack(side=TOP,ipady=10)
Buttonframe = Frame(root,borderwidth = 1.5, relief=RAISED, bg="Green")
Buttonframe.place(x=110,y=200)
B1 = Button(Buttonframe, command = findDesc, text="Find description",fg="Green")
B1.pack(side = BOTTOM)

#display choices

choicesframe = Frame(root, borderwidth = 1.5, relief=RAISED, bg="Green")
choicesframe.place(x=460,y=20)
choices = Label(choicesframe, text="Choices:",fg="Green")
choices.pack(side = BOTTOM)

placeY = 70;
placeX = 400;

for character in data['data']['results']:
	textframe = Frame(root,borderwidth = 1.5, relief=RAISED, bg="Green")
	textframe.place(x=placeX,y=placeY)
	if(len(character['name']) >= 15): #do not display character names that are too long
		continue

	l1 = Label(textframe,text=character['name'],bg="Green",fg="white")
	l1.pack(side = TOP)
	placeY+=40 #each name is displayed lower than the previous one
	if (placeY>430): #second column of names
		placeY = 70;
		placeX+= 120;


root.mainloop();
