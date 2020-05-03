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

    handleYesterdayMeals = async (school_id: string, office_id: string) => {
        // 어제 급식정보
        try {
            const { data } = await axios.get(`${SERVER}/v2/yesterday?school_id=${school_id}&office_id=${office_id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    handleTodayMeals = async (school_id: string, office_id: string) => {
        // 오늘 급식정보
        try {
            const { data } = await axios.get(`${SERVER}/v2/today?school_id=${school_id}&office_id=${office_id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    handleTomorrowMeals = async (school_id: string, office_id: string) => {
        // 내일 급식정보
        try {
            const { data } = await axios.get(`${SERVER}/v2/tomorrow?school_id=${school_id}&office_id=${office_id}`);
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export default new MealsRepository();