from flask import Blueprint, request
from flask_login import current_user, login_required
from datetime import datetime
from app.models import db, User, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:post_id>')
def get_all_post_comments(post_id):
    """
    Gets all comments for a post
    """
    post_comments = Comment.query.filter(Comment.post_id==post_id).join(User, User.id == Comment.user_id).all()
    this = {'post_comments': post_comments}
    print(this)
    return this

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def create_comment(post_id):
    """
    Creates a comment
    """
    user = User.query.get(current_user.id)
    form = CommentForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            post_id=post_id,
            comment_content=form.data['comment_content'],
            created_at=datetime.now()
        )
        
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    
@comment_routes.route('<int:id>', methods=['DELETE'])
def delete_comment(id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()


@comment_routes.route('/<int:comment_id>', methods=['POST'])
def update_comment(comment_id):
    """
    Updates a comment
    """
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(comment_id)
    comment.comment_content = form.text_content

    db.session.commit()
    return comment.to_dict()
