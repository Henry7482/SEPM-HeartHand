import os
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
# Apply preprocessing to each document

preprocessed_documents = []


# Preprocessing function
def preprocess_text(text):
    # Define stopwords and stemmer
    stop_words = set(stopwords.words('english'))
    ps = PorterStemmer()

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