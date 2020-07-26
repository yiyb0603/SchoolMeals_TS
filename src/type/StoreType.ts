import { mealsResponseType } from "./MealsType";
import { Error } from "./ErrorType";
import { searchResponseType } from "./SchoolType";
import { scheduleCalendarType } from "./ScheduleType";

export interface mealsStoreType {
  handleGetMeals: (school_id: string, office_code: string, date: string) => Promise<mealsResponseType | Error>,
  isLoading: boolean;
};

export interface searchStoreType {
  handleSchoolSearch: (school_name: string, page: number) => Promise<searchResponseType | Error>,
  isLoading: boolean;
};

export interface scheduleStoreType {
  handleGetSchedules: (school_id: string, office_code: string, month: string) => void | Promise<Error>,
  scheduleList: scheduleCalendarType[],
  isLoading: boolean,
};