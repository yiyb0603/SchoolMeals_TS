import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';

interface SchoolSearchContainerProps {
    store?: any;
}

const SchoolSearchContainer = ({ store } : SchoolSearchContainerProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const { handleSchoolSearch, schoolList } = store.MealsStore;

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const requestSchoolSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchValue === '') {
            setIsSearch(false);
        }
        
        handleSchoolSearch(searchValue, 1)
            .then (() => {
                setIsSearch(true);
            })

            .catch ((error: any) => {
                console.log(error);
                return error;
            })
    }, [handleSchoolSearch, searchValue]);

    return (
        <SchoolSearch searchValue ={searchValue} onChangeValue ={onChangeValue} requestSchoolSearch ={requestSchoolSearch} 
            isSearch ={isSearch} schoolList ={schoolList}
        />
    );
}

export default inject('store')(observer(SchoolSearchContainer));