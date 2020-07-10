import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import moment from 'moment';
import ScheduleRepository from './ScheduleRepository';

@autobind
class ScheduleStore {
    @observable scheduleList = [];

    @action
    handleGetSchedules = async (school_id: string, office_code: string, date: string) => {
        try {
            const response: { status: number; data: { schedules: any; }; } = await ScheduleRepository.handleGetSchedules(school_id, office_code, date);

            const localArray: any = [];

            for (let i = 0; i < response.data.schedules.length; i++) {
                const scheduleValue = response.data.schedules[i];

                type scheduleResponseInfo = {
                    title: string;
                    start: Date | string;
                    category: string;
                    isVisible: boolean;
                }

                const data: scheduleResponseInfo = {
                    title: scheduleValue.name,
                    start: moment(scheduleValue.date).format('YYYY-MM-DD'),
                    category: 'time',
                    isVisible: true,
                }
                
                localArray.push(data);
                this.scheduleList = localArray;
            }

            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
}

export default ScheduleStore;