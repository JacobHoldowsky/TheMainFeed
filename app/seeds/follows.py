from app.models import db, follow



def seed_likes():
    like_1 = Like(
        user_id=1,
        post_id=3)
    like_2 = Like(
        user_id=3,
        post_id=2)
    like_3 = Like(
        user_id=2,
        post_id=1)

    db.session.add(like_1)
    db.session.add(like_2)
    db.session.add(like_3)

    db.session.commit()



def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
