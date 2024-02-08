import {Add} from "@mui/icons-material";
import {Container, Grid, Typography} from "@mui/material";
import {AddFabButton, LoadingSpinner, Statement} from "@starwit/react-starwit";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import ParkingAreaRest from "../../services/ParkingAreaRest";
import ParkingAreaCard from "./ParkingAreaCard";
import {useNavigate} from "react-router";
import ParkingAreaDialog from "./ParkingAreaDialog";

function ParkingAreaOverview() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const parkingAreaRest = useMemo(() => new ParkingAreaRest(), []);
    const [parkingAreas, setParkingAreas] = useState(null);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);


    const loadParkingAreas = useCallback(() => {
        setParkingAreas(null);
        parkingAreaRest.findAll().then(response => {
            setParkingAreas(response.data);
        });
    }, [parkingAreaRest, setParkingAreas]);

    useEffect(() => {
        loadParkingAreas();
    }, [loadParkingAreas]);

    function update() {
        loadParkingAreas();
    };

    function deleteById(id) {
        return parkingAreaRest.delete(id)
            .then(response => {
                setParkingAreas(null);
                loadParkingAreas();
            });
    }

    function renderParkingAreas() {
        if (!parkingAreas) {
            return <LoadingSpinner message={t("parkingAreas.loading")} />;
        }

        if (parkingAreas.length === 0) {
            return (
                <Statement
                    icon={<Add />}
                    message={t("parkingAreas.empty")}
                />
            );
        }

        return (
            <Grid container spacing={5}>
                {parkingAreas?.map(area => (
                    <Grid item sm={6} xs={12} key={area.id}>
                        <ParkingAreaCard
                            onEditClick={update}
                            onDeleteClick={deleteById}
                            parkingArea={area} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Container>
            <Typography variant={"h2"} gutterBottom>
                {t("parkingAreas.title")}
            </Typography>
            {renderParkingAreas()}
            <ParkingAreaDialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
                isCreate={true}
                selected={null}
                update={() => update()}
            />
            <AddFabButton onClick={() => setOpenUpdateDialog(true)} />
        </Container>
    );
}

export default ParkingAreaOverview;
