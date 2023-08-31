import ReactImageAnnotate from "@starwit/react-image-annotate";
import {useEffect, useMemo, useState} from "react";
import ClassificationRest from "../../services/ClassificationRest";
import {Typography} from "@mui/material";
import ImageRest from "../../services/ImageRest";

function ImageAnnotate(props){

    const [classifications, setClassifications] = useState(null);
    const [images, setImages] = useState(null);
    const [parsedImages, setParsedImages] = useState(null);
    const classificationRest = useMemo(() => new ClassificationRest(), []);
    const imageRest = useMemo(() => new ImageRest(), []);

    useEffect(() => {
        classificationRest.findAll().then(response => {
            setClassifications(response.data)
        })
    }, [])

    useEffect(() => {
        imageRest.findAll().then(response => {
            setImages(response.data)
        })
    }, [])

    useEffect(() => {
        if (!images){
            return
        }
        const newImages = [...images];
        const createdParsedImages = newImages.map(image => {
            console.log("parsing", image)
            return {
                id: image.id,
                src: window.location.pathname + "api/imageFile/name/"+image.src,
                name: image.name,
                regions: image.polygon?.map(poly => {
                    return {
                        type: "polygon",
                        id: poly.id,
                        color:poly.classifications[0]?.color,
                        cls: poly.classifications[0]?.name,
                        open: poly.open,
                        points: poly.points?.map(point => [point.xvalue, point.yvalue])
                    }
                })
            }
        })
        console.log("CreatedParsedImages",createdParsedImages);
        setParsedImages(createdParsedImages)
    }, [images])


    /*
    {
        src:
        namne:
        polygon: [
            {
                open: bool
                classification: [
                    {
                        name:
                    }
                ]
                point: [
                    {
                        xvalue:
                        yvalue
                    }
                ]
            }
        ]
        parkingConfig:{}
    }
     */
    function saveImageAnnotations(evnt){
        const localImages = evnt.images;
        const savePreparedImages = images.map(image => {
            return {
                ...image,
                polygon: localImages.find(imageFind => imageFind.id === image.id).regions.map(region => {
                    return {
                        classification:  (typeof region.cls == "object" && region.cls.isArray) ? region.cls.map(cl => classifications.find(classification => classification.name === cl)) : [classifications.find(classification => classification.name === region.cls)] ,
                        points: region.points.map(point => {
                            return {
                                xvalue: point[0],
                                yvalue: point[1]
                            }
                        })
                    }
                    }
                )
            }
        })
        console.log("beforePrepImages",evnt.images)
        console.log("beforePrepEvent",evnt.images)
        console.log("SavedPrepped images", savePreparedImages)
        savePreparedImages.map(image => imageRest.create(image))
        console.log(evnt.images.map(image => image.regions))
        console.log(evnt)
    }

    if (!classifications || !parsedImages){
        return <Typography>Loading</Typography>
    }

    if (parsedImages.length === 0){
        return <Typography>No images created. Please add some first</Typography>
    }

    return(
        <>
            {console.log("IMAGES", parsedImages)}

        <ReactImageAnnotate
            labelImages
            regionClsList={classifications.map(classification => classification.name)}
            onExit={saveImageAnnotations}
            hideNext
            hidePrev
            enabledTools={["select", "create-point", "create-polygon", "create-box", "create-line"]}
            images={parsedImages}
            hideHeaderText
        />
        </>
    )
}
export default ImageAnnotate
