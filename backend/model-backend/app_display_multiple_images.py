import os
import io
import numpy as np
import cv2
from flask import Flask, request, render_template, send_from_directory,jsonify
import tensorflow as tf
from keras.models import load_model
# import test
from keras.models import model_from_json
from keras.backend import set_session
from keras.optimizers import SGD
from flask_cors import CORS

# g1 = tf.Graph()
# model = None
# sess = tf.Session()
# set_session(sess)

def init():
    print("init called")
    sess = tf.InteractiveSession()
    json_file = open('./model/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    model = model_from_json(loaded_model_json)
    model.load_weights("./model/model.h5")
    model.compile(optimizer=SGD(lr=0.0001), loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    # print(model.summary())
    graph = tf.get_default_graph()
    return model, sess, graph

global model, sess, graph
model, sess, graph = init()
app = Flask(__name__)
CORS(app)

# @app.before_first_request
# def init_stuff():
    
#     load_all_model()

# def load_all_model():
#     global model
#     global g1
#     global sess
#     with sess.as_default():
#         with g1.as_default():
#             # basic response model
            # json_file = open('./model/model.json', 'r')
            # loaded_model_json = json_file.read()
            # json_file.close()
            # model = model_from_json(loaded_model_json)
            # model.load_weights("./model/model.h5")
        # model= load_model('./model/model.h5')

# 
# # load weights into new model
# print("Loaded model from disk")





APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route("/",methods=["POST"])
def index():
    return 'hello world'

@app.route("/upload", methods=["POST"])
def upload():
    print('dsfd')
    target = os.path.join(APP_ROOT, 'images/')
    print(target)
    if not os.path.isdir(target):
            os.mkdir(target)
    else:
        print("Couldn't create upload directory: {}".format(target))
    print(request.files.getlist('files[]'))
    data_for_pred = [];
    for upload in request.files.getlist("files[]"):
        # print(upload)
        in_memory_file = io.BytesIO()
        # print("{} is the file name".format(upload.filename))
        filename = upload.filename
        destination = "/".join([target, filename])
        # print ("Accept incoming file:", filename)
        # print ("Save it to:", destination)
        upload.save(destination)
        # data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        img = cv2.imread(destination)
        data_for_pred.append(img)

    # return send_from_directory("images", filename, as_attachment=True)
    #return render_template("complete.html", image_name=filename)
    # image_names = os.listdir('./images')
    # print(image_names)
    pred_data = []
    for img in data_for_pred:
        # print(img)
        pred_data.append(cv2.resize(img,dsize = (150,150))) 

    global graph
    global sess
    pred = None
    with sess.as_default():
        with graph.as_default():
            pred = model.predict(np.array(pred_data))
  
    confidence = []
    for prediction in pred:
        confidence.append({'buildings':str(prediction[0]),'forest': str(prediction[1]),'glacier': str(prediction[2]),'mountain': str(prediction[3]),'sea': str(prediction[4]),'street': str(prediction[5])})
    print(confidence)
    return jsonify(confidence)
    # return render_template("gallery.html", image_names=image_names)

@app.route('/upload/<filename>')
def send_image(filename):
    return send_from_directory("images", filename)

@app.route('/gallery')
def get_gallery():
    image_names = os.listdir('./images')
    print(image_names)
    return render_template("gallery.html", image_names=image_names)

if __name__ == "__main__":
    app.run(port=4555, debug=True)
    