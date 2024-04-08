import requests
from bs4 import BeautifulSoup

# Function scrape data tu website (demo)
def scrape_news():
    url = 'https://e.vnexpress.net/news/news/environment'

    response = requests.get(url)

    # If get successful
    if response.status_code == 200:
        print('-> Extracting data from articles...')

        soup = BeautifulSoup(response.content, 'html.parser')

        articles_headers = soup.find_all('h2', class_='title_news_site', limit=5) 

        articles_links = [article.find('a')['href'] for article in articles_headers]

        articles = []
        for link in articles_links:
            response = requests.get(link)
            if response.status_code == 200:
                articleDic = {}
                article = BeautifulSoup(response.content, 'html.parser')
                articleDic["data"] = article
                articleDic["link"] = link
                articles.append(articleDic)
            else:
                print('-> Failed to retrieve data from one article.')
                continue

        # Vdu store data vao database
        scraped_data = []

        # Extract info tu cac bai bao
        
        for article in articles:
            try:
                title = article.get("data").find('h1', class_='title_post').text.strip()

                content = article.get("data").find('span', class_='lead_post_detail row').text.strip()
                for p in article.get("data").find_all('p', class_='Normal'):
                    content += "\n" + p.text.strip()

                publish_date = article.get("data").find('div', class_='author').text.strip()
                publish_date = publish_date.split('&nbsp')[1]

                data = {
                    'title': title,
                    'content': content,
                    'publish_date': publish_date,
                    'ref_link': article.get("link"),
                }

                # Them dictionary data vao db
                scraped_data.append(data)
            except Exception as e:
                print('=> Failed to extract data from one website.')
                continue
        
        # Convert array of into valid json format
        json_data = {"data": scraped_data}
        print('-> Data extracted successfully.')
        return json_data
    else:
        print('Error: Failed to retrieve data from the website.')
        return None


def tester():
    url = 'https://e.vnexpress.net/news/news/environment'

    response = requests.get(url)

    # If get successful
    if response.status_code == 200:

        soup = BeautifulSoup(response.content, 'html.parser')

        articles_headers = soup.find_all('h2', class_='title_news_site', limit=5) 

        articles_links = [article.find('a')['href'] for article in articles_headers]

        articles = []
        for link in articles_links:
            response = requests.get(link)
            if response.status_code == 200:
                articleDic = {}
                article = BeautifulSoup(response.content, 'html.parser')
                articleDic["data"] = article
                articleDic["link"] = link
                articles.append(articleDic)
            else:
                print('=> Failed to retrieve data from one website.')
                continue

    for article in articles:
        print(article.get("link"))
    

# tester()

# data = scrape_news()
# print(type(data))

