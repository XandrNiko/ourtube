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

import numpy as np
import argparse
import pickle
import cv2
import os
import time
from keras.models import load_model
from collections import deque

IMG_SIZE = 128
ColorChannels = 3

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

def detect_violence(video):
    if not os.path.exists('output'):
        os.mkdir('output')

    print("Loading model ...")
    model = load_model('./model.h5')
    Q = deque(maxlen=128)

    vs = cv2.VideoCapture(video)
    (W, H) = (None, None)
    count = 0     
    while True:
        (grabbed, frame) = vs.read()
        ID = vs.get(1)
        if not grabbed:
            break
        try:
            if (ID % 7 == 0):
                count += 1
                n_frames = len(frame)

                if W is None or H is None:
                    (H, W) = frame.shape[:2]

                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                output = cv2.resize(frame, (512, 360)).copy()
                frame = cv2.resize(frame, (128, 128)).astype("float16")
                frame = frame.reshape(IMG_SIZE, IMG_SIZE, 3) / 255
                preds = model.predict(np.expand_dims(frame, axis=0))[0]
                Q.append(preds)

                results = np.array(Q).mean(axis=0)
                i = (preds > 0.6)[0] 

                label = i

                if label:
                    return "Violence"
                else:
                    return "Non-Violence"

            if limit and count > limit:
                break

        except:
            break 

    print("Cleaning up...")
    vs.release()

@app.route("/", methods=['GET'])
def hello():
    args = request.args.get("name", default=None, type=None)

    return Response(f"Hello {args}!")


@app.route('/videos/<id>', methods=['GET'])
def get_video(id):
    db_collection = db.get_collection(resource['db_videos_collection'])
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
    db_collection = db.get_collection(resource['db_videos_collection'])
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
    db_collection = db.get_collection(resource['db_videos_collection'])
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
    authorId = request.form.get('authorId')
    upload_date = request.form.get('upload_date')
    image = request.files['image']

    violence = detect_violence(tmp_file.name)
    if violence == "Violence":
        os.remove(tmp_file.name)
        return Response("The uploaded video contains violent content and cannot be added.", status=status["HTTP_400_BAD_REQUEST"])

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

    if not (title and description and author and authorId and upload_date and image_url and video_url):
        return Response("Missing required data", status=status["HTTP_400_BAD_REQUEST"])


    db_document = {
        "title": title,
        "description": description,
        "author": author,
        "authorId": ObjectId(authorId),
        "upload_date": upload_date,
        "imageSrc": str(image_url),
        "videoSrc": str(video_url)
    }

    db_collection = db.get_collection(resource['db_videos_collection'])
    db_collection.insert_one(db_document)

    return Response("Video successfully added", status=status["HTTP_200_OK"])

@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    db_collection = db.get_collection(resource['db_users_collection'])
    user = db_collection.find_one({"_id": ObjectId(id)})

    if not user:
        return Response("User not found", status=status["HTTP_400_BAD_REQUEST"])
    
    response_data = {
        "email": user["email"],
        "nickname": user["nickname"],
        "profilePic": user["profilePic"]
    }

    return Response(json.dumps(response_data), status=status["HTTP_200_OK"], mimetype="application/json")

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    db_collection = db.get_collection(resource['db_users_collection'])
    user = db_collection.find_one({'email': email})

    if not user:
        return Response("User not found", status=400)

    is_password_match = password == user['password']
    print(is_password_match)

    if not is_password_match:
        return Response("Incorrect email or password", status=400)

    response_data = {
        "id": str(user["_id"]),
    }

    return Response(json.dumps(response_data), status=status["HTTP_200_OK"], mimetype="application/json")


@app.route("/users", methods=['POST'])
def post_user():
    email = request.form.get('email')
    password = request.form.get('password')
    nickname = request.form.get('nickname')
    profilePic = request.files['profilePic']
    print(f"{email} {password} {nickname}")

    try:
        profilePic_id = y.upload(profilePic.stream, f"/storage/images/{str(uuid.uuid4())}")
        profilePic_url = profilePic_id.get_download_link()
    except Exception:
        return Response("Failed to save profile picture file to Yandex Disk", status=status["HTTP_500_INTERNAL_SERVER_ERROR"])

    if not (email and password and nickname and profilePic_url):
        return Response("Missing required data", status=status["HTTP_400_BAD_REQUEST"])

    db_document = {
        "email": email,
        "password": password,
        "nickname": nickname,
        "profilePic": str(profilePic_url)
    }

    db_collection = db.get_collection(resource['db_users_collection'])
    db_collection.insert_one(db_document)

    return Response("User successfully added", status=status["HTTP_200_OK"])


if __name__ == "__main__":
    print("App run")
    try:
        f = open('back/resources.json', 'r')
        resource = json.load(f)
        y = yadisk.YaDisk(token='y0_AgAAAAA56F69AAnoUgAAAADjOKWSqn-vxP03Q56PrV7lrvWM7zmaULs')
        client = pymongo.MongoClient(resource['db_address'], server_api=ServerApi('1'))
        try:
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
        db = client[resource['db_name']]
        app.run(host=resource['domain'])

    except IOError:
        print("Resource file open error!")