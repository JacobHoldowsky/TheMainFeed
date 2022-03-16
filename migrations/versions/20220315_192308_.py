"""empty message

Revision ID: b4e7ed7ed127
Revises: 218d5576c6d2
Create Date: 2022-03-15 19:23:08.654855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b4e7ed7ed127'
down_revision = '218d5576c6d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('created_at', sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comments', 'created_at')
    # ### end Alembic commands ###