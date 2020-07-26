import React from 'react';
import './SchoolPage.scss';
import { FaSchool, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SecureLs from 'secure-ls';
import moment from 'moment';
import { History, LocationState } from 'history';
import Loading from '../Common/Loading';
import { secureLsType, getSchoolInfoFrom_LS } from 'type/SecureLsType';

interface SchoolPageProps extends RouteComponentProps<any> {
    history: History<LocationState>;
    dailyMeals: string[];
    date: string;
    handlePlusDay: () => void;
    handleMinusDay: () => void;
    isLoading: boolean;
}

const SchoolPage = ({ history, dailyMeals, date, handlePlusDay, handleMinusDay, isLoading } : SchoolPageProps) => {
    const ls: secureLsType = new SecureLs({ encodingType: 'aes' });
    const { school_name, school_locate }: getSchoolInfoFrom_LS = ls.get('schoolInfo');

    return (
        <div className ="SchoolPage">
            {
                isLoading && <Loading />
            }
            <div className ="SchoolPage-Top">
                <div className ="SchoolPage-Top-Another">
                    <IoMdArrowRoundBack className ="SchoolPage-Top-Another-Icon" onClick ={() => {
                        ls.remove("schoolInfo");
                        history.push("/");
                    }} />
                    <span className ="SchoolPage-Top-Another-Content">다른 학교 찾아보기</span>
                </div>
                <br />
                
                <div className ="SchoolPage-Top-NameZone">
                    <FaSchool className ="SchoolPage-Top-NameZone-Icon" />
                    <span className ="SchoolPage-Top-NameZone-Name">{school_name}</span>
                </div>

                <div className ="SchoolPage-Top-SchoolLocate">
                    {school_locate}
                </div>
            </div>

            <div className ="SchoolPage-DateZone">
                <FaArrowLeft className ="SchoolPage-DateZone-Arrow" onClick ={handleMinusDay}/>
                <span>{moment(date).format("yyyy년 MM월 DD일")}</span>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableToolbar
                        // variant="dialog"
                        variant="inline"
                        id="datePicker"
                        inputVariant="outlined"
                        format="yyyy.MM.DD"
                        style={{ width: '80px' }}
                    />
                </MuiPickersUtilsProvider> */}
                <FaArrowRight className ="SchoolPage-DateZone-Arrow" onClick ={handlePlusDay}/>
            </div>

            <div className ="SchoolPage-MealsZone">
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>아침</h2>
                {
                    dailyMeals[0] ? dailyMeals[0].split("<br/>").map((meal: string, index: number) => {
                        return (
                            <div key ={index}>{meal}</div>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다</div>
                }
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>점심</h2>
                {
                    dailyMeals[1] ? dailyMeals[1].split("<br/>").map((meal: string, index: number) => {
                        return (
                            <div key ={index}>{meal}</div>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다</div>
                }
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>저녁</h2>
                {
                    dailyMeals[2] ? dailyMeals[2].split("<br/>").map((meal: string, index: number) => {
                        return (
                            <div key ={index}>{meal}</div>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다.</div>
                }
                </div>
            </div>
        </div>
    );
}

export default withRouter(SchoolPage);