import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';

interface SchoolSearchContainerProps {
    store?: {
        MealsStore: {
            handleSchoolSearch: (school_name: string, page: number) => Promise<Response | Error>,
            schoolList: string[],
            isLoading: boolean
        };
    } | any;
}

const SchoolSearchContainer = ({ store } : SchoolSearchContainerProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const { handleSchoolSearch, schoolList, isLoading } = store.MealsStore;

    const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, []);

    const requestSchoolSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        handleSchoolSearch(searchValue, 1)
            .catch ((error: Error) => {
                return error;
            })

            .finally(() => {
                setIsSearch(true);
            })
    }, [handleSchoolSearch, searchValue]);

    return (
        <>
        {
            <SchoolSearch searchValue ={searchValue} onChangeValue ={onChangeValue} 
            requestSchoolSearch ={requestSchoolSearch} isSearch ={isSearch} schoolList ={schoolList} isLoading ={isLoading}
        />
        }
        </>
    );
}

export default inject('store')(observer(SchoolSearchContainer));