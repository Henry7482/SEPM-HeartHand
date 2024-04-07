import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# Function scrape data tu website (demo)
def scrape_news():
    url = 'https://dantri.com.vn/tim-kiem/bao+vietnamnet.htm'

    response = requests.get(url)

    # If get successful
    if response.status_code == 200:

        soup = BeautifulSoup(response.content, 'html.parser')

        articles = soup.find_all('___', class_='___') # Chua biet team frontend se dung id/class ntn

        # Vdu store data vao database
        scraped_data = []

        # Extract info tu cac bai bao
        for article in articles:
            title = article.find('h2', class_='article-title').text.strip()
            author = article.find('p', class_='author').text.strip()
            request_donation = article.find('span', class_='donation').text.strip()

            data = {
                'title': title,
                'author': author,
                'donation': request_donation
            }

            # Them dictionary data vao db
            scraped_data.append(data)
        
        return scraped_data
    else:
        print('Failed to retrieve data from the website.')
        return None

data = scrape_news()
for d in data:
    print(d)
