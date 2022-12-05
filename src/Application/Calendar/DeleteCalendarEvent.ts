import {google} from 'googleapis';

interface DeleteCalendarEventCommand {
  access_token: string;
  title: string;
  start_date: string;
  duration: number;
  time_zone: string;
}

export class DeleteCalendarEvent {
  constructor() {}

  async make(command: DeleteCalendarEventCommand): Promise<void> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({access_token: command.access_token});

    const calendar = google.calendar({version: 'v3', auth: oauth2Client});
    const startDate = new Date(command.start_date);
    const endDate = new Date(command.start_date);
    endDate.setMinutes(endDate.getMinutes() + command.duration);

    const calendarListResult = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 1,
      q: command.title,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      timeZone: command.time_zone,
      singleEvents: true,
    });

    if (
      Array.isArray(calendarListResult.data.items) &&
      calendarListResult.data.items.length
    ) {
      const eventId = calendarListResult.data.items[0].id;
      calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });
    }
  }
}
