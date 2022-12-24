import classes from './Input.module.css';

const Input = props => {
    return <div className={classes.input}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}/>
    </div>
}

export default Input