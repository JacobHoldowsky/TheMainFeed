from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment_content = StringField(
        'comment_content', validators=[DataRequired()])
