import React, {useEffect, useState} from "react";
import {addPlant, getGold, waterPlants} from "../Database/DatabaseMethods";
import Button from "@mui/material/Button";
import {Plants} from "./Plants";

export const GardenPage = () => {
    const [gold, setGold] = useState([]);
    const refresh = () => window.location.reload()

    useEffect( () => {
        async function fetchData() {
            try {
                setGold(await getGold())
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handleAddPlant = (e) => {
        e.preventDefault();
        addPlant().then(refresh)
    };
    const handleWater = (e) =>{
        e.preventDefault();
        waterPlants().then(refresh);
    }

    return (
        <div className="panel panel-default post-body">
            <h4 className="post-editor-text"> Gold: {gold} </h4>
            <Plants/>
            <Button className="btn btn-success post-editor-button" onClick={handleAddPlant}>
                Add Plant
            </Button>
            <Button className="btn btn-success post-editor-button" onClick={handleWater}>
                Water All
            </Button>
        </div>
    )
};

