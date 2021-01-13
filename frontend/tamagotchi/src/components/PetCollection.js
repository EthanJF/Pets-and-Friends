import React, { Component } from 'react'
import PetCard from './PetCard'


export default class PetCollection extends Component {

    render(){
        let renderedPets=  ""
        if (this.props.pets) {
            renderedPets = this.props.pets.map((pet) => {
            return <PetCard pet={pet} handleClick={this.props.handleClick} key={pet.id} buttonText={this.props.buttonText} myPetCollection={this.props.myPetCollection} givePetUp={this.props.givePetUp} />
        })}

        return(
            <div className="pet-collection">
                {renderedPets}
            </div>
        )
    }
}