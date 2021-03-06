from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.post import Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/posts')
@login_required
def user_posts(user_id):
    user_posts = Post.query.filter(Post.user_id == user_id).order_by(Post.created_at.desc()).all()
    return {'user_posts': [post.to_dict() for post in user_posts]}
