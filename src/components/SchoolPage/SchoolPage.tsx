import React, { useState } from 'react';
import './SchoolPage.scss';
import { FaSchool, FaClock } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SchoolPageProps extends RouteComponentProps<any> {
    history: any;
    todayMeals: string[];
}

const SchoolPage = ({ history, todayMeals } : SchoolPageProps) => {
    const schoolInfo = JSON.parse(localStorage.getItem('schoolInfo') || '[]');
    const [time, setTime] = useState(new Date());

    setInterval(() => {
        setTime(new Date());
    }, 1000);

    return (
        <div className ="SchoolPage">
            <div className ="SchoolPage-Top">
                <div className ="SchoolPage-Top-Another">
                    <IoMdArrowRoundBack className ="SchoolPage-Top-Another-Icon" onClick ={() => {
                        localStorage.removeItem('schoolInfo');
                        history.push("/");
                    }} />
                    <span className ="SchoolPage-Top-Another-Content">다른 학교 찾아보기</span>
                </div> <br />
                <div className ="SchoolPage-Top-NameZone">
                    <FaSchool className ="SchoolPage-Top-NameZone-Icon" />
                    <span className ="SchoolPage-Top-NameZone-Name">{schoolInfo.school_name}</span>
                </div>
                
                <div className ="SchoolPage-Top-TimeZone">
                    <div>{time.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</div>
                    <div className ="SchoolPage-Top-TimeZone-Time">
                        <FaClock style ={{verticalAlign: 'middle' }} />
                        <div>{time.toLocaleTimeString('ko-KR')}</div>
                    </div>
                </div>

                <div className ="SchoolPage-Top-SchoolLocate">
                    {schoolInfo.school_locate}
                </div>
            </div>

            <div className ="SchoolPage-MealsZone">
                <div className ="SchoolPage-MealsZone-Meals">
                    {todayMeals[0]}
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                    {todayMeals[1]}
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                    {todayMeals[2]}
                </div>
            </div>
        </div>
    );
}

export default withRouter(SchoolPage);