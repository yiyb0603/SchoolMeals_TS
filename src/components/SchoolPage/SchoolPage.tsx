import React from 'react';
import './SchoolPage.scss';
import { inject, observer } from 'mobx-react';
import { FaSchool, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
// import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SecureLs from 'secure-ls';
import moment from 'moment';

interface SchoolPageProps extends RouteComponentProps<any> {
    history: any;
    todayMeals: any;
    date: string;
    store?: any;
    requestTodayMeals: any;
}

const SchoolPage = ({ history, todayMeals, date, store, requestTodayMeals } : SchoolPageProps) => {
    const ls: any = new SecureLs({ encodingType: 'aes' });
    const { handlePlusDay, handleMinusDay } = store.MealsStore;
    const { school_name, school_locate }: any = ls.get('schoolInfo');
    // const [time, setTime] = useState(new Date());

    // setInterval(() => {
    //     setTime(new Date());
    // }, 1000);

    return (
        <div className ="SchoolPage">
            <div className ="SchoolPage-Top">
                <div className ="SchoolPage-Top-Another">
                    <IoMdArrowRoundBack className ="SchoolPage-Top-Another-Icon" onClick ={() => {
                        ls.remove("schoolInfo");
                        history.push("/");
                    }} />
                    <span className ="SchoolPage-Top-Another-Content">다른 학교 찾아보기</span>
                    {/* <div className ="SchoolPage-Top-Another-TimeZone"> */}
                    {/* <div>{time.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</div> */}
                    {/* <div className ="SchoolPage-Top-Another-TimeZone-Time">
                        <FaClock style ={{verticalAlign: 'middle' }} />
                        <div>{time.toLocaleTimeString('ko-KR')}</div>
                    </div> */}
                    {/* </div> */}
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
                <FaArrowLeft className ="SchoolPage-DateZone-Arrow" onClick ={() => {
                    handleMinusDay();
                    requestTodayMeals();
                }} />
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
                <FaArrowRight className ="SchoolPage-DateZone-Arrow" onClick ={() => {
                    handlePlusDay();
                    requestTodayMeals();
                }} />
            </div>

            <div className ="SchoolPage-MealsZone">
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>아침</h2>
                {
                    todayMeals[0] ? todayMeals[0].split("<br/>").map((meal: string) => {
                        return (
                            <>
                                <div>{meal}</div>
                            </>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다</div>
                }
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>점심</h2>
                {
                    todayMeals[1] ? todayMeals[1].split("<br/>").map((meal: string) => {
                        return (
                            <>
                                <div>{meal}</div>
                            </>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다</div>
                }
                </div>
                <div className ="SchoolPage-MealsZone-Meals">
                <h2>저녁</h2>
                {
                    todayMeals[2] ? todayMeals[2].split("<br/>").map((meal: string) => {
                        return (
                            <>
                                <div>{meal}</div>
                            </>
                        );
                    }) : <div className ="SchoolPage-MealsZone-Meals-No">급식이 없습니다.</div>
                }
                </div>
            </div>
        </div>
    );
}

export default inject('store')(observer(withRouter(SchoolPage)));