from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    comment_content = TextAreaField(
        'comment_content', validators=[DataRequired()])
