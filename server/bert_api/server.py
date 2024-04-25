from fastapi import FastAPI
from .analyzeData import analyzeData
from pydantic import BaseModel

class Data(BaseModel):
    data: list

app = FastAPI()

@app.get("/")
async def read_root():
    return {"messaage": "Hello from Bart Barker!"}

@app.post("/predict")
async def predict(data: Data):
    prompts = await analyzeData(data)
    return prompts