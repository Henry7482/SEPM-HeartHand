import pandas as pd
import gensim.downloader as api
from bertopic import BERTopic
import os
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
import nltk
nltk.download('punkt')

# # Check if the directory exists
# if os.path.exists("/Users/tranphantrongphuc/Documents/GitHub/SEPM-HeartHand/server/flask/bert/BARTBaker"):
#     print("Directory exists.")
# else:
#     print("Directory does not exist.")

# Load the FastText embedding model
ft = api.load('fasttext-wiki-news-subwords-300')

# Load the model
loaded_model = BERTopic.load("/Users/tranphantrongphuc/Documents/GitHub/SEPM-HeartHand/server/flask/bert/BARTBaker", embedding_model=ft)
print("Model loaded successfully")



# TEST MODEL
new_data = [
    {
        "title": "Mitigating Flood Risks: Innovative Solutions for Disaster Resilience",
        "content": "Communities around the world are implementing innovative solutions to mitigate flood risks and enhance disaster resilience. From green infrastructure projects to advanced early warning systems, these initiatives aim to minimize the impact of flooding and protect lives and property."
    },
    {
        "title": "Building Flood-Resilient Infrastructure: Strategies for Sustainable Development",
        "content": "Engineers and urban planners are incorporating flood-resilient design principles into infrastructure projects to promote sustainable development in flood-prone areas. By elevating buildings, improving drainage systems, and preserving natural floodplains, cities can better withstand the challenges of flooding and adapt to a changing climate."
    },
    {
        "title": "Community-Based Flood Management: Empowering Local Residents to Take Action",
        "content": "Community-based flood management initiatives empower local residents to take proactive measures to mitigate flood risks and build resilience. Through education, training, and collaborative planning, communities can develop effective strategies for flood preparedness and response, strengthening their ability to withstand natural disasters."
    },
    {
        "title": "Promoting Cultural Heritage: Vietnam's Support for Ethnic Minority Communities",
        "content": "Vietnam is promoting cultural heritage and preserving the traditions of ethnic minority communities through various initiatives and programs. From cultural festivals to heritage preservation projects, these efforts aim to celebrate and protect the rich diversity of Vietnam's ethnic minorities. By recognizing the importance of cultural heritage, Vietnam is fostering pride and resilience within minority communities, ensuring that their unique identities continue to thrive for future generations."
    },
     {
        "title": "Investing in Disaster Resilience: The Economic Case for Flood Risk Reduction",
        "content": "Investing in disaster resilience pays dividends in the form of reduced damage, improved public safety, and enhanced economic stability. By allocating resources to flood risk reduction measures such as levees, stormwater management systems, and emergency preparedness, governments and businesses can protect valuable assets and ensure long-term prosperity."
    },
    {
        "title": "Advancing Disaster Resistance: Breakthrough Technologies for Enhanced Resilience",
        "content": "Breakthrough technologies are advancing disaster resistance efforts, offering new opportunities to enhance resilience and mitigate the impact of drought and other natural disasters. From flood-resistant materials to real-time monitoring systems, these innovations empower communities to build stronger and more resilient infrastructure."
    },
    {
        "title": "Empowering Vulnerable Populations: Ensuring Equity in Disaster Resilience Efforts",
        "content": "Disaster resilience efforts must prioritize the needs of vulnerable populations, ensuring equity and inclusivity in preparedness and response strategies. By addressing social, economic, and environmental disparities, communities can build resilience that benefits all residents, regardless of their socioeconomic status or background."
    },
    {
        "title": "Empowering Minority Entrepreneurs: Vietnam's Support for Economic Inclusion",
        "content": "Vietnam is empowering minority entrepreneurs by providing support and resources to foster economic inclusion and entrepreneurship in minority communities. From business incubators to microfinance programs, these initiatives aim to create opportunities for minority-owned businesses to thrive and contribute to local economic development. By investing in minority entrepreneurs, Vietnam is promoting economic growth, reducing inequality, and building stronger, more resilient communities."
    },
    {
        "title": "Strengthening Disability Services: Vietnam's Efforts in Rehabilitation and Support",
        "content": "Vietnam is strengthening disability services by expanding rehabilitation programs and support services for people with disabilities. From physical therapy centers to assistive technology initiatives, these efforts aim to enhance the quality of life and independence of individuals with disabilities. By prioritizing disability services, Vietnam is ensuring that all its citizens have access to the resources they need to live full and meaningful lives."
    },
    {
        "title": "Promoting Minority Representation: Vietnam's Commitment to Political Inclusion",
        "content": "Vietnam is promoting minority representation and political inclusion through initiatives aimed at increasing the participation of ethnic minorities in decision-making processes and governance structures. From affirmative action policies to minority quota systems, these efforts aim to ensure that minority voices are heard and represented in the political arena. By promoting minority representation, Vietnam is fostering greater diversity and inclusivity in its democratic institutions."
    }
]


# Extract content from each dictionary in new_data
new_contents = [item["content"] for item in new_data]

# Ensure new_contents is a list of strings
new_contents = [str(content) for content in new_contents]

# PREPROCESS NEW DATA
# Apply preprocessing to each document
os.environ["TOKENIZERS_PARALLELISM"] = "false"
preprocessed_documents = []

# Define stopwords and stemmer
stop_words = set(stopwords.words('english'))
ps = PorterStemmer()

# Preprocessing function
def preprocess_text(text):
    # Lowercasing
    text = text.lower()
    
    # Tokenization
    tokens = word_tokenize(text)
    
    # Removing special characters and punctuation
    tokens = [re.sub(r'[^a-zA-Z0-9]', '', token) for token in tokens]
    
    # Removing stopwords and stemming
    tokens = [ps.stem(token) for token in tokens if token not in stop_words]
    
    # Remove tokens with only one character
    tokens = [token for token in tokens if len(token) > 1]
    
    return " ".join(tokens)

# Preprocess the documents
preprocessed_new_content = []
for content in new_contents:
    preprocessed_con = preprocess_text(content)
    if preprocessed_con:  # Check if the preprocessed document is not empty
        preprocessed_new_content.append(preprocessed_con)





# Transform the new data using the loaded model
topics, _ = loaded_model.transform(preprocessed_new_content)




# EXTRACT KEYWORDS

# Get topic information from the trained model
topic_info = loaded_model.get_topic_info()

# Define a function to extract keywords from topic_info
def extract_keywords(topic_info, topic_id, top_n=10, model=None):
    # Get the representation of the topic
    topic_representation = loaded_model.get_topic(topic_id)
    if topic_representation:
        # Extract top keywords from the topic representation
        topic_keywords = [topic_representation[i][0] for i, keyword in enumerate(topic_representation)]
        return topic_keywords
    else:
        return []  # Return an empty list if no representation found for the topic


# Extract keywords for each topic assigned to the new data
for i, topic_id in enumerate(topics):
    print(f"Keywords for Document {i+1}, Topic {topic_id}:")
    keywords = extract_keywords(topic_info, topic_id)
    print(keywords)

