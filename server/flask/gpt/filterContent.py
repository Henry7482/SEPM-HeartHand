from openai import OpenAI
import ast

client = OpenAI()

MAX_RETRIES = 3
tokenUsed = 0

def filter_content(title_array):
    # String Example
    string_example = "[\"World Association of Master Chefs in Vietnam offers free training to disadvantaged learners\", \"Doing charity in Vietnam from an expat’s perspective: ‘It will change your life forever’\", \"In Vietnam, woman donates stuffed animals won in crane games to poor kids,Disabled workers in Hanoi given COVID-19 jabs\"]"

    # Prompt Input
    prompt = f"Provide output in valid string array format. From the following list of news titles, CAREFULLY filter and provide me titles that are MOST RELEVANT to the problems, circumstances and unfortunate situation in Vietnam that would best needed for charity or support. Here is the list of news titles: {title_array}."

    # User Input
    message_list = [{"role": "system", "content": f"Provide output in valid string array format. The data schema is as follows: {string_example}"}]
    message_list.append({"role": "user", "content": prompt})

    list_output = None
    valid_output = False
    count = 0

    while not valid_output and count < MAX_RETRIES:
        try:
            # Generate Output
            gpt_output = client.chat.completions.create(
                model="gpt-3.5-turbo-1106",
                messages=message_list,
                response_format={"type": "text"}
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
            list_output = ast.literal_eval(output_text)
            valid_output = True

        except Exception as e:
            print(f"Error: {str(e)}")
            count += 1

    return list_output

# Testing
# title_array = [
#     "North to heat up again after cool spell",
#     "Fine dust pollution worsening in Hanoi",
#     "Vietnam’s southern, Central Highlands localities told to brace for more intense rainfall",
#     "Hoi An evacuates residents as flooding worsens",
#     "Thailand mobilizes forces to tackle air pollution crisis",
#     "New Zealand to continue supplying development assistance to Vietnam: PM John Key",
#     "​Vietnamese natural disaster agency proposes spending $13,200 on raincoats for senior officials"]

# output = filter_content(title_array)
# print(f"Output: {output}")
# print(f"Token Used: {tokenUsed}")
