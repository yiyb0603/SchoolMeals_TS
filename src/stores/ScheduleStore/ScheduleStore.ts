import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import moment from 'moment';
import ScheduleRepository from './ScheduleRepository';
import { scheduleResponseType, scheduleCalendarType } from 'type/ScheduleType';
import { Error } from 'type/ErrorType';

@autobind
class ScheduleStore {
    @observable scheduleList: object[] = [];
    @observable isLoading = false;

    @action
    handleGetSchedules = async (school_id: string, office_code: string, date: string) => {
        try {
            this.isLoading = true;
            const response: scheduleResponseType = await ScheduleRepository.handleGetSchedules(school_id, office_code, date);
            const localArray: scheduleCalendarType[] = [];

            for (let i = 0; i < response.data.schedules.length; i++) {
                const scheduleValue = response.data.schedules[i];

                const data: scheduleCalendarType = {
                    title: scheduleValue.name,
                    start: moment(scheduleValue.date).format('YYYY-MM-DD'),
                    category: 'time',
                    isVisible: true,
                }
                
                localArray.push(data);
                this.scheduleList = localArray;
            };
        } catch (error) {
            return new Promise((resolve: () => void, reject: (error: Error) => void) => {
                reject(error);
            });
        } finally {
            this.isLoading = false;
        }
    }
}

export default ScheduleStore;