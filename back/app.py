import sys
import os
import json
import tempfile
import yadisk
import uuid

import gridfs
import requests

import pymongo
from bson import ObjectId
from pymongo import TEXT
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from flask import Flask, request, Response, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = None
db = None
db_collection = None
resource = None
fs = None
y = None

status = {
    "HTTP_200_OK": 200,
    "HTTP_400_BAD_REQUEST": 400
}

# Конфигурация доступа к Яндекс.Диск
YANDEX_DISK_TOKEN = 'YOUR_YANDEX_DISK_TOKEN'
YANDEX_DISK_UPLOAD_URL = 'https://cloud-api.yandex.net:443/v1/disk/resources/upload'


@app.route("/", methods=['GET'])
def hello():
    args = request.args.get("name", default=None, type=None)

    return Response(f"Hello {args}!")


@app.route('/videos/<id>', methods=['GET'])
def get_video(id):
    video = db_collection.find_one({"_id": ObjectId(id)})

    if not video:
        return Response("Video not found", status=status["HTTP_400_BAD_REQUEST"])

    video_id = video["videoSrc"]

    video_file = fs.get(ObjectId(video_id))

    tmp_video_file = tempfile.NamedTemporaryFile(delete=False)

    tmp_video_file.write(video_file.read())

    response_data = {
        "videoSrc": tmp_video_file.name
    }

    return Response(json.dumps(response_data), status=status["HTTP_200_OK"], mimetype="application/json")


@app.route('/videos/count/<int:count>', methods=['GET'])
def get_videos_by_count(count):
    db_collection = db['your_collection_name']
    videos = db_collection.find().limit(count)

    response_data = []
    for video in videos:
        response_data.append({
            "id": str(video["_id"]),
            "title": video["title"],
            "description": video["description"],
            "author": video["author"],
            "upload_date": video["upload_date"],
            "imageSrc": video["imageSrc"],
        })

    return Response(json.dumps(response_data), status=status["HTTP_200_OK"], mimetype="application/json")


@app.route('/videos', methods=['GET'])
def get_all_videos():
    videos = db_collection.find()

    response_data = []
    for video in videos:
        video_data = {
            "id": str(video["_id"]),
            "title": video["title"],
            "description": video["description"],
            "author": video["author"],
            "upload_date": video["upload_date"],
            "imageSrc": video["imageSrc"],
        }
        response_data.append(video_data)

    return Response(json.dumps(response_data), status=status["HTTP_200_OK"], mimetype="application/json")


@app.route("/videos", methods=['POST'])
def post_video():
    video = request.files['video']
    filename = video.filename
    tmp_file = tempfile.NamedTemporaryFile(suffix=filename, delete=False)
    video.save(tmp_file.name)

    title = request.form.get('title')
    description = request.form.get('description')
    author = request.form.get('author')
    upload_date = request.form.get('upload_date')
    image = request.files['image']

    try:
        image_id = y.upload(image.stream, f"/storage/images/{str(uuid.uuid4())}")
        image_url = image_id.get_download_link()
    except Exception:
        return Response("Failed to save image file to Yandex Disk", status=status["HTTP_500_INTERNAL_SERVER_ERROR"])

    try:
        video_id = y.upload(video.stream, f"/storage/videos/{str(uuid.uuid4())}")
        video_url = video_id.get_download_link()
    except Exception:
        return Response("Failed to save video file to Yandex Disk", status=status["HTTP_500_INTERNAL_SERVER_ERROR"])

    if not (title and description and author and upload_date and image_url and video_url):
        return Response("Missing required data", status=status["HTTP_400_BAD_REQUEST"])

    db_document = {
        "title": title,
        "description": description,
        "author": author,
        "upload_date": upload_date,
        "imageSrc": str(image_url),
        "videoSrc": str(video_url)
    }

    db_collection.insert_one(db_document)

    return Response("Video successfully added", status=status["HTTP_200_OK"])


if __name__ == "__main__":
    print("App run")
    try:
        f = open('back/resources.json', 'r')
        resource = json.load(f)
        y = yadisk.YaDisk(token='token_here')
        client = pymongo.MongoClient(resource['db_address'], server_api=ServerApi('1'))
        try:
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
        db = client[resource['db_name']]
        fs = gridfs.GridFS(db, collection='fs')
        db_collection = db.get_collection(resource['db_collection'])
        app.run(host=resource['domain'])

    except IOError:
        print("Resource file open error!")