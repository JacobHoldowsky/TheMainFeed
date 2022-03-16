from app.models import db, Post
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_posts():
    post_1 = Post(
        user_id=1, 
        img_src='https://i0.wp.com/alifeallin.com/wp-content/uploads/2019/10/fun-images-26.jpg?fit=1024%2C768&ssl=1',
        text_content='This is awesome!', 
        created_at=datetime.now())
    post_2 = Post(
        user_id=2,
        img_src='https://lisabien.com/wp-content/uploads/2015/09/fun-photo.jpg',
        text_content='I like this! Sooo true.',
        created_at=datetime.now())
    post_3 = Post(
        user_id=3,
        img_src='https://i.guim.co.uk/img/media/a4607856c268dc832452325cbefddc6b1d323e27/0_134_9000_5401/master/9000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8b2bb20f70fb5afa1db647fe8afc1af4',
        text_content='Me on Monday at 3pm.',
        created_at=datetime.now())

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)

    db.session.commit()



def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
