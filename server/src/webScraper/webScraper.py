import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# Function scrape data tu website (demo)
def scrape_news():
    url = 'https://e.vnexpress.net/news/news/environment'

    response = requests.get(url)

    # If get successful
    if response.status_code == 200:

        soup = BeautifulSoup(response.content, 'html.parser')

        articles_headers = soup.find_all('h2', class_='title_news_site', limit=5) 

        articles_links = [article.find('a')['href'] for article in articles_headers]

        articleDic = {}
        articles = []
        for link in articles_links:
            response = requests.get(link)
            if response.status_code == 200:
                article = BeautifulSoup(response.content, 'html.parser')
                articleDic["data"] = article
                articleDic["link"] = link
                articles.append(articleDic)
            else:
                print('Failed to retrieve data from a website.')
                continue

        # Vdu store data vao database
        scraped_data = []

        # Extract info tu cac bai bao
        for article in articles:

            title = article.get("data").find('h1', class_='title_post').text.strip()

            content = article.get("data").find('span', class_='lead_post_detail row').text.strip()
            for p in article.get("data").find_all('p', class_='Normal'):
                content += "\n" + p.text.strip()

            publish_date = article.get("data").find('div', class_='author').text.strip()
            publish_date = publish_date.split('&nbsp')[1]

            data = {
                'title': title,
                'content': content,
                'publish_date': publish_date
            }

            # Them dictionary data vao db
            scraped_data.append(data)
        
        return scraped_data
    else:
        print('Failed to retrieve data from the website.')
        return None


# def tester():
#     response = requests.get('https://e.vnexpress.net/news/education/vietnam-approves-ielts-one-skill-retake-4730846.html')
#     soup = BeautifulSoup(response.content, 'html.parser')
#     publish_date = soup.find('div', class_='author').text.strip()
#     publish_date = publish_date.split('&nbsp')[1]
#     print(publish_date)

# tester()

data = scrape_news()
for d in data:
    print(d)
