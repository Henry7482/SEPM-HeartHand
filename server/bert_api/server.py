from fastapi import FastAPI
from .analyzeData import analyzeData
from pydantic import BaseModel
import os
import uvicorn

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host='0.0.0.0', port=port, debug=True)