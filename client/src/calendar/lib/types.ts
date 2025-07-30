export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
};
  location?: string;
  htmlLink: string;
}

export interface SelectedEventDetails extends CalendarEvent {
  formattedStart: string;
  formattedEnd: string;
  isAllDay: boolean;
}
