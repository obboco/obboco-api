import { google } from 'googleapis';

interface CreateCalendarEventCommand {
  access_token: string;
  title: string;
  start_date: string;
  duration: number;
}

export class CreateCalendarEvent {
  constructor() {}

  make(command: CreateCalendarEventCommand): void {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({ access_token: command.access_token });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const startDate = new Date(command.start_date);
    const endDate = new Date(command.start_date);
    endDate.setMinutes(endDate.getMinutes() + command.duration);

    const event = {
      summary: command.title,
      description: 'Obboco: ' + command.title,
      start: {
        dateTime: startDate.toISOString()
      },
      end: {
        dateTime: endDate.toISOString()
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 10 }]
      }
    };

    calendar.events.insert({
      calendarId: 'primary',
      requestBody: event
    });
  }
}
