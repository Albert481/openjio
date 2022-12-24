

import classes from './ActivityItem.module.css';

const ActivityItem = (props) => {
    let activity = props.activity
    return (
        <div className={classes.item} onClick={() => props.onClick(activity._id)}>
            <label htmlFor="a">
                <i className="l">
                    <img src="https://i.imgur.com/x3omKbe.png" alt="profile_pic"></img>
                </i>
                <strong>{activity.name} X/{activity.slot}</strong>
                {/* <span data-o="opened" data-c="closed"></span> */}
            </label>
        </div>
    );
};

export default ActivityItem;