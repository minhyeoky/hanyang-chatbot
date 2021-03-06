from logging import Logger

from flask import Flask
from flask_cors import CORS

from api import api
from utils import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

logger: Logger = app.logger
logger.setLevel(Config.LOG_LEVEL)
logger.propagate = False

api.init_app(app)

if __name__ == "__main__":
    logger.info(f"starting app from local environment...")
    # context = ('/etc/nginx/certificate.crt', '/etc/nginx/private.key') # https 인증서 적용하기
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
