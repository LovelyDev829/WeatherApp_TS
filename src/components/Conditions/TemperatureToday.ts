import * as React from "react";

export class TemperatureToday extends React.Component {
	public props: any;

    render() {
        if(!this.props.responseObj) return "00";
        if (this.props.responseObj.cod === 200 || this.props.responseObj.cod === '200')
            return Math.round(this.props.responseObj.list[this.props.day].main.temp) - 273;
        else return "00";
    }
}
export default TemperatureToday;