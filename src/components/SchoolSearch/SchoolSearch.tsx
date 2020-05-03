import React from 'react';
import './SchoolSearch.scss';
import schoolImage from '../../assets/images/school.png';
import { GoSearch } from 'react-icons/go';

/* eslint-disable */

interface SchoolSearchProps {
    searchValue: string;
    setSearchValue: any;
    requestSchoolSearch: any;
    isSearch: boolean;
    schoolList: any;
}

const SchoolSearch = ({ searchValue, setSearchValue, requestSchoolSearch, isSearch, schoolList } : SchoolSearchProps) => {
    const schoolLists = (params : any) => {
        return params.map((school: any, index: Number) => {
            const { office_code, school_code, school_locate, school_name, school_type } = school;

            const data = {
                school_name,
                office_code,
                school_code,
                school_locate
            };

            return (
                <div className ="SchoolSearch-SchoolList-Wrapper" onClick ={() => {
                    localStorage.setItem('schoolInfo', JSON.stringify(data));
                    window.location.href ="/page";
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
                <input type ="text" value ={searchValue} onChange ={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)} 
                    className ="SchoolSearch-SearchZone" placeholder ="검색할 학교를 입력하세요" />
                <button className ="SchoolSearch-SearchZone-Button" type ="submit">
                    <GoSearch />
                </button>
            </form>

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

export default SchoolSearch;