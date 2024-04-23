from openai import OpenAI
import json

client = OpenAI()

MAX_RETRIES = 3
tokenUsed = 0

def generate_blog(prompts):
    # JSON Example
    json_example = {
        "title": "the title of the blog",
        "shortform": "the short summary of the blog",
        "content": "the main content of the blog",
        "tags": ["tag1", "tag2", "tag3"]
    }

    generated_blogs = []

    for prompt in prompts:
        # Prompt Input
        user_prompt = f"Provide output in valid JSON. Write a short blog about the current unfortunate condition in Vietnam, whose topic relates to the following keywords: {prompt['keywords']}. Use these news articles to generate appropriate title and content: {prompt['documents']}. Provide one column for 'title' for the engaging title of the blog, another column for 'shortform' for the short summary of the blog, a column for 'content' for the detailed content of the blog with 100 words only, and a column for 'tags' for the maximum of 5 tags about the generated blog."

        # User Input
        message_list = [{"role": "system", "content": f"Provide output in valid JSON. The data schema is as follows: {json_example}"}]
        message_list.append({"role": "user", "content": user_prompt})

        json_output = None
        valid_output = False
        count = 0

        while not valid_output and count < MAX_RETRIES:
            try:
                # Generate Output
                gpt_output = client.chat.completions.create(
                    model="gpt-3.5-turbo-1106",
                    messages=message_list,
                    response_format={"type": "json_object"}
                    )

                # AI Model Response
                output_text = gpt_output.choices[0].message.content
                finish_reason = gpt_output.choices[0].finish_reason
                global tokenUsed
                tokenUsed = gpt_output.usage.total_tokens

                # Check for output exceptions
                if finish_reason == "length":
                    print("Insufficient tokens led to incomplete response. Please try again.")
                    count += 1
                    continue
                elif finish_reason != "stop":
                    print(f"Model stopped responding. Reason: {finish_reason}. Please try again.")
                    count += 1
                    continue

                # Convert output to JSON   
                json_output = json.loads(output_text)
                json_output['references'] = prompt['references']
                generated_blogs.append(json_output)
                valid_output = True

            except Exception as e:
                print(f"Error: {str(e)}")
                count += 1

    json_data = {"data": generated_blogs}
    return json_data


# # Testing
# prompts = [{'keywords': ['vietnam', 'educ', 'inclus', 'minor', 'initi', 'disabl', 'program', 'opportun', 'thrive', 'creat'], 'documents': ["Vietnam is promoting cultural heritage and preserving the traditions of ethnic minority communities through various initiatives and programs. From cultural festivals to heritage preservation projects, these efforts aim to celebrate and protect the rich diversity of Vietnam's ethnic minorities. ", 'Disaster resilience efforts must prioritize the needs of vulnerable populations, ensuring equity and inclusivity in preparedness and response strategies. By addressing social, economic, and environmental disparities, communities can build resilience that benefits all residents, regardless of their socioeconomic status or background. ', 'Vietnam is empowering minority entrepreneurs by providing support and resources to foster economic inclusion and entrepreneurship in minority communities. From business incubators to microfinance programs, these initiatives aim to create opportunities for minority-owned businesses to thrive and contribute to local economic development. '], 'references': ['article4', 'article7', 'article8']}, {'keywords': ['resili', 'disast', 'risk', 'climat', 'chang', 'flood', 'measur', 'infrastructur', 'impact', 'warn'], 'documents': ['Communities around the world are implementing innovative solutions to mitigate flood risks and enhance disaster resilience. From green infrastructure projects to advanced early warning systems, these initiatives aim to minimize the impact of flooding and protect lives and property. ', 'Engineers and urban planners are incorporating flood-resilient design principles into infrastructure projects to promote sustainable development in flood-prone areas. By elevating buildings, improving drainage systems, and preserving natural floodplains, cities can better withstand the challenges of flooding and adapt to a changing climate. ', 'Community-based flood management initiatives empower local residents to take proactive measures to mitigate flood risks and build resilience. Through education, training, and collaborative planning, communities can develop effective strategies for flood preparedness and response, strengthening their ability to withstand natural disasters. '], 'references': ['article1', 'article2', 'article3']}, {'keywords': ['disast', 'resili', 'measur', 'futur', 'prepared', 'govern', 'respons', 'enhanc', 'natur', 'properti'], 'documents': ['Investing in disaster resilience pays dividends in the form of reduced damage, improved public safety, and enhanced economic stability. By allocating resources to flood risk reduction measures such as levees, stormwater management systems, and emergency preparedness, governments and businesses can protect valuable assets and ensure long-term prosperity. ', 'Breakthrough technologies are advancing disaster resistance efforts, offering new opportunities to enhance resilience and mitigate the impact of drought and other natural disasters. From flood-resistant materials to real-time monitoring systems, these innovations empower communities to build stronger and more resilient infrastructure. '], 'references': ['article5', 'article6']}]

# output = generate_blog(prompts)

# with open("blogs_output.json", "w") as f:
#     json.dump(output, f, indent=4)

# print("File saved successfully.")
# print(f"Token Used: {tokenUsed}")
