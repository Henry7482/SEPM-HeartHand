from bertopic import BERTopic 
import json
import pandas as pd

# model = BERTopic()

# # Read text data from path
# file_path = "bert/message.json" 
# documents = []
# with open(file_path, 'r') as file:
#     data = json.load(file)
#     for item in data:
#         documents.append(item["text"])

# topics, _ = model.fit_transform(documents)
# top_topics = model.get_topic_info()

# print("Top Topics:")
#print(top_topics)


with open("BERT/message.txt", "r", encoding = "utf-8") as f:
    docs = json.load(f)
titles = [article["title"] for article in docs]
# len(docs)
# for title in titles:
#   print(title)
topic_model = BERTopic(embedding_model = "all-MiniLM-L6-v2")
topics, probs = topic_model.fit_transform(docs)
# topic_model.get_topic_info()
df = pd.DataFrame({"topic": topics, "document": docs})
# df