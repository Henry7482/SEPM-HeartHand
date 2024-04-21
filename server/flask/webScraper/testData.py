import json

newdata = [
    {
        "title": "Scientists Discover New Species of Deep-Sea Jellyfish",
        "content": "In a groundbreaking discovery, scientists have identified a new species of deep-sea jellyfish living in the unexplored depths of the ocean. This remarkable finding sheds light on the biodiversity of the ocean floor and underscores the importance of marine conservation efforts."
    },
    {
        "title": "Tech Giant Unveils Revolutionary AI-Powered Virtual Reality Headset",
        "content": "A leading tech company has revealed its latest innovation: an AI-powered virtual reality headset that promises to revolutionize the way we interact with digital content. With advanced features and immersive experiences, this groundbreaking technology opens up new possibilities for entertainment, education, and beyond."
    },
    {
        "title": "Exploring the Wonders of Outer Space: NASA's Ambitious Mission to Mars",
        "content": "NASA embarks on an ambitious mission to explore the wonders of outer space with its upcoming expedition to Mars. Equipped with state-of-the-art technology and scientific instruments, this groundbreaking mission aims to unravel the mysteries of the Red Planet and pave the way for future space exploration."
    },
    {
        "title": "Renowned Chef Shares Secret Recipes for Delicious Vegan Cuisine",
        "content": "Renowned chef and cookbook author shares her secret recipes for delicious vegan cuisine, inspiring home cooks around the world to embrace plant-based cooking. With innovative flavors and nutritious ingredients, these mouthwatering dishes prove that vegan food can be both satisfying and nutritious."
    },
    {
        "title": "Artificial Intelligence Breakthrough: Robots Learn to Mimic Human Emotions",
        "content": "In a significant breakthrough, researchers develop artificial intelligence algorithms that enable robots to mimic human emotions and social interactions. This advancement holds promise for applications in healthcare, therapy, and human-robot collaboration, ushering in a new era of empathetic robotics."
    },
    {
        "title": "World's Largest Solar Power Plant Goes Online, Promises Renewable Energy for Millions",
        "content": "The world's largest solar power plant goes online, harnessing the power of sunlight to generate clean and renewable energy for millions of households. Situated in a sun-drenched desert region, this massive infrastructure project represents a major milestone in the transition towards sustainable energy sources."
    },
    {
        "title": "Epic Fantasy Series Captivates Audiences with Intriguing Plot Twists and Compelling Characters",
        "content": "An epic fantasy series captivates audiences with its intricate plot twists, richly imagined world, and compelling characters. From noble knights to cunning sorcerers, this immersive tale transports viewers to a realm of adventure and magic, captivating audiences of all ages."
    },
    {
        "title": "Breakthrough in Medical Science: Gene Editing Technology Offers Hope for Genetic Disorders",
        "content": "Scientists achieve a breakthrough in medical science with the development of gene editing technology that holds promise for treating genetic disorders and hereditary diseases. With the ability to precisely modify DNA sequences, this revolutionary tool opens up new possibilities for personalized medicine and therapeutic interventions."
    },
    {
        "title": "New Study Reveals Surprising Link Between Coffee Consumption and Longevity",
        "content": "A new study published in a prestigious medical journal reveals a surprising link between coffee consumption and longevity, suggesting that moderate coffee drinkers may enjoy a lower risk of certain age-related diseases. This unexpected finding sparks interest among health enthusiasts and coffee aficionados alike."
    },
    {
        "title": "Exploring Ancient Ruins: Archaeologists Uncover Lost Civilization in Remote Jungle",
        "content": "Archaeologists embark on an expedition to explore ancient ruins hidden deep within a remote jungle, uncovering evidence of a lost civilization that predates recorded history. Through careful excavation and analysis, these intrepid researchers piece together the mysteries of the past, shedding light on humanity's ancient origins."
    },
        {
        "title": "World Association of Master Chefs Offers Free Culinary Training in Vietnam",
        "content": "In a heartwarming gesture, the World Association of Master Chefs has launched a program offering free culinary training to disadvantaged learners in Vietnam. This initiative aims to provide valuable skills and opportunities for individuals facing socioeconomic challenges, empowering them to pursue careers in the culinary arts."
    },
    {
        "title": "Expat's Perspective: Life-Changing Experience of Doing Charity in Vietnam",
        "content": "An expatriate shares their life-changing experience of doing charity work in Vietnam, emphasizing the profound impact it had on their perspective and sense of fulfillment. From volunteering at local orphanages to organizing community clean-up events, charity work in Vietnam offers unique opportunities for personal growth and making a meaningful difference."
    },
    {
        "title": "Kindness Knows No Bounds: Donating Stuffed Animals to Underprivileged Children in Vietnam",
        "content": "A compassionate gesture brightens the lives of underprivileged children in Vietnam as a woman donates stuffed animals won in crane games to bring smiles and comfort to those in need. This heartwarming act of kindness demonstrates the power of generosity and empathy in making a positive impact on the lives of others."
    },
    {
        "title": "Ensuring Protection: COVID-19 Vaccinations for Disabled Workers in Hanoi",
        "content": "Priority vaccination efforts in Hanoi focus on ensuring the protection of disabled workers against COVID-19. As part of the government's commitment to equitable vaccine distribution, special clinics are established to provide accessible and convenient vaccination services for individuals with disabilities, safeguarding their health and well-being."
    },
    {
        "title": "Breaking Barriers: Vietnamese Woman with 'Brittle Bone' Disease Offers Free Classes to Disadvantaged Youths",
        "content": "Despite facing physical challenges due to 'brittle bone' disease, a resilient Vietnamese woman is breaking barriers by offering free classes to disadvantaged youths in her community. Her determination and passion inspire others to overcome obstacles and pursue their dreams, embodying the spirit of resilience and empowerment."
    },
    {
        "title": "From Tragedy to Triumph: Vietnamese Woman's Journey of Helping Disadvantaged Children",
        "content": "Transforming personal tragedy into a beacon of hope, a Vietnamese woman, whose husband set her on fire, now dedicates her life to helping disadvantaged children in Vietnam. Through her unwavering commitment and compassion, she provides love, support, and educational opportunities to those in need, proving that kindness can triumph over adversity."
    },
    {
        "title": "Empowering Generations: Mother and Daughter-in-Law Offer Free Classes to Disadvantaged Children in Vietnam",
        "content": "In a heartwarming display of intergenerational unity, a mother and her daughter-in-law join forces to offer free classes to disadvantaged children in Vietnam. Their collaborative efforts create a nurturing environment where children can learn, grow, and thrive, fostering a sense of community and empowerment."
    },
    {
        "title": "Addressing Water Scarcity: University Donates Fresh Water to Drought-Affected Region in Vietnam",
        "content": "Amidst drought-induced water scarcity, a university in Ho Chi Minh City takes proactive measures to address the crisis by donating 180 cubic meters of fresh water to Vietnam's drought-ridden Long An province. This initiative highlights the importance of solidarity and collective action in mitigating the impact of environmental challenges."
    },
    {
        "title": "Emergency Response: Vietnam's Kien Giang Province Declares State of Emergency Over Land Subsidence",
        "content": "Responding to the urgent threat of land subsidence caused by drought-induced conditions, Vietnam's Kien Giang province declares a state of emergency to mobilize resources and mitigate risks. This proactive measure underscores the government's commitment to safeguarding the welfare of communities and addressing environmental vulnerabilities."
    },
    {
        "title": "Navigating Challenges: Vietnam Farmers Confront Freshwater Scarcity and Salinization",
        "content": "Facing the dual challenges of freshwater scarcity and salinization, farmers in Vietnam's Central Highlands persevere in their efforts to sustain agricultural livelihoods. Despite the adversities posed by climate change, their resilience and resourcefulness drive innovative solutions and community solidarity, ensuring food security and resilience in the face of adversity."
    }
]

# Read data from data.json
with open('server/flask/webScraper/tranningDataV1.json', 'r') as file:
    data = json.load(file)

# Add new data to the existing data object
data["data"] += newdata

# Write data to data2.json
with open('server/flask/webScraper/tranningDataV2.json', 'w') as file:
    json.dump(data, file)


