import { IMealsResponseType } from "./MealsType";
import { IError } from "./ErrorType";
import { ISearchResponseType } from "./SchoolType";
import { IScheduleCalendarType } from "./ScheduleType";

export interface IMealsStoreType {
  handleGetMeals: (school_id: string, office_code: string, date: string) => Promise<IMealsResponseType | IError>,
  isLoading: boolean;
};

export interface ISearchStoreType {
  handleSchoolSearch: (school_name: string, page: number) => Promise<ISearchResponseType | Error>,
  isLoading: boolean;
};

export interface IScheduleStoreType {
  handleGetSchedules: (school_id: string, office_code: string, month: string) => void | Promise<IError>,
  scheduleList: IScheduleCalendarType[],
  isLoading: boolean,
};