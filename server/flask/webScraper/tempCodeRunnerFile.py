# Read data from JSON file
with open('./server/flask/webScraper/data.json', 'r') as file:
    data = json.load(file)

# Print out the "title" attribute
for article in data['data']:
    print(article['title'])