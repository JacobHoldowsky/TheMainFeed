from .db import db
# from .user import User

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    img_src = db.Column(db.Text)
    text_content = (db.Column(db.Text))
    created_at = db.Column(db.DateTime)
    
    user = db.relationship("User", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post', cascade='all,delete')
    likes = db.relationship("Like", back_populates='post', cascade='all,delete')
    
    def to_dict(self):
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'img_src': self.img_src,
            'text_content': self.text_content,
            'created_at': self.created_at,
            'username': self.user.username,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }