import React, { FormEvent, ChangeEvent } from 'react';
import './SchoolSearch.scss';
import schoolImage from '../../assets/images/school.png';
import { GoSearch } from 'react-icons/go';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cafeteria from '../../assets/images/cafeteria.png';
import error from '../../assets/images/error.png';
import SecureLs from 'secure-ls';

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
    const ls: any = new SecureLs({ encodingType: 'aes' });
    const schoolLists = (params : string[]): any => {
        return params.map((school: any, index: number) => {
            const { office_code, school_id, school_locate, school_name } = school;

            const data: object = {
                school_name,
                office_code,
                school_id,
                school_locate
            };

            return (
                <div className ="SchoolSearch-SchoolList-Wrapper" key ={index} onClick ={() => {
                    ls.set('schoolInfo', data);
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
                    <div className ="SchoolSearch-CheckZone-Contents">맞는 학교를 찾지 못하였습니다.</div>
                </div> : <></>
            }

            {
                isSearch && schoolList.length !== 0 ? <h1 className ="SchoolSearch-Result">{schoolList.length}개의 검색결과</h1> : <></>
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