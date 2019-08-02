
FROM python:3.6.3-stretch

EXPOSE 4040

WORKDIR /var/lib/engine
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
ENV PYTHONPATH="/var/lib/engine"  PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
CMD ["/bin/bash", "-c", "gunicorn --bind 0.0.0.0:4040 --workers 3 app.secretary:__hug_wsgi__"]
