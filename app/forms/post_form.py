from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):

    img_src = StringField('img_src', validators=[DataRequired()])
    text_content = StringField('text_content', validators=[DataRequired()])
    
