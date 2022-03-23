from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', 
        first_name='Demo', 
        last_name='User', 
        email='demo@aa.io', 
        password='Password!1', 
        profile_pic_src='https://karostartup.com/uploads/company_post/91524.png')
    marnie = User(
        username='MartieParty', 
        first_name='Martin', 
        last_name='Parti', 
        email='marnie@aa.io', 
        password='Password!1',
        profile_pic_src='https://images.assetsdelivery.com/compings_v2/vectorkif/vectorkif1902/vectorkif190200052.jpg')
    bobbie = User(
        username='BobbieReed', 
        first_name='Bob', 
        last_name='Reed', 
        email='bobbie@aa.io', 
        password='Password!1',
        profile_pic_src='https://static.vecteezy.com/system/resources/previews/002/703/202/non_2x/man-avatar-cartoon-character-portrait-free-vector.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
