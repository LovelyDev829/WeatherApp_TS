import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import * as React from "react";
import '../../font-awesome/css/font-awesome.min.css';

interface MyProps {
    responseObj: any;
    error: boolean;
    loading: boolean;
    day: number;
    width: number;
}

export class PictureToday extends React.Component <any, any>{
	public props: MyProps;
    getCon() {
        if (this.props.responseObj.cod === 200 || this.props.responseObj.cod === '200')
            return this.props.responseObj.list[this.props.day].weather[0].main;
    }
    render() {
        let Str = this.getCon();
        switch (Str) {
            case 'Broken clouds': return <FontAwesomeIcon icon={solid('cloud')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Clear sky': return <FontAwesomeIcon icon={solid('sun')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Clear': return <FontAwesomeIcon icon={solid('sun')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Clouds': return <FontAwesomeIcon icon={solid('cloud')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Mist': return <FontAwesomeIcon icon={solid('smog')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Rain': return <FontAwesomeIcon icon={solid('cloud-rain')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Scattered clouds': return <FontAwesomeIcon icon={solid('cloud')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Shower rain': return <FontAwesomeIcon icon={solid('cloud-showers-heavy')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Snow': return <FontAwesomeIcon icon={solid('snowflake')} style={{fontSize: `${this.props.width}px`}}/>
            case 'Thunderstorm': return <FontAwesomeIcon icon={solid('poo-storm')} style={{fontSize: `${this.props.width}px`}}/>
            default: return <i className="fa fa-spinner fa-spin" style={{fontSize: `${this.props.width}px`}}></i>;
        }
    }
}
export default PictureToday;