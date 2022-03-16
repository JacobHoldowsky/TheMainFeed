# from app.models import db, follow
from app.models.follow import db, follow



def seed_follows():
    follow_1 = follow(followed_id=3, follower_id=1)
    follow_2 = follow(followed_id=2, follower_id=3)
    follow_3 = follow(followed_id=1, follower_id=2)

    db.session.add(follow_1)
    db.session.add(follow_2)
    db.session.add(follow_3)

    db.session.commit()



def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
