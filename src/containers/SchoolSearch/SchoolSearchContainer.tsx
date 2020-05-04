import React, { useState, useCallback, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';

interface SchoolSearchContainerProps {
    store?: any;
}

const SchoolSearchContainer = ({ store } : SchoolSearchContainerProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [schoolList, setSchoolList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const { handleSchoolSearch } = store.MealsStore;

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const requestSchoolSearch = useCallback((event) => {
        event.preventDefault();
        handleSchoolSearch(searchValue)
            .then ((response: { status: number; data: { schoolList: React.SetStateAction<never[]>; }; }) => {
                if (response.status === 200) {
                    setSchoolList(response.data.schoolList);
                    setIsSearch(true);
                }
            })

            .catch ((error: any) => {
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