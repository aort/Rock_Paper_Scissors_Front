import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button} from 'react-bootstrap';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],  
      count:0,    
    };
  }

  componentDidMount() {
    this.fetchDataReset();
  }


  fetchDataReset = () => {
    fetch("http://localhost:9091/api/v1/games?playerOneName=Rock_Man", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }) 
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  


  fetchDataPlayRound = () => {
    const {items} = this.state;    
    fetch("http://localhost:9091/api/v1/games/" + items.id + "?choice=" + "ROCK", {
      method: "PUT",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    .then((resp) => {
      return resp.json()
    }) 
    .then((data) => {
      this.setState({ items: data })                    
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })
  }

  incrementCount= () => {
    this.setState({
      count:0
    })
  }
  

  render() {
    const { error, isLoaded, items } = this.state;   
    this.state.count=0;                 
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            
          </h2>
        </div>
        <p className="App-intro">
          Welcome to Paper Rock Scissors Game
        </p>
        <div>        
        <Button onClick={this.fetchDataPlayRound} variant="primary">Play Round like a ROCK man</Button>          

            <p><h1>General data of the game </h1></p>
            <table class="blueTable">
                <thead>
                <tr>                
                <th>Game ID</th>
                <th>Number Of Round</th>
                <th>Player One Name</th>
                <th>Player One Score</th>
                <th>Player Two Name</th>
                <th>Player Two Score</th>                
                </tr>
                </thead>
                <tfoot>
                <tr>
           
                </tr>
                </tfoot>
                <tbody>
                
                <tr>
                <td>{items.id}</td>
                <td>{items.numberOfRounds}</td>                
                <td>{items.playerOneName}</td>
                <td>{items.playerOneScore}</td>
                <td>{items.playerTwoName}</td>
                <td>{items.playerTwoScore}</td>                
                </tr>                
                </tbody>
            </table>
            <p><h1>Results of the rounds</h1></p>
            <table class="blueTable">
                <thead>
                <tr>
                <th>Number Of Rounds</th>
                <th>playerOneChoice</th>
                <th>playerTwoChoice</th>
                <th>playerOneResult</th>                
                </tr>
                </thead>
                <tfoot>
                <tr>
           
                </tr>
                </tfoot>
                <tbody>                
                {items.rounds.map((item) => (
                <tr>
                <td>{this.state.count=this.state.count+1}</td>
                <td>{item.playerOneChoice}</td>
                <td>{item.playerTwoChoice}</td>
                <td>{item.playerOneResult}</td>                
                </tr>
                ))}              
                </tbody>
                </table>
                <p><h1>If you want to reset the game please click the button or press F5</h1></p>
                <Button onClick={this.fetchDataReset} variant="primary">Reset</Button>
                <h1></h1>
                <div className="App-header">                  
                  <h2>                    
                  </h2>
                </div>
        </div>
      </div>
        

      );
    }
  }
}

export default App;
