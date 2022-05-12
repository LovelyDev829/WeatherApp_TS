import * as React from "react";


interface MyProps {
    responseObj: any;
    error: boolean;
    loading: boolean;
    day: number;
}

export class ConditionToday extends React.Component{
	public props: MyProps;
    
    render() {
        if(!this.props.responseObj) return"Wait...";
        if (this.props.responseObj.cod === '200')
            return this.props.responseObj.list[this.props.day].weather[0].main;
        else return "Wait...";
    }
};
export default ConditionToday;