import MealsStore from './MealsStore';
import ScheduleStore from './ScheduleStore';
import SearchStore from './SearchStore';

const stores: object = {
    MealsStore: new MealsStore(),
    ScheduleStore: new ScheduleStore(),
    SearchStore: new SearchStore(),
};

export default stores;