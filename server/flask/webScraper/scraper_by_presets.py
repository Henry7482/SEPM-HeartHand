import re
import requests 
from bs4 import BeautifulSoup 
import json


# Function to color text
def color_text(text, color_code):
    return f"\033[{color_code}m{text}\033[0m"
RED = "91"
GREEN = "92"

def scraper_by_presets(preset, url):
    # Limit number of articles to scrape
    LIMIT = 5

    # Request access to the website
    try:
        response = requests.get(url)
    except Exception as e:
        print(color_text('-> Failed to retrieve data from the website. Reason: ' + str(e), RED))
        return None

    # If get successful
    if response.status_code == 200:

        print('-> Extracting articles from: ' + url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Get articles from the website
        articles_headers = soup.find_all(preset["article"]["tag"], class_=preset["article"]["class"], limit=LIMIT)
        # print(articles_headers)
        articles_links = [article.find('a')['href'] for article in articles_headers]
        # print(articles_links)

        if len(articles_links) == 0:
            print(color_text('-> No articles found.', RED))
            return None
        
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
                print(color_text('-> Failed to retrieve data from one article.', RED))
                continue

        # Extract data from articles
        scraped_data = []
        print('-> Extracting data from articles...')

        for article in articles:
            title = ""
            content = ""
            try:
                body = article["data"].find(preset["body"]["tag"], class_=preset["body"]["class"])
                # print(body)
                if body:
                    title = body.find(preset["title"]["tag"], class_=preset["title"]["class"]).text.strip()
                    # print(title)
                    if preset["content"]["number_of_elements"] == 1:
                        for p in body.find_all(preset["content"]["tag"], class_=re.compile(preset["content"]["class"])):
                            content += "\n" + p.text.strip()
                    else:
                        content = body.find(preset["content"]["tag"].split(",")[0],  class_=re.compile(preset["content"]["class"].split(",")[0])).text.strip()
                        for p in body.find_all(preset["content"]["tag"].split(",")[1],  class_=re.compile(preset["content"]["class"].split(",")[1])):
                            content += "\n" + p.text.strip()
                    publish_date = body.find(preset["publish_date"]["tag"], class_=preset["publish_date"]["class"]).text.strip()
                    scraped_data.append({
                        "title": title,
                        "content": content,
                        "publish_date": publish_date,
                        "link": article["link"],
                    })
                    print(color_text('-> Article extracted successfully.', GREEN))
                else:
                    print('- No body element found. Trying another way...')
                    tempParent = article["data"].find(preset["title"]["parent"].split(",")[0], class_=re.compile(preset["title"]["parent"].split(",")[1]))
                    # print(tempParent)
                    title = tempParent.find(preset["title"]["tag"], class_=preset["title"]["class"]).text.strip()
                    # print(title)

                    tempParent = article["data"].find(preset["content"]["parent"].split(",")[0], class_=re.compile(preset["content"]["parent"].split(",")[1]))
                    # print(tempParent)
                    if preset["content"]["number_of_elements"] == 1:
                        for p in tempParent.find_all(preset["content"]["tag"], class_=preset["content"]["class"]):
                            content += "\n" + p.text.strip()

                    else:
                        content = tempParent.find(preset["content"]["tag"].split(",")[0],  class_=re.compile(preset["content"]["class"].split(",")[0])).text.strip()
                        for p in tempParent.find_all(preset["content"]["tag"].split(",")[1],  class_=re.compile(preset["content"]["class"].split(",")[1])):
                            content += "\n" + p.text.strip()

                    # print(content)

                    tempParent = article["data"].find(preset["publish_date"]["parent"].split(",")[0], class_=re.compile(preset["publish_date"]["parent"].split(",")[1]))
                    publish_date = tempParent.find(preset["publish_date"]["tag"], class_=preset["publish_date"]["class"]).text.strip()
                    
                    scraped_data.append({
                        "title": title,
                        "content": content,
                        "publish_date": publish_date,
                        "link": article["link"],
                    })
                    print(color_text('-> Article extracted successfully.', GREEN))
            except Exception as e:
                print(color_text('-> Failed to extract data from one article.' + ' Reason: ' + str(e), RED))
                continue
        return scraped_data
    
    # If get failed
    else:
        print(color_text('-> Failed to retrieve data from the website.', RED))
        return None


vnexpress_preset = {
    "article": {
        "tag": "h4",
        "class": "title_news_site",
    },
    "body": {
        "tag": "div",
        "class": "main_fck_detail",
    },
    "title": {
        "tag": "h1",
        "class": "title_post",
    },
    "content": {
        "number_of_elements": 2,
        "tag": "span,p",
        "class": "lead_post_detail row,Normal",
    },
    "publish_date": {
        "tag": "div",
        "class": "author",
    },
}

# vietnamplus_preset = {
#     "article": {
#         "tag": "h3",
#         "class": "",
#     },
#     "body": {
#         "tag": "div",
#         "class": "ExternalClass",
#     },
#     "title": {
#         "tag": "h1",
#         "class": "details__headline cms-title",
#     },
#     "content": {
#         "number_of_elements": 1,
#         "tag": "div",
#         "class": "ExternalClass",
#     },
#     "publish_date": {
#         "tag": "div",
#         "class": "source",
#     },
# }

tuoitrenews_preset = {
    "article": {
        "tag": "h3",
        "class": "",
    },
    "body": {
        "tag": "div",
        "class": "containter",
    },
    "title": {
        "parent": "article,art-header",
        "tag": "h1",
        "class": "",
    },
    "content": {
        "parent": "article,art-body",
        "number_of_elements": 1,
        "tag": "p",
        "class": "",
    },
    "publish_date": {
        "parent": "article,art-header",
        "tag": "div",
        "class": "date",
    },
}

# data = scraper_by_presets(vnexpress_preset, "https://e.vnexpress.net/search/q/natural%20disaster")
# print(data)

# def tester():
#     data = {
#         "one": 1,
#         "two": 2,
#         "three": 3
#     }

#     data_list = [data, data, data]

#     main_list = [data]

#     main_list += data_list
#     print(main_list)


# tester()

