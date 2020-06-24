import React, { useState, useCallback, ChangeEvent, FormEvent, SetStateAction } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolSearch from '../../components/SchoolSearch';
import Loading from '../../components/Common/Loading';

interface SchoolSearchContainerProps {
    store?: any;
}

const SchoolSearchContainer = ({ store } : SchoolSearchContainerProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [schoolList, setSchoolList] = useState<string[]>([]);
    const { handleSchoolSearch }: { handleSchoolSearch: (school_name: string, page: number) => Promise<any>; } = store.MealsStore;

    const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, []);

    const requestSchoolSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        handleSchoolSearch(searchValue, 1)
            .then ((response: { status: number; data: { schools: SetStateAction<any[]>; }; }) => {
                if (response.status === 200) {
                    setSchoolList(response.data.schools);
                }
            })

            .catch ((error: Error) => {
                console.log(error);
                return error;
            })

            .finally(() => {
                setIsSearch(true);
                setIsLoading(false);
            })
    }, [handleSchoolSearch, searchValue]);

    return (
        <>
        {
            isLoading ? <Loading /> : <SchoolSearch searchValue ={searchValue} onChangeValue ={onChangeValue} requestSchoolSearch ={requestSchoolSearch} 
            isSearch ={isSearch} schoolList ={schoolList}
        />
        }
        </>
    );
}

export default inject('store')(observer(SchoolSearchContainer));