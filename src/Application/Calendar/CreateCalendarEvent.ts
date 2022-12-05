import {google} from 'googleapis';

interface CreateCalendarEventCommand {
  access_token: string;
  title: string;
  start_date: string;
  duration: number;
  time_zone: string;
}

export class CreateCalendarEvent {
  constructor() {}

  make(command: CreateCalendarEventCommand): void {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({access_token: command.access_token});
    const calendar = google.calendar({version: 'v3', auth: oauth2Client});
    const startDate = new Date(command.start_date);
    const endDate = new Date(startDate.getTime() + command.duration * 60000);

    const event = {
      summary: command.title,
      description: 'Obboco: ' + command.title,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: command.time_zone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: command.time_zone,
      },
      reminders: {
        useDefault: false,
        overrides: [{method: 'popup', minutes: 10}],
      },
    };

    calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
  }
}
