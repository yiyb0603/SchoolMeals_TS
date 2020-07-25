import axios from 'axios';
import { SERVER } from '../../config/config.json';

class MealsRepository {
    handleGetMeals = async (school_id: string, office_code: string, date: string) => {
        try {
            const { data } = await axios.get(`${SERVER}/meals?school_id=${school_id}&office_code=${office_code}&date=${date}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default new MealsRepository();