import React, {useEffect, useState} from "react";
import './styles/Plant.css'
import {addPlant, plantsList, removePlant} from "../Database/DatabaseMethods";
import Button from "@mui/material/Button";

export const Plants = () => {
    const [plantList, setPlantList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const refresh = () => window.location.reload()

    useEffect( () => {
        async function fetchData() {
            try {
                setPlantList(await plantsList())
                for (const plant of plantList) {
                    if(plant.condition === "Dead"){
                        if(plantList.length === 1){
                            await addPlant(true);
                        }
                        await removePlant(plant.id)
                        alert(`Your ${plant.type} has died`);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData().then(() => setLoading(false));
    }, [plantList]);

    const handleButtonClick = event => {
        removePlant(event.currentTarget.id).then(refresh)
    };

    if (isLoading) {
        return <h2 className="App">Loading Garden...</h2>;
    }else{
        return (
            <div>
                <div className="container">
                    {plantList.map(function(plant, idx){
                        return (
                            <img
                                key={idx}
                                src={require(`../Images/${plant.type}/${plant.stage}.png`)}
                                width={160}
                                height={160}
                                className={'plant'}
                                alt={`${plant.type} with growth stage ${plant.stage}`}
                            />)
                    })}
                </div>
                <div className="buttonContainer">
                    {plantList.map(function(plant, idx){
                        return (
                            <Button key={idx} className="button">
                                <img className="button" src={require("../Images/delete.png")} alt="Delete" id={plant.id} onClick={handleButtonClick} />
                            </Button>
                        )
                    })}
                </div>
            </div>
        )
    }
}