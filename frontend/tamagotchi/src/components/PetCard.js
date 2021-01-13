import React, { Component } from 'react'

export default class PetCard extends Component {
    render(){
        return(
            <div>
                <img src={this.props.pet.image} alt="pet" key={this.props.pet.id} class="pet-image"/>
                <br />
                <button onClick={() => this.props.handleClick(this.props.pet)}>{this.props.buttonText}</button>
                <br />
                {this.props.myPetCollection ? (<button onClick={() => this.props.givePetUp(this.props.pet)}>Give me up :(</button>) : ""}
            </div>
        )
    }
}


