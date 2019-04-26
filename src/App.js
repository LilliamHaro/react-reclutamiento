import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Switch, Route, HashRouter, BrowserRouter } from "react-router-dom";
import Home from './views/home/home';
import DetallePuesto from './views/detallePuesto/detallePuesto';
import Footer from './components/footer/footer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get("https://www.circuit.com.pe/api/v1/jobs/feed")
      .then(response => {
        this.setState({
          data: response.data.careers
        },function(){
          console.log('home',this.state.data)
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route render={() => <Home allData={this.state.data} />}  exact path="/" />

            {this.state.data.map((puesto, i) => {
              return (
                <Route key={i} exact render={() => ( <DetallePuesto dataPuesto={puesto} data={this.state.data} />)} path={"/" + puesto.slug}/>
              );
            })}
          </Switch>
        </HashRouter>
        <Footer/>
      </div>
    );
  }
}

export default App;
