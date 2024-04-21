from .keywords_extraction import extract_keywords

def extract_prompts(loaded_model, topics, document_sets, top_n):
    topic_counts = {}
    topic_documents = {}

    # Count the number of documents for each topic
    for topic_id in topics:
        if topic_id not in topic_counts:
            topic_counts[topic_id] = 1
            topic_documents[topic_id] = []
        else:
            topic_counts[topic_id] += 1

    # Sort topics by the number of documents in descending order
    sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)

    # Select the top N topics with the most documents
    top_topics = sorted_topics[:top_n]

    # Get representation keywords and associated documents for the top topics
    prompts = []
    for topic_id, _ in top_topics:
        keywords = extract_keywords(loaded_model, topic_id)
        documents = []
        references = []
        for i, t in enumerate(topics):
            if t == topic_id:
                documents.append(document_sets[i]["content"])
                references.append(document_sets[i]["link"])

        # Select at most 3 documents
        prompt= {
                "keywords": keywords,
                "documents": documents[:3],
                "references": references[:3]
                }  
        prompts.append(prompt)

    return prompts

