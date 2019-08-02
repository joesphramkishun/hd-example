from app.components.config import Config
import sendgrid
import re


def send_sg_email(t, f, subj, msg):

    sg = sendgrid.SendGridClient(Config().send_grid_key)
    message = sendgrid.Mail()
    message.add_to(t)
    message.set_subject(subj)
    message.set_text(msg)
    message.set_from(f)
    status, msg = sg.send(message)

