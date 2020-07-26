import React, { useCallback, FormEvent, ChangeEvent } from 'react';
import './SchoolSearch.scss';
import SecureLs from 'secure-ls';
import { GoSearch } from 'react-icons/go';
import { History, LocationState } from "history";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cafeteria from '../../assets/images/cafeteria.png';
import error from '../../assets/images/error.png';
import schoolImage from '../../assets/images/school.png';
import Loading from '../Common/Loading';
import { ISchoolType } from 'types/SchoolType';

interface SchoolSearchProps extends RouteComponentProps {
    searchValue: string;
    onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
    requestSchoolSearch: (event: FormEvent<HTMLFormElement>) => void;
    isSearch: boolean;
    schoolList: ISchoolType[];
    isLoading: boolean;
    errorMessage: string;
    history: History<LocationState>;
}

const SchoolSearch = ({ searchValue, onChangeValue, requestSchoolSearch, isSearch, schoolList, history,isLoading, errorMessage } : SchoolSearchProps) => {
    const ls: {
        set: (arg1: string, arg2: any) => void;
    } = new SecureLs({ encodingType: 'aes' });

    const onClickButton = useCallback((data: object, address: string, school_id: string, office_code: string) => {
        ls.set('schoolInfo', data);
        history.push(`/${address}?school_id=${school_id}&office_code=${office_code}`);
    }, [history, ls]);

    const schoolLists = (params : ISchoolType[]) => {
        return params.map((school: ISchoolType, index: number) => {
            const { office_code, school_id, school_locate, school_name }: ISchoolType = school;

            const data: object = {
                school_name,
                school_locate
            };

            return (
                <div className ="SchoolSearch-SchoolList-Wrapper" key ={index}>
                    <img src ={schoolImage} className ="SchoolSearch-SchoolImage" alt ="school" />
                    <div className ="SchoolSearch-SchoolList-Item">
                    {
                        school_name.length < 17 ? school_name : school_name.substring(0, 17).concat("....")
                    }</div>
                    <div className ="SchoolSearch-SchoolList-Item">{school_locate}</div>
                    <div className ="SchoolSearch-SchoolList-Item-ButtonZone">
                        <button className ="SchoolSearch-SchoolList-Item-ButtonZone-Meals"
                            onClick ={() => onClickButton(data, "page",  school_id, office_code)}>Meals</button>
                        <button className ="SchoolSearch-SchoolList-Item-ButtonZone-Schedule"
                            onClick ={() => onClickButton(data, "schedule", school_id, office_code)}>Schedules</button>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className ="SchoolSearch">
            {
                isLoading && <Loading />
            }
            <h2 className ="SchoolSearch-Title">급식 정보 도우미</h2>
            <form onSubmit ={requestSchoolSearch} style ={{ display: 'inline-block' }}>
                <input type ="text" value ={searchValue} onChange ={onChangeValue} 
                    className ="SchoolSearch-SearchZone" placeholder ="학교를 검색해보세요" />
                <button className ="SchoolSearch-SearchZone-Button" type ="submit">
                    <GoSearch />
                </button>
            </form>

            {
                !isSearch && <div className ="SchoolSearch-CheckZone">
                    <img src ={cafeteria} alt ="cafeteria" className ="SchoolSearch-CheckZone-Image" />
                    <div className ="SchoolSearch-CheckZone-Contents">학교 급식 정보를 빠르게 확인할 수 있습니다.</div>
                </div>
            }

            {
                isSearch && schoolList.length === 0 ? <div className ="SchoolSearch-CheckZone">
                    <img src ={error} alt ="cafeteria" className ="SchoolSearch-CheckZone-Image" />
                    <div className ="SchoolSearch-CheckZone-Contents">{errorMessage}</div>
                </div> : <></>
            }

            {
                isSearch && schoolList.length !== 0 ? 
                <h1 className ="SchoolSearch-Result">{schoolList.length}개의 검색결과</h1> : <></>
            }
            
            <div className ="SchoolSearch-SchoolList">
            {
                isSearch && schoolLists(schoolList)
            }
            </div>
        </div>
    );
}

export default withRouter(SchoolSearch);