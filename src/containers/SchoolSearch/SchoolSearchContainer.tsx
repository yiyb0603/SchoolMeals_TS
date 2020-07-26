import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';
import { Error } from 'type/ErrorType';
import { schoolType, searchResponseType } from 'type/SchoolType';
import { searchStoreType } from 'type/StoreType';

interface SchoolSearchContainerProps {
    store?: {
        SearchStore: searchStoreType
    } | any;
}

const SchoolSearchContainer = ({ store } : SchoolSearchContainerProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [schoolList, setSchoolList] = useState<schoolType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const { handleSchoolSearch, isLoading } = store.SearchStore;

    const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, []);

    const requestSchoolSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        handleSchoolSearch(searchValue, 1)
            .then((response: searchResponseType) => {
                setSchoolList(response.data.schools);
            })

            .catch ((error: Error) => {
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
}

export default inject('store')(observer(SchoolSearchContainer));