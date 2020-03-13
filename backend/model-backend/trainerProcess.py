import multiprocessing
import time
import pymongo
from keras.layers import *
from keras.optimizers import *
from keras.models import Sequential
from keras.models import Model
from keras import backend as K
import tensorflow as tf
from utils import get_images
import numpy as np

# from keras import backend as K
# K.set_image_dim_ordering('th')


# class Trainer(multiprocessing.Process):
#     def __init__(self,id):
trainers_db = pymongo.MongoClient("mongodb+srv://classification-models:model123@cluster0-t1t7l.mongodb.net/")
trainers_config_collection = trainers_db['classification-models']['trainers']
model = trainers_config_collection.find({'_id':'xRo9Nxbz'})[0]
print(model['name'])
print(model['config'])
config = model['config']

model = Sequential()
firstDense = True
for layer in config['layers']:
    layer_type = layer['layerType']
    print(layer_type)
    if layer_type == 'convolution_layer':
        k = int(layer['filter'])
        s = int(layer['stride'])
        if layer['sameconvolution'] == 'true':
            model.add(Conv2D(filters=int(layer['numFilters']) , kernel_size=(k,k), input_shape = (160 ,160 ,3), activation='relu', padding= 'same' , strides= (s,s)))
        else:
            model.add(Conv2D(filters=int(layer['numFilters']) , kernel_size=(k,k), input_shape = (160 ,160 ,3), activation='relu'  , strides= (s,s)))
        
    elif layer_type == 'pooling_layer':
        if layer['type'] == 'avg':
            p = int(layer['filter'])
            s = int(layer['stride'])
            model.add(AveragePooling2D(pool_size = (p,p), strides = (s,s) ))
        else:
             model.add(MaxPooling2D(pool_size = (p,p), strides = (s,s) ))
    elif layer_type == 'dense_layer':
        if firstDense:
            model.add(Flatten())
            firstDense=False
        model.add(Dense(units = int(layer['numberOfUnits']) , activation = layer['activation']))

    elif layer_type == 'output_layer':
        model.add(Dense(int(layer['outputs']), activation='softmax'))
        break;

optimizer = None
if config['optimizer'] == 'SGD':
    optimizer = SGD(lr = float(config['learningrate']))
elif config["optimizer"] == 'adam':
    optimizer = adam(lr = float(config['learningrate']))
elif config["optimizer"] == 'RMSprop':
    optimizer = RMSprop(lr = float(config['learningrate']))
elif config["optimizer"] == 'Adagrad':
    optimizer = Adagrad(lr = float(config['learningrate']))
elif config["optimizer"] == 'Adadelta':
    optimizer = Adadelta(lr = float(config['learningrate']))
elif config["optimizer"] == 'Nadam':
    optimizer = Nadam(lr = float(config['learningrate']))
else :
    optimizer = adam(lr = float(config['learningrate']))



model.compile(optimizer =optimizer, 
              loss = config['lossFunction'], 
              metrics = ['accuracy'])

print(model.summary())

images,labels = get_images('./data/seg_train/seg_train/')
images = np.array(images)
labels = np.array(labels)
print(labels.shape)
# labels = labels.reshape(1, -1)
# images = labels.reshape(1,-1)

# print(images.shape)

model.fit(
            images,labels,
            batch_size=32,
            epochs=70,
            verbose=1
        )