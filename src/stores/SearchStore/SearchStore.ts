import SearchRepository from './SearchRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import { searchResponseType } from 'type/SchoolType';

@autobind
class SearchStore {
  @observable isLoading: boolean = false;

  @action
  handleSchoolSearch = async (school_name: string, page: number) => {
      // 학교 검색
    try {
      this.isLoading = true;
      const response: searchResponseType = await SearchRepository.handleSchoolSearch(school_name, page);

      return new Promise((resolve: (response: searchResponseType) => void, reject: () => void) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve: () => void, reject: (error: Error) => void) => {
        reject(error);
      });
    } finally {
      this.isLoading = false;
    }
  }
}

export default SearchStore;