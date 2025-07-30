export interface Club {
  id: number,
  day: string,
  time: string,
  description: string,
  location: string | number, // TODO:
  name: string,
  url: string,
  advisor: string,
  advisor_email: string,
  president: string,
  president_email: string,
  tier: string,
  activities: string,
}