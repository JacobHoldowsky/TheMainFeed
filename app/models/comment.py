from .db import db
# from .user import User

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    comment_content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Text, nullable=False)

    post = db.relationship("Post", back_populates='comments')
    user = db.relationship("User", back_populates='comments')
    
    def to_dict(self):
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_content': self.comment_content,
            'created_at': self.created_at,
            'username': self.user.username,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
