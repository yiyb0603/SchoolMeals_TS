import axios from 'axios';
import { SERVER } from 'config/config.json';
import { ISearchResponseType } from 'types/SchoolType';

class SearchRepository {
  handleSchoolSearch = async (school_name: string, page: number) => {
    // 학교 검색
    try {
      const URL: string = `${SERVER}/search?school_name=${school_name}&page=${page}`;
      const { data }: { data: ISearchResponseType } = await axios.get(URL);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SearchRepository();