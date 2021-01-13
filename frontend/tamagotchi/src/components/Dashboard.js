import React, { Component } from 'react'
import Pet from './Pet'
import PetCollection from './PetCollection'
import NavBar from './NavBar'

export default class Dashboard extends Component {

    state = {
        seePet: false,
        allPets: [],
        myPets: [],
        username: "",
        selectedPet: {},
        adoptPetID: null
    }

    componentDidMount(){
        fetch("http://localhost:3000/pets")
        .then(r => r.json())
        .then(resObj => {
            this.setState({
                allPets: resObj
            })
            fetch(`http://localhost:3000/users/${this.props.userID}`)
            .then(r => r.json())
            .then(resObj => {
                this.setState({
                    myPets: resObj.pets ? resObj.pets : [],
                    username: resObj.username
                })
            })
        })
    }

    handleAllPetsClick = (pet) => {
        this.setState({
            selectedPet: pet
        }, () => this.adoptAPet(pet))
    }

    adoptAPet = (pet) => {
        // debugger
        if(this.state.myPets){
            if(!this.state.myPets.find(element => element.id === pet.id)){
                fetch("http://localhost:3000/adopt_pets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                      adopt_pet:{
                        user_id: this.props.userID,
                        pet_id: pet.id
                    }
                  })
                })
                .then(r => r.json)
                .then(resObj => {
                    this.setState({
                        myPets: [...this.state.myPets, resObj]
                    })
                })
            } else {
                alert("You've already adopted this pet!")
            }
        }


    }

    givePetUp = (pet) => {
        alert("Are you sure you want to give me up? :(")
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then(r => r.json())
        .then(resObj => {
            const thisPet = resObj.adopt_pets.find(element => element.pet_id === pet.id)
            // console.log(thisPet)
            this.setState({
                adoptPetID: thisPet.id
             }, () => this.unadoptPet(pet))
        })
    }

    unadoptPet = (pet) => {
        fetch(`http://localhost:3000/adopt_pets/${this.state.adoptPetID}`, {
            method: "DELETE"
        })
        .then(() => {
            const newPets = this.state.myPets.filter((eachPet) => {
                return eachPet !== pet
            })
            this.setState({
                myPets: newPets
            })
        })
    }

    handleMyPetsClick = (pet) => {
        this.setState({
            selectedPet: pet,
            seePet: !this.state.seePet
        })
    }

    handlePetClick = () => {
        this.setState({
            seePet: !this.state.seePet
        })
    }


    //

    render(){
        let petDiv = <Pet pet={this.state.selectedPet} seePet={this.state.seePet} handleClick={this.handlePetClick} userID={this.props.userID} />

        const dashboardDiv =
        <div className="dashboard">
            <NavBar onClick={this.props.logOutClick} username={this.state.username} />

        <h2>All Pets</h2>
        <PetCollection pets={this.state.allPets} handleClick={this.handleAllPetsClick} myPetCollection={false} buttonText="Adopt Me"/>
        <h2>My Pets</h2>
                <PetCollection pets={this.state.myPets} handleClick={this.handleMyPetsClick} myPetCollection={true} buttonText="Play with Me" givePetUp={this.givePetUp}/>
        </div>

        return(
            <div>
                { this.state.seePet ? petDiv : dashboardDiv }
            </div>
        )
    }
}

