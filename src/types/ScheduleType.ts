export interface IScheduleResponseType {
  status: number;
  message: string;
  data: {
    schedules: [{
      name: string,
      date: string
    }];
  };
}

export interface IScheduleCalendarType {
  title: string;
  start: string;
  category: string;
  isVisible: boolean;
}