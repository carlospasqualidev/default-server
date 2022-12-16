export interface IAddDaysInDate {
  date: Date;
  days: number;
}
export interface IAddMinutesInDate {
  date: Date;
  minutes: number;
}

export interface IAddTimeDate {
  date: Date;
  addDays?: number;
  addMinutes?: number;
}
