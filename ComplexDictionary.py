import json

inData = '{"quiz": {"sport": {"q1": {"question": "Which one is a correct team name in NBA?","options": ["New York Bulls","Los Angeles Kings","Golden State Warriros","Houston Rocket"],"answer": "Houston Rocket"}},"maths": {"q1": {"question": "5 + 7 = ?","options": ["10","11","12","13"],"answer": "12"},"q2": {"question": "12 - 8 = ?","options": ["1","2","3","4"],"answer": "4"}}}}'
jsonFormat = json.loads(inData)

print (jsonFormat['quiz']['maths']['q1']['question'])

for i in range(4):
	print (jsonFormat['quiz']['maths']['q1']['options'][i])