import Card from '../UI/Card';
import ActivityItem from './ActivityItem';

import classes from './ActivityList.module.css';

const ActivityList = (props) => {

    return (
        <Card className={classes.bg} >
            <h3>Happening Soon!</h3>
            {props.activities.map(activity => (
                <ActivityItem 
                    key={activity._id}
                    activity={activity}
                    onClick={() => props.onShowActivityDetail(activity.id)}
                    ></ActivityItem>
            ))}
        </Card>
    )
}

export default ActivityList;