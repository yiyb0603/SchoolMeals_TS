import MealsStore from './MealsStore';
import ScheduleStore from './ScheduleStore';

const stores: object = {
    MealsStore: new MealsStore(),
    ScheduleStore: new ScheduleStore()
};

export default stores;