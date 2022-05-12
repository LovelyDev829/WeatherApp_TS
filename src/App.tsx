import './App.css';
import * as React from "react";
import 'animate.css';
import { ConditionToday } from './components/Conditions/ConditionToday';
import { TemperatureToday } from './components/Conditions/TemperatureToday';
import { PictureToday } from './components/Conditions/PictureToday';



type AppState = {
  city: string,
  click: number,
  responseObj: {
    cod: any,
    city:{
      name: string,
    }
  },
  error: boolean,
  loading: boolean,
  nowDay: number,
};


export class MainApp extends React.Component<any, AppState> {
  // public state: any;
  // public setState: any;

  constructor(props: any) {
    super(props);
    this.getForecast = this.getForecast.bind(this)
    this.state = {
      city: "",
      click: 0,
      responseObj: {
        cod: "",
        city: {
          name: "",
        }
      },
      error: false,
      loading: false,
      nowDay: -1,
    };
  };


  componentDidMount() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const d = new Date(`${year}/${month < 10 ? `0${month}` : `${month}`}/${date} `);
    this.setState({ nowDay: d.getDay() });
    
    // this.state.nowDay=d.getDay();
    this.getForecast("Ottawa");
  }

  day(num) {
    // console.log(this.state.nowDay);
    num += this.state.nowDay;
    if (num >= 7) num -= 7;
    switch (num) {
      case 1: return "Mon";
      case 2: return "Tue";
      case 3: return "Wed";
      case 4: return "Thr";
      case 5: return "Fri";
      case 6: return "Sat";
      default: return "Sun";
    }
  }

  getCountry() {
    // console.log(this.AppState);

    if (this.state.responseObj)
      if (this.state.responseObj.cod === "200") {
        return this.state.responseObj.city.name;
      }
  }
  getForecast(cityName) {
    // this.state.error=false;
    this.setState({ error: false });
    // this.state.loading=true;
    this.setState({ loading: true });
    let uriEncodedCity = encodeURIComponent(cityName);
    fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${uriEncodedCity}`, {
      "method": "GET",
      "headers": {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '3d1a718219mshb6323ab04ba5d98p1010c3jsnb53c54afe8ce'
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.cod !== '200' && response.cod !== 200) {
          throw new Error()
        }
        // this.state.responseObj=response;
        this.setState({ responseObj: response });
        // console.log(this.state.responseObj);
        // this.state.loading=false;
        this.setState({ loading: false });
      })
      .catch(err => {
        // this.state.error=true;
        this.setState({ error: true });
        // this.state.loading=false;
        this.setState({ loading: true });
        console.log(err.message);
      });
  }
  render() {
    // console.log('app state', this.state.responseObj)
    return (
      <div className="MainApp">
        <div>
        </div>
        <div className='mainDiv'>
          <div className='mainTitleDiv'>
            <div className={this.getCountry() === "Ottawa" ? 'mainTitleText addColor' : 'mainTitleText'}
              onClick={() => {
                this.getForecast("Ottawa");
              }}>
              OTTAWA
            </div>
            <div className={this.getCountry() === "Moscow" ? 'mainTitleText addColor' : 'mainTitleText'}
              onClick={() => {
                this.getForecast("Moscow");
              }}>
              MOSCOW
            </div>
            <div className={this.getCountry() === "Tokyo" ? 'mainTitleText addColor' : 'mainTitleText'}
              onClick={() => {
                this.getForecast("Tokyo");
              }}>
              TOKYO
            </div>
          </div>
          <div className='mainBody'>
            <div className='mainTopDiv'>
              <div className="topcenterDiv">
                <p>Today</p>
                <div className='topcenterBottom'>
                  <div className='pictureTodayDiv'>
                    <PictureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={0} width={150} />
                  </div>
                  <div className='degreeC'>
                    <h1 id='todayDegree'><TemperatureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={0} />˚</h1>
                    <p id='todayCondition'><ConditionToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={0} /></p>
                    {/* <p id='todayCondition'>
                      {this.AppState?.responseObj?.list?.[0]?.weather?.[0]?.main ?? 'Waiting...'}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='mainBottomDiv'>
              <div className='bottomSubDiv1'>
                <div className='dayDiv'>
                  <p className='dayWhat'>{this.day(1)}</p>
                  <div className='dayIcon'>
                    <PictureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={8} width={70} />
                  </div>
                  <div className='dayDegree'>
                    <TemperatureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={8} />˚
                  </div>
                </div>
              </div>
              <div className='bottomSubDiv2'>
                <div className='dayDiv'>
                  <p className='dayWhat'>{this.day(2)}</p>
                  <div className='dayIcon'>
                    <PictureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={16} width={70} />
                  </div>
                  <div className='dayDegree'>
                    <TemperatureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={16} />˚
                  </div>
                </div>
              </div>
              <div className='bottomSubDiv3'>
                <div className='dayDiv'>
                  <p className='dayWhat'>{this.day(3)}</p>
                  <div className='dayIcon'>
                    <PictureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={24} width={70} />
                  </div>
                  <div className='dayDegree'>
                    <TemperatureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={24} />˚
                  </div>
                </div>
              </div>
              <div className='bottomSubDiv4'>
                <div className='dayDiv'>
                  <p className='dayWhat'>{this.day(4)}</p>
                  <div className='dayIcon'>
                    <PictureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={32} width={70} />
                  </div>
                  <div className='dayDegree'>
                    <TemperatureToday responseObj={this.state.responseObj} error={this.state.error} loading={this.state.loading} day={32} />˚
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainApp;
