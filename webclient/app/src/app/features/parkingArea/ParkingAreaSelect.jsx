
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
    IconButton,
    Stack,
    Toolbar
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";
import {
    entityDefault
} from "../../modifiers/ParkingAreaModifier";
import ParkingAreaRest from "../../services/ParkingAreaRest";
import ParkingAreaDialog from "./ParkingAreaDialog";
import {AppBar} from "../../assets/styles/HeaderStyles";

function ParkingAreaSelect() {
    const [selectedArea, setSelectedArea] = useImmer(entityDefault);
    const parkingareaRest = useMemo(() => new ParkingAreaRest(), [entityDefault]);
    const [parkingAreaAll, setParkingAreaAll] = useImmer([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isCreate, setIsCreate] = React.useState(false);
    const {t} = useTranslation();
    const {parkingAreaId} = useParams();
    const nav = "/parkingarea/";
    const navigate = useNavigate();

    useEffect(() => {
        reload();
    }, [parkingAreaId]);

    function reload() {
        parkingareaRest.findAll().then(response => {
            const loadedAreas = response.data;
            setParkingAreaAll(loadedAreas);

            const preselectedArea = loadedAreas.find(entity => entity.id === parseInt(parkingAreaId));
            if (preselectedArea !== undefined) {
                setSelectedArea(preselectedArea);
            } else {
                navigate(`${nav}${loadedAreas[0].id}`);
            }
        });
    }

    function update(modifiedEntity) {
        if (isCreate) {
            parkingareaRest.findAll().then(response => {
                navigate(`${nav}${modifiedEntity.id}`);
            });
        } else {
            navigate(`${nav}${modifiedEntity.id}`);
        }
    }

    function handleDelete() {
        if (!!selectedArea) {
            parkingareaRest.delete(selectedArea.id).then(response => {
                parkingareaRest.findAll().then(response => {
                    navigate(`${nav}${response.data[0].id}`);
                });
            });
        }
    }

    const handleChange = event => {
        const newParkingAreaId = event.target.value;
        navigate(`${nav}${newParkingAreaId}`);
    };

    function handleDialogOpen() {
        setOpenDialog(true);
        setIsCreate(false);
    }

    function handleCreateDialogOpen() {
        setOpenDialog(true);
        setIsCreate(true);
    }

    function handleDialogClose() {
        reload();
        setOpenDialog(false);
    }

    return (
        <Stack
            direction="row"
            sx={{marginTop: "0.4rem", height: "2.2rem", color: "dimgrey"}}
            useFlexGap
            flexWrap="nowrap"
        >
            <FormControl sx={{boxShadow: "none", width: "20rem"}}>
                <Select sx={{height: "2rem", margin: "0rem"}}
                    value={selectedArea.id} onChange={handleChange}>
                    {parkingAreaAll.map(entity => (
                        <MenuItem sx={{margin: "0rem"}}
                            key={entity.id} value={entity.id} >{entity.name}</MenuItem>))}
                </Select>
            </FormControl >
            <FormControl>
                <IconButton sx={{height: "2rem"}}
                    onClick={handleCreateDialogOpen}>
                    <AddCircleIcon fontSize="small" />
                </IconButton>
            </FormControl>
            <FormControl>
                <IconButton sx={{height: "2rem"}}
                    onClick={handleDialogOpen}>
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
            </FormControl>
            <FormControl>
                <IconButton sx={{height: "2rem"}}
                    onClick={handleDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </FormControl>
            <ParkingAreaDialog
                open={openDialog}
                onClose={handleDialogClose}
                isCreate={isCreate}
                selected={selectedArea}
                update={update}
            />
        </Stack >
    );
}

export default ParkingAreaSelect;
