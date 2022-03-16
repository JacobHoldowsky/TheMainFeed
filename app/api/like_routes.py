from flask import Blueprint
from flask_login import current_user

from app.models import db, User, Like

like_routes = Blueprint('likes', __name__)
