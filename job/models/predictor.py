import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import pickle

nltk.download('stopwords')

model = pickle.load(open('./models/Model.pkl','rb'))
jobs = pickle.load(open('./models/jobs.pkl','rb'))
transformer = pickle.load(open('./models/word_2_vec.pkl','rb'))

def cleanresumetext(text):
        text = re.sub("http/S+/s*"," ",text)
        text = re.sub("@/S+"," ",text)
        text = re.sub("/s+"," ",text)
        text = re.sub("[^a-zA-Z0-9]"," ",text)
        

        text = text.lower()
        text = text.split()
        ps = PorterStemmer()
        stop_words = stopwords.words('english')
        stop_words.remove('not')
        text = [ps.stem(word) for word in text if not word in set(stop_words)]
        text = " ".join(text)
        return text

def predictor(text): 
    cleaned_text = cleanresumetext(text)
    print(cleaned_text)
    l = [cleaned_text]
    X = transformer.transform(l)
    y_pred = model.predict(X)
    return jobs['Category'].iloc[y_pred[0]]




