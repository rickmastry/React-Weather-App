import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "12241415d524d01764933c495c975d27";

class App extends Component {
  state = {
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    wind: undefined,
    city: undefined,
    country: undefined,
    error: undefined

  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=Imperial`);
    const data = await api_call.json();
    if(city && country){
      this.setState({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        error:""
       
      });
    } else{
       
      this.setState ({
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        wind: undefined,
        city: undefined,
        country: undefined,
        error: "Please enter city and country"
    
      });
    }
   
    
  }
  render() {
    return (
     <div>
      <div className="wrapper">
        <div className="main">
         <div className="container-fluid">
          <div className="row">
            <div className="col-5 title-container">
              <Titles />
            </div>
            <div className="col-7 form-container">
              <Form getWeather={this.getWeather}/>
              <Weather 
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                description={this.state.description}
                wind={this.state.wind}
                city={this.state.city}
                country={this.state.country}
                error={this.state.error}
              />
           </div>
          </div>
         </div>
        </div>
      </div>
     </div>
    );
  }
};



export default App;
