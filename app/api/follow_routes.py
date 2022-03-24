from flask import Blueprint
from flask_login import current_user, login_required
from app.models import User, follow, db

# from app.models import db, User, follow

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:user_id>/followeds')
@login_required
def get_user_followeds(user_id):
    user = User.query.get(user_id)
    followeds = user.followed.all()
    return {'followeds': [followed.to_dict() for followed in followeds]}

@follow_routes.route('<int:user_id>/followers')
@login_required
def get_user_followers(user_id):
    user = User.query.get(user_id)
    followers = user.followers.all()
    return {'followers': [follower.to_dict() for follower in followers]}

@follow_routes.route('/<int:user_id>/follow', methods=['POST'])
@login_required
def follow(user_id):
    user = User.query.get(user_id)
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()
    
@follow_routes.route('/<int:user_id>/unfollow', methods=['POST'])
@login_required
def unfollow(user_id):
    print('made it in!!!!!!!!!!!!!!!')
    user = User.query.get(user_id)
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()