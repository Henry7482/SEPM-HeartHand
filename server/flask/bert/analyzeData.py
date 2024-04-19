from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import pandas as pd
import json
from umap import UMAP
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Read text data from path
file_path = "message.json" 
documents = []
with open(file_path, 'r') as file:
    response = json.load(file)
    data = response["data"]
    documents = [item["content"] for item in data]
# would be better if there are some preprocessing steps here

# Apply preprocessing to each document
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

for doc in documents:
    preprocessed_doc = preprocess_text(doc)
    if preprocessed_doc:  # Check if the preprocessed document is not empty
        preprocessed_documents.append(preprocessed_doc)

# Tag documents for Doc2Vec
tagged_documents = [TaggedDocument(words=word_tokenize(doc), tags=[str(i)]) for i, doc in enumerate(preprocessed_documents)]

# Train Doc2Vec model
print("Training Doc2Vec model...")
model_doc2vec = Doc2Vec(tagged_documents, vector_size=100, window=5, min_count=1, workers=4, epochs=20)  # Adjust parameters as needed

# Get document vectors
doc2vec_vectors = [model_doc2vec.infer_vector(word_tokenize(doc)) for doc in preprocessed_documents]

# Initialize UMAP model
umap_model = UMAP(n_neighbors=4)

# Fit UMAP model to the document vectors
print("Fitting UMAP model to document vectors...")
umap_embeddings = umap_model.fit_transform(doc2vec_vectors)

# Initialize BERTopic model
print("Initializing BERTopic model...")
model = BERTopic(umap_model=umap_model)

# Fit BERTopic model to the data
print("Fitting BERTopic model to the data...")
topics, _ = model.fit_transform(preprocessed_documents)

# Get topic information
print("Getting topic information...")
topic_info = model.get_topic_info()

# Create a DataFrame from the topic information
print("Creating DataFrame from the topic information...")
df_topic_info = pd.DataFrame(topic_info, columns=["Topic", "Count", "Name"])

# Display the DataFrame
print(df_topic_info)
