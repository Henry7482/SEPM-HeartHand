import gensim.downloader as api
from bertopic import BERTopic
import os
from .functions.text_processor import preprocess_text
from .functions.prompts_extraction import extract_prompts
from .functions.document_summarizer import summarize
import nltk

# Download necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Load the FastText embedding model
ft = api.load('fasttext-wiki-news-subwords-300')

async def analyzeData(data):
    # LOAD MODEL--------------------------------------------------------------



    # Load the model
    loaded_model = BERTopic.load(os.environ['BERTOPIC_MODEL_PATH'], embedding_model=ft)

    if not loaded_model:
        print("Failed to load model")
    # EXTRACT DATA--------------------------------------------------------------

    # Extract content from each dictionary in new_data
    new_contents = [item["content"] for item in data.data]

    # Ensure new_contents is a list of strings
    new_contents = [str(content) for content in new_contents]

    # Apply preprocessing to each document
    os.environ["TOKENIZERS_PARALLELISM"] = "false"
    preprocessed_new_content = []
    for content in new_contents:
        preprocessed_con = preprocess_text(content)
        if preprocessed_con:  # Check if the preprocessed document is not empty
            preprocessed_new_content.append(preprocessed_con)
        else:
            print("Failed to preprocess a document. Placing original content.")
            preprocessed_new_content.append(content)

    # RUN MODEL--------------------------------------------------------------
    
    # Transform the new data using the loaded model
    topics, _ = loaded_model.transform(preprocessed_new_content)

    # EXTRACT KEYWORDS--------------------------------------------------------------
    
    # Create topic sets
    document_sets = []
    for item in data.data:
        document_sets.append(
            {
                "content": item["content"],
                "link": item["link"]
            }
        )
    # Get prompts from the topics
    prompts = extract_prompts(loaded_model, topics, document_sets, top_n=3)
    
    # Summarize the documents in the prompts
    for prompt in prompts:
        for i, document in enumerate(prompt["documents"]):
            prompt["documents"][i] = summarize(document)

    # Attach hyperlinks to the prompts

    # OUTPUT PROMPTS--------------------------------------------------------------
    return prompts

# # Test
# prompts = analyzeData([
#     {
#         "title": "Mitigating Flood Risks: Innovative Solutions for Disaster Resilience",
#         "content": "Communities around the world are implementing innovative solutions to mitigate flood risks and enhance disaster resilience. From green infrastructure projects to advanced early warning systems, these initiatives aim to minimize the impact of flooding and protect lives and property.",
#         "link": "article1"
#     },
#     {
#         "title": "Building Flood-Resilient Infrastructure: Strategies for Sustainable Development",
#         "content": "Engineers and urban planners are incorporating flood-resilient design principles into infrastructure projects to promote sustainable development in flood-prone areas. By elevating buildings, improving drainage systems, and preserving natural floodplains, cities can better withstand the challenges of flooding and adapt to a changing climate.",
#         "link": "article2"
#     },
#     {
#         "title": "Community-Based Flood Management: Empowering Local Residents to Take Action",
#         "content": "Community-based flood management initiatives empower local residents to take proactive measures to mitigate flood risks and build resilience. Through education, training, and collaborative planning, communities can develop effective strategies for flood preparedness and response, strengthening their ability to withstand natural disasters.",
#         "link": "article3"
#     },
#     {
#         "title": "Promoting Cultural Heritage: Vietnam's Support for Ethnic Minority Communities",
#         "content": "Vietnam is promoting cultural heritage and preserving the traditions of ethnic minority communities through various initiatives and programs. From cultural festivals to heritage preservation projects, these efforts aim to celebrate and protect the rich diversity of Vietnam's ethnic minorities. By recognizing the importance of cultural heritage, Vietnam is fostering pride and resilience within minority communities, ensuring that their unique identities continue to thrive for future generations.",
#         "link": "article4"
#     },
#      {
#         "title": "Investing in Disaster Resilience: The Economic Case for Flood Risk Reduction",
#         "content": "Investing in disaster resilience pays dividends in the form of reduced damage, improved public safety, and enhanced economic stability. By allocating resources to flood risk reduction measures such as levees, stormwater management systems, and emergency preparedness, governments and businesses can protect valuable assets and ensure long-term prosperity.",
#         "link": "article5"
#     },
#     {
#         "title": "Advancing Disaster Resistance: Breakthrough Technologies for Enhanced Resilience",
#         "content": "Breakthrough technologies are advancing disaster resistance efforts, offering new opportunities to enhance resilience and mitigate the impact of drought and other natural disasters. From flood-resistant materials to real-time monitoring systems, these innovations empower communities to build stronger and more resilient infrastructure.",
#         "link": "article6"
#     },
#     {
#         "title": "Empowering Vulnerable Populations: Ensuring Equity in Disaster Resilience Efforts",
#         "content": "Disaster resilience efforts must prioritize the needs of vulnerable populations, ensuring equity and inclusivity in preparedness and response strategies. By addressing social, economic, and environmental disparities, communities can build resilience that benefits all residents, regardless of their socioeconomic status or background.",
#         "link": "article7"
#     },
#     {
#         "title": "Empowering Minority Entrepreneurs: Vietnam's Support for Economic Inclusion",
#         "content": "Vietnam is empowering minority entrepreneurs by providing support and resources to foster economic inclusion and entrepreneurship in minority communities. From business incubators to microfinance programs, these initiatives aim to create opportunities for minority-owned businesses to thrive and contribute to local economic development. By investing in minority entrepreneurs, Vietnam is promoting economic growth, reducing inequality, and building stronger, more resilient communities.",
#         "link": "article8"
#     },
#     {
#         "title": "Strengthening Disability Services: Vietnam's Efforts in Rehabilitation and Support",
#         "content": "Vietnam is strengthening disability services by expanding rehabilitation programs and support services for people with disabilities. From physical therapy centers to assistive technology initiatives, these efforts aim to enhance the quality of life and independence of individuals with disabilities. By prioritizing disability services, Vietnam is ensuring that all its citizens have access to the resources they need to live full and meaningful lives.",
#         "link": "article9"
#     },
#     {
#         "title": "Promoting Minority Representation: Vietnam's Commitment to Political Inclusion",
#         "content": "Vietnam is promoting minority representation and political inclusion through initiatives aimed at increasing the participation of ethnic minorities in decision-making processes and governance structures. From affirmative action policies to minority quota systems, these efforts aim to ensure that minority voices are heard and represented in the political arena. By promoting minority representation, Vietnam is fostering greater diversity and inclusivity in its democratic institutions.",
#         "link": "article10"
#     }
# ])

# print(prompts)



