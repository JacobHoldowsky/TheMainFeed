from app.models import db, Comment
from datetime import datetime



def seed_comments():
    comment_1 = Comment(
        user_id=1,
        post_id=3,
        comment_content='LOL!',
        created_at=datetime.now())
    comment_2 = Comment(
        user_id=3,
        post_id=2,
        comment_content='I like this!',
        created_at=datetime.now())
    comment_3 = Comment(
        user_id=2,
        post_id=1,
        comment_content='Super cool!',
        created_at=datetime.now())

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)

    db.session.commit()



def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
