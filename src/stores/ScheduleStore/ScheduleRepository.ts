import { SERVER } from '../../config/config.json';
import axios from 'axios';

class ScheduleRepository {
    handleGetSchedules = async (school_id: string, office_code: string, date: string) => {
        try {
            const { data } = await axios.get(`${SERVER}/schedule?school_id=${school_id}&office_code=${office_code}&date=${date}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ScheduleRepository();