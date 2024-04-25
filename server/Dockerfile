FROM python:3.11

WORKDIR /code

COPY ./bert_api/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir -r /code/requirements.txt

COPY ./bert_api /code/app

ENV BERTOPIC_MODEL_PATH=/code/app/BARTBaker

EXPOSE 8000

CMD [ "uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8000" ]