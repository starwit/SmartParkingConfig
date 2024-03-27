import { Home } from "@mui/icons-material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationDialog from "../../commons/dialog/ConfirmationDialog";

function ObservationAreaMenu(props) {
    const {
        observationAreas,
        selectedArea,
        onHomeClick, 
        onEditClick, 
        onAreaChange, 
        onProcessingChange
    } = props
    
    const {t} = useTranslation();

    const [processingPromptOpen, setProcessingPromptOpen] = useState(false);

    const handleChange = event => {
        const newObservationAreaId = event.target.value;
        onAreaChange(newObservationAreaId);
    };

    function openProcessingPrompt() {
        setProcessingPromptOpen(true);
    }

    function closeProcessingPrompt() {
        setProcessingPromptOpen(false);
    }

    function toggleProcessing() {
        closeProcessingPrompt();
        onProcessingChange();
    }

    return (
        <Stack
            direction="row"
            sx={{marginTop: "0.4rem", height: "2.2rem", color: "dimgrey"}}
            useFlexGap
            flexWrap="nowrap"
        >
            <FormControl sx={{paddingLeft: "0.5rem"}}>
                <IconButton sx={{height: "2rem"}}
                    onClick={onHomeClick}>
                    <Home fontSize="small" />
                </IconButton>
            </FormControl>
            <FormControl sx={{boxShadow: "none", width: "20rem"}}>
                <Select sx={{height: "2rem", margin: "0rem"}}
                    value={selectedArea.id} onChange={handleChange}>
                    {observationAreas.map(entity => (
                        <MenuItem sx={{margin: "0rem"}}
                            key={entity.id} value={entity.id} >{entity.name}</MenuItem>))}
                </Select>
            </FormControl >
            <FormControl>
                <IconButton sx={{height: "2rem"}} onClick={onEditClick}>
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
            </FormControl>

            <FormControl>
                <IconButton sx={{height: "2rem"}}
                    onClick={openProcessingPrompt}>
                    {selectedArea.processingEnabled ? <StopCircleIcon fontSize="small" color="error" /> : <PlayCircleFilledWhiteIcon fontSize="small" />} 
                </IconButton>
                <ConfirmationDialog
                    title={t("observationArea.track.title")}
                    message={t("observationArea.track.message")}
                    open={processingPromptOpen}
                    onClose={closeProcessingPrompt}
                    onSubmit={toggleProcessing}
                    confirmTitle={t("button.submit")}
                />           
            </FormControl>
        </Stack >
    );
}


export default ObservationAreaMenu;