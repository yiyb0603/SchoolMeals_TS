import { SERVER } from '../../config/config.json';
import axios from 'axios';
import { IScheduleResponseType } from 'types/ScheduleType';

class ScheduleRepository {
    handleGetSchedules = async (school_id: string, office_code: string, date: string) => {
        try {
            const URL: string = `${SERVER}/schedule?school_id=${school_id}&office_code=${office_code}&date=${date}`;
            const { data }: { data: IScheduleResponseType } = await axios.get(URL);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ScheduleRepository();