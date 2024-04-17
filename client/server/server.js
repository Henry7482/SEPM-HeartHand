const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/test', (req, res) => {
    res.json({ message: [
        {
            "_id": "66124d72f4a2383116da8b43",
            "title": "Test Blog",
            "shortform": "This is a test blog",
            "content": "This is a test blog",
            "date": "2024-04-07T07:38:26.375Z",
            "keywords": [
                "test",
                "blog"
            ],
            "references": [
                "test",
                "blog"
            ],
            "imageURL": "https://www.google.com",
            "__v": 0
        },
        {
            "_id": "6612504c6929fddb5c0984ef",
            "title": "Vietnam's COVID-19 Crisis",
            "shortform": "Vietnam is currently facing a severe COVID-19 outbreak, with the virus claiming the lives of over 10 people in Hanoi alone. Families across the country are devastated by the loss of their loved ones, and the situation is dire.",
            "content": "The government has implemented strict lockdown measures to curb the spread of the virus, but the situation remains grim. The people of Vietnam are in desperate need of help, and the international community must come together to support them in this difficult time.",
            "date": "2024-04-07T07:50:36.059Z",
            "keywords": [
                "test",
                "blog"
            ],
            "references": [
                "test",
                "blog"
            ],
            "imageURL": "https://www.google.com",
            "__v": 0
        },
        {
            "_id": "6612c1b7764a9d2bfa3ae084",
            "title": "Vietnam's COVID-19 Crisis",
            "shortform": "Vietnam is currently facing a severe COVID-19 outbreak, with the virus claiming over 10 lives in Hanoi. Families are devastated, and the situation is dire.",
            "content": "The government has implemented strict lockdown measures to curb the spread of the virus, but the situation remains grim. The people of Vietnam are in desperate need of help, and the international community must come together to support them in this difficult time. The need for mass testing is urgent to effectively identify and isolate cases. The impact of the pandemic has been devastating, emphasizing the critical need for global solidarity and assistance.",
            "date": "2024-04-07T15:54:31.142Z",
            "keywords": [
                "test",
                "blog"
            ],
            "references": [
                "test",
                "blog"
            ],
            "imageURL": "https://www.defaultURL.com",
            "__v": 0
        },
        {
            "_id": "661fc91827e4a8c5973134f1",
            "title": "Vietnam's COVID-19 Crisis",
            "shortform": "Vietnam is currently facing a severe COVID-19 outbreak, with the virus claiming the lives of over 10 people in Hanoi alone. Families across the country are devastated by the loss of their loved ones, and the situation is dire.",
            "content": "The government has implemented strict lockdown measures to curb the spread of the virus, but the situation remains grim. The people of Vietnam are in desperate need of help, and the international community must come together to support them in this difficult time.",
            "date": "2024-04-17T13:05:28.574Z",
            "keywords": [
                "test",
                "blog"
            ],
            "references": [
                "test",
                "blog"
            ],
            "imageURL": "https://www.defaultURL.com",
            "__v": 0
        }
    ] });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });