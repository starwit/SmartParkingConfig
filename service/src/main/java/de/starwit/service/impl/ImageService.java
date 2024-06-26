package de.starwit.service.impl;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import de.starwit.persistence.entity.ImageEntity;
import de.starwit.persistence.entity.ObservationAreaEntity;
import de.starwit.persistence.repository.ImageRepository;
import de.starwit.service.dto.FileDto;

@Service
public class ImageService implements ServiceInterface<ImageEntity, ImageRepository> {

    static final Logger LOG = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public ImageRepository getRepository() {
        return imageRepository;
    }

    public ImageEntity saveAndFlush(ImageEntity entity) {
        return imageRepository.saveAndFlush(entity);
    }

    public List<ImageEntity> findByObservationAreaId(Long id) {
        return imageRepository.findByObservationAreaId(id);
    }

    public ImageEntity uploadImage(MultipartFile imageFile, ObservationAreaEntity observationAreaEntity)
            throws IOException {

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setName(observationAreaEntity.getName());
        imageEntity.setType(imageFile.getContentType());
        imageEntity.setData(imageFile.getBytes());

        ByteArrayInputStream bis = new ByteArrayInputStream(imageFile.getBytes());
        BufferedImage bImage = ImageIO.read(bis);
        observationAreaEntity.setImageHeight(bImage.getHeight());
        observationAreaEntity.setImageWidth(bImage.getWidth());
        imageEntity.setObservationArea(observationAreaEntity);
        observationAreaEntity.setImage(imageEntity);

        return imageRepository.save(imageEntity);
    }

    public ImageEntity saveMetadata(ImageEntity entity) {
        if (entity != null) {
            if (entity.getId() != null) {
                ImageEntity newEntity = imageRepository.getReferenceById(entity.getId());
                newEntity.setName(entity.getName());
                newEntity.setData(entity.getData());
                newEntity.setType(entity.getType());
                return imageRepository.saveAndFlush(newEntity);
            }
            return imageRepository.saveAndFlush(entity);
        }
        return null;
    }

    public FileDto getImageAsFile(Long id) {
        ImageEntity image = imageRepository.getReferenceById(id);
        FileDto fileDto = new FileDto();
        fileDto.setByteArrayResource(new ByteArrayResource(image.getData()));
        fileDto.setFileSize(Long.valueOf(image.getData().length));
        fileDto.setName(image.getName());
        return fileDto;
    }

}
