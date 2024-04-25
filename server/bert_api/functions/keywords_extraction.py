def extract_keywords(loaded_model, topic_id, top_n=10):
    # Get the representation of the topic
    topic_representation = loaded_model.get_topic(topic_id)
    if topic_representation:
        # Extract top keywords from the topic representation
        topic_keywords = [topic_representation[i][0] for i, keyword in enumerate(topic_representation)]
        return topic_keywords
    else:
        return []  # Return an empty list if no representation found for the topic