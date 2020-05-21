import axios from 'axios';
import { SERVER } from '../../config/config.json';

class MealsRepository {
    handleSchoolSearch = async (school_name: string) => {
        // 학교 검색
        try {
            const { data } = await axios.get(`${SERVER}/search-school?school_name=${school_name}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    handleGetMeals = async (school_id: string, office_id: string) => {
        try {
            const { data } = await axios.get(`${SERVER}/v2/meal/today?school_id=${school_id}&office_id=${office_id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default new MealsRepository();