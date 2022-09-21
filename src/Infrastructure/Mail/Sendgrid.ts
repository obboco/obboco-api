import { Ulid } from '../../Domain/Shared/Ulid';
export interface MailConfig {
  apiKey: string;
  to: {
    name: string;
    email: string;
  };
  from: {
    name: string;
    email: string;
  };
  subject: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

// time example 20220427T150000Z
// api key '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'

export class SendgridMail {
  async send(mailConfig: MailConfig): Promise<void> {
    const createdDate: string = new Date().toISOString();
    const uid: string = Ulid.create().value;
    //const ics = require('ics');

    const value = `
BEGIN:VCALENDAR
PRODID:-//example.com//Appointment v1.0//EN
METHOD:REQUEST
VERSION:2.0
BEGIN:VEVENT
ORGANIZER;CN=BookingCat;EMAIL=${mailConfig.from.email}:mailto:TOTTALLY-RANDOM-MAGIC-STRING@imip.me.com
UID:${uid}
DTSTAMP:${createdDate}
LOCATION:${mailConfig.location}
DESCRIPTION:${mailConfig.description}
URL;VALUE=URI:http://organization.com/invite
SEQUENCE:0
SUMMARY:${mailConfig.subject}
DTSTART:${mailConfig.startDate}
DTEND:${mailConfig.endDate}
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=
 TRUE;CN=${mailConfig.to.email};X-NUM-GUESTS=0:mailto:${mailConfig.to.email}
END:VEVENT
END:VCALENDAR
`;

    const SendGrid = require('@sendgrid/mail');
    SendGrid.setApiKey(mailConfig.apiKey);

    const attachment = {
      filename: 'invite.ics',
      name: 'invite.ics',
      content: Buffer.from(value).toString('base64'),
      disposition: 'attachment',
      type: 'text/calendar; method=REQUEST'
    };

    SendGrid.send({
      attachments: [attachment],
      templateId: 'd-dfff61635f5e45d9a27a754d21e6450d',
      from: {
        email: mailConfig.from.email,
        name: mailConfig.from.name
      },
      to: mailConfig.from.email,
      dynamicTemplateData: {}
    })
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
