import axios from 'axios';
import { SERVER } from '../../config/config.json';

class MealsRepository {
    handleSchoolSearch = async (school_name: string, page: number) => {
        // 학교 검색
        try {
            const { data } = await axios.get(`${SERVER}/search?school_name=${school_name}&page=${page}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    handleGetMeals = async (school_id: string, office_code: string, date: any) => {
        try {
            const { data } = await axios.get(`${SERVER}/meals?school_id=${school_id}&office_code=${office_code}&date=${date}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default new MealsRepository();