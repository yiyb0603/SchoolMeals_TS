export interface scheduleResponseType {
  status: number;
  message: string;
  data: {
    schedules: [{
      name: string,
      date: string
    }];
  };
}

export interface scheduleCalendarType {
  title: string;
  start: string;
  category: string;
  isVisible: boolean;
}