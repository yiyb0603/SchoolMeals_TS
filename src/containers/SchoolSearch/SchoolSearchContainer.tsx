import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';
import { IError } from 'types/ErrorType';
import { ISchoolType, ISearchResponseType } from 'types/SchoolType';
import { ISearchStoreType } from 'types/StoreType';
import useStores from 'lib/useStores';

const SchoolSearchContainer = observer(() => {
    const { store } = useStores();

    const [searchValue, setSearchValue] = useState<string>('');
    const [schoolList, setSchoolList] = useState<ISchoolType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const { handleSchoolSearch, isLoading }: ISearchStoreType = store.SearchStore;

    const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, []);

    const requestSchoolSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        handleSchoolSearch(searchValue, 1)
            .then((response: ISearchResponseType) => {
                setSchoolList(response.data.schools);
            })

            .catch ((error: IError) => {
                const { status, message } = error.response.data;
                if (status === 404) {
                    setSchoolList([]);
                    setErrorMessage(message);
                } else {
                    setErrorMessage(message);
                }
                return error;
            })

            .finally(() => {
                setIsSearch(true);
            });
    }, [handleSchoolSearch, searchValue]);

    return (
        <>
        {
            <SchoolSearch searchValue ={searchValue} onChangeValue ={onChangeValue} errorMessage ={errorMessage}
                requestSchoolSearch ={requestSchoolSearch} isSearch ={isSearch} schoolList ={schoolList} isLoading ={isLoading}
            />
        }
        </>
    );
});

export default SchoolSearchContainer;