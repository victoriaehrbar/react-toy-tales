import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((toys) => {
        this.setState({
          toys: toys
        })
      });
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (toy) => {
    this.setState((prevState, prevProps) => {
      return {
        toys: [...prevState.toys, toy]
      }
    })
  }

  deleteToy = (deletedToy) => {
    fetch('http://localhost:3000/toys/'+deletedToy.id, {method: 'DELETE'})
    .then(res=>res.json())
    .then(()=>{
      this.setState({
        toys: this.state.toys.filter((toy)=> toy !== deletedToy )
      })
    })
  }

  addLikes = (likedToy) => {
    const configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ likes: likedToy.likes + 1 })
    }

    fetch('http://localhost:3000/toys/'+likedToy.id, configObj)
    .then(response => response.json())
    .then(json => {
      this.setState((prevState) => {
        const index = prevState.toys.findIndex((t) => json.id === t.id)
        return {
          toys: [...prevState.toys.slice(0, index), json, ...prevState.toys.slice(index + 1)]
        }
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLikes={this.addLikes} />
      </>
    );
  }

}

export default App;