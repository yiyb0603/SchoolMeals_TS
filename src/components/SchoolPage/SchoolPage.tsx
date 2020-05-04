import React from 'react';
import './SchoolPage.scss';
import { FaSchool } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SchoolPageProps extends RouteComponentProps<any> {
    history: any;
}

const SchoolPage = ({ history } : SchoolPageProps) => {
    const schoolInfo = JSON.parse(localStorage.getItem('schoolInfo') || '[]');

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
                <div className ="SchoolPage-Top-SchoolLocate">{schoolInfo.school_locate}</div>
            </div>

            <div className ="SchoolPage-MealsZone">
                <div className ="SchoolPage-MealsZone-Meals">아침</div>
                <div className ="SchoolPage-MealsZone-Meals">점심</div>
                <div className ="SchoolPage-MealsZone-Meals">저녁</div>
            </div>
        </div>
    );
}

export default withRouter(SchoolPage);