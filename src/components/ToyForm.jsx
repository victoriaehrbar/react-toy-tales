import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: '',
    image: ''
  }

  handleFormChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({
        [name]: value
    }, () => console.log(this.state))
}


  handleSubmit = (e) => {
    e.preventDefault()
    let newToy = {
      name: this.state.name,
      image: this.state.image,
      likes: 0
    }

    let url = "http://localhost:3000/toys"
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(newToy)
    }

    fetch(url, configObj)
    .then(response => response.json())
    .then(newToy => this.props.addToy(newToy))
  }


render(){
  return(
      <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" onChange={this.handleFormChange} value={this.state.name}/>
          <label>Image:</label>
          <input type="text" name="image" onChange={this.handleFormChange} value={this.state.image} />
          <input type="submit" value="Add Toy" />
      </form>
  )
}
}

export default ToyForm;