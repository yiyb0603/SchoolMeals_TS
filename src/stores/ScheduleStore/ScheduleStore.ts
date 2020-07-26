import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import moment from 'moment';
import ScheduleRepository from './ScheduleRepository';
import { IScheduleResponseType, IScheduleCalendarType } from 'types/ScheduleType';
import { IError } from 'types/ErrorType';

@autobind
class ScheduleStore {
    @observable scheduleList: IScheduleCalendarType[] = [];
    @observable isLoading = false;

    @action
    handleGetSchedules = async (school_id: string, office_code: string, date: string) => {
        try {
            this.isLoading = true;
            const response: IScheduleResponseType = await ScheduleRepository.handleGetSchedules(school_id, office_code, date);
            const localArray: IScheduleCalendarType[] = [];

            for (let i = 0; i < response.data.schedules.length; i++) {
                const scheduleValue = response.data.schedules[i];

                const data: IScheduleCalendarType = {
                    title: scheduleValue.name,
                    start: moment(scheduleValue.date).format('YYYY-MM-DD'),
                    category: 'time',
                    isVisible: true,
                }
                
                localArray.push(data);
                this.scheduleList = localArray;
            };
        } catch (error) {
            return new Promise((resolve: () => void, reject: (error: IError) => void) => {
                reject(error);
            });
        } finally {
            this.isLoading = false;
        }
    }
}

export default ScheduleStore;