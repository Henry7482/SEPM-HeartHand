from bertopic import BERTopic
import pandas as pd
topic_model = BERTopic.load("MaartenGr/BERTopic_ArXiv")


# Get topic information
print("Getting topic information...")
topic_info = topic_model.get_topic_info()

# Create a DataFrame from the topic information
print("Creating DataFrame from the topic information...")
df_topic_info = pd.DataFrame(topic_info, columns=["Topic", "Count", "Name"])

# Display the DataFrame
print(df_topic_info)
