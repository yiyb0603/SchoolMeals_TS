import axios from 'axios';
import { SERVER } from 'config/config.json';

class SearchRepository {
  handleSchoolSearch = async (school_name: string, page: number) => {
    // 학교 검색
    try {
      const { data } = await axios.get(`${SERVER}/search?school_name=${school_name}&page=${page}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export default new SearchRepository();