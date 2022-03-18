from datetime import datetime
from xml.etree.ElementTree import Comment
from app.forms.post_form import PostForm
from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import db, User, Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_followed_posts():
    """
    Gets all followed posts
    """
    posts = current_user.followed_posts()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:post_id>')
def get_post(post_id):
    """
    Gets a post detail page
    """
    post = Post.query.get(post_id)
    return post.to_dict()

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    """
    Creates a post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            img_src=request.form['img_src'],
            text_content=request.form['text_content'],
            created_at=datetime.now()
        )
        
        user = User.query.get(current_user.id)

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
        

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    """
    Deletes a post
    """
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    
    return post.to_dict()

@post_routes.route('/<int:post_id>', methods=['POST'])
def update_post(post_id):
    """
    Updates a post
    """
    form = PostForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(post_id)
    post.img_src = form.img_src
    post.text_content = form.text_content
    
    db.session.commit()
    return post.to_dict()

