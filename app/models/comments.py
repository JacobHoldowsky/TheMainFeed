from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    comment_content = db.Column(db.text, nullable=False)

    post = db.relationship("Post", back_populates='comments')
    user = db.relationship("User", back_populates='comments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_content': self.comment_content
        }
