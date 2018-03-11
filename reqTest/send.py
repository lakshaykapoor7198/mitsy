import requests
files = {'file': open('imgqweqw.jpg', 'rb')}
data = {'type':"pic", "id":"5aa43ac070f66759c63b51d4"}
r = requests.post("http://localhost:3000/upload", files=files, data=data)
print(r.text)