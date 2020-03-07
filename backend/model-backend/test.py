from keras.models import model_from_json
import cv2
import numpy as np

json_file = open('./model/model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
# load weights into new model
model.load_weights("./model/model.h5")
print("Loaded model from disk")

def predict(imgs):
  pred_data = []
  for img in imgs:
    print(img)
    pred_data.append(cv2.resize(img,dsize = (150,150)))

  pred = model.predict(np.array(pred_data))
  
  confidence = []
  for prediction in pred:
    confidence.append({'buildings':prediction[0],'forest': prediction[1],'glacier': prediction[2],'mountain': prediction[3],'sea': prediction[4],'street': prediction[5]})
  return confidence


# img = cv2.imread('D:\projects\image-classifier\data\seg_pred\seg_pred\973.jpg')
# img2 = cv2.imread('D:\projects\image-classifier\data\seg_pred\seg_pred\888.jpg')
# # print([img])
# print(predict([img,img2]))

  
