import React, {useState, useMemo, useEffect} from "react";
import ParkingAreaRest from "../../../services/ParkingAreaRest";
import {useHistory} from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function ParkingAreaSelect() {
    const [selected, setSelected] = React.useState(0);
    const parkingareaRest = useMemo(() => new ParkingAreaRest(), []);
    const history = useHistory();
    const [parkingAreaAll, setParkingAreaAll] = useState([]);

    useEffect(() => {
        reload();
    }, []);

    function reload() {
        parkingareaRest.findAll().then(response => {
            setParkingAreaAll(response.data);
            setSelected(3);
            console.log(selected);
        });
    }

    const handleChange = event => {
        setSelected(event.target.value);
        console.log(selected);
        history.push("/parkingarea/update/" + event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>ParkingArea</InputLabel>
            <Select value={selected} label="ParkingArea" onChange={handleChange}>
                {parkingAreaAll.map(entity => (
                    <MenuItem key={entity.id} value={entity.id} >{entity.name}</MenuItem> ))}
            </Select>
        </FormControl>);
}

export default ParkingAreaSelect;
