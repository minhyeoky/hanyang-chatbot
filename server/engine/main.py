from engine.preprocessor import *
from utils import Singleton


class ChatBot(metaclass=Singleton):
    def __init__(self):
        pass

    def response(self, text):
        """전처리, 유사도분석, 카테고리 분류, 답변생성

        1. 전처리
        2. Find Function
        3. Call Adminstrator
        """
        text_clean = clean.clean(text)

        # similarities: OrderedDict = get_similarity(text_clean)
        # answer_pk, confidence = list(similarities.items())
        # answer: db.answer.Answer = db.answer.Answer.objects(pk=answer_pk).next()
        #
        # category = answer.category
        # query = db.query.Query(query=text, answer=answer, confidence=confidence)
        # query.save()

        return text_clean
