import SearchRepository from './SearchRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import { ISearchResponseType } from 'types/SchoolType';
import { IError } from 'types/ErrorType';

@autobind
class SearchStore {
  @observable isLoading: boolean = false;

  @action
  handleSchoolSearch = async (school_name: string, page: number) => {
      // 학교 검색
    try {
      this.isLoading = true;
      const response: ISearchResponseType = await SearchRepository.handleSchoolSearch(school_name, page);

      return new Promise((resolve: (response: ISearchResponseType) => void, reject: () => void) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve: () => void, reject: (error: IError) => void) => {
        reject(error);
      });
    } finally {
      this.isLoading = false;
    }
  }
}

export default SearchStore;