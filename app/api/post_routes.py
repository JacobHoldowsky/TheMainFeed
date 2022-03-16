from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import db, User, Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
    """
    Gets all posts
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    """
    Creates a post
    """
    post = Post(
        user_id=current_user.id,
        img_src=request.form['img_src'],
        text_content=request.form['text_content'],
        created_at=datetime.now()
    )
    
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
