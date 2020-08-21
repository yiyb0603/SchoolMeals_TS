import { IMealsResponseType } from "./MealsType";
import { IError } from "./ErrorType";
import { ISearchResponseType } from "./SchoolType";
import { IScheduleCalendarType } from "./ScheduleType";

export interface IMealsStoreType {
  handleGetMeals: (school_id: string | string[] | null | undefined, office_code: string | string[] | null | undefined, date: string | string[] | null | undefined)
    => Promise<IMealsResponseType>,
  isLoading: boolean;
};

export interface ISearchStoreType {
  handleSchoolSearch: (school_name: string, page: number) => Promise<ISearchResponseType>,
  isLoading: boolean;
};

export interface IScheduleStoreType {
  handleGetSchedules: (school_id: string | string[] | null | undefined, office_code: string | string[] | null | undefined, month: string | string[] | null | undefined) => Promise<IError>,
  scheduleList: IScheduleCalendarType[],
  isLoading: boolean,
};