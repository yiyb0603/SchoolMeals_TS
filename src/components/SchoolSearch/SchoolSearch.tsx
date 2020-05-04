import React, { FormEvent, ChangeEvent } from 'react';
import './SchoolSearch.scss';
import schoolImage from '../../assets/images/school.png';
import { GoSearch } from 'react-icons/go';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cafeteria from '../../assets/images/cafeteria.png';

/* eslint-disable */

interface SchoolSearchProps extends RouteComponentProps<any> {
    searchValue: string;
    onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
    requestSchoolSearch: (event: FormEvent<HTMLFormElement>) => void;
    isSearch: boolean;
    schoolList: string[];
    history: any;
}

const SchoolSearch = ({ searchValue, onChangeValue, requestSchoolSearch, isSearch, schoolList, history } : SchoolSearchProps) => {
    const schoolLists = (params : string[]): any => {
        return params.map((school: any, index: number) => {
            const { office_code, school_code, school_locate, school_name } = school;

            const data = {
                school_name,
                office_code,
                school_code,
                school_locate
            };

            return (
                <div className ="SchoolSearch-SchoolList-Wrapper" key ={index} onClick ={() => {
                    localStorage.setItem('schoolInfo', JSON.stringify(data));
                    history.push("/page");
                }}>
                    <img src ={schoolImage} className ="SchoolSearch-SchoolImage" alt ="school" />
                    <div className ="SchoolSearch-SchoolList-Item">{school_name}</div>
                    <div className ="SchoolSearch-SchoolList-Item">주소: {school_locate}</div>
                </div>
            );
        })
    }

    return (
        <div className ="SchoolSearch">
            <h2 className ="SchoolSearch-Title">학교를 검색해보세요</h2>
            <form onSubmit ={requestSchoolSearch} style ={{ display: 'inline-block' }}>
                <input type ="text" value ={searchValue} onChange ={onChangeValue} 
                    className ="SchoolSearch-SearchZone" placeholder ="검색할 학교를 입력하세요" />
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
                isSearch && <h1 className ="SchoolSearch-Result">{schoolList.length}개의 학교 검색결과</h1>
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