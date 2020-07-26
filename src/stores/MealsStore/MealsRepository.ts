import axios from 'axios';
import { SERVER } from '../../config/config.json';
import { IMealsResponseType } from 'types/MealsType';

class MealsRepository {
    handleGetMeals = async (school_id: string, office_code: string, date: string) => {
        try {
            const URL: string = `${SERVER}/meals?school_id=${school_id}&office_code=${office_code}&date=${date}`;
            const { data }: { data: IMealsResponseType } = await axios.get(URL);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new MealsRepository();