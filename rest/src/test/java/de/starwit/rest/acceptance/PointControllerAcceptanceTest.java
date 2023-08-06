package de.starwit.rest.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;

import de.starwit.persistence.entity.PointEntity;

@SpringBootTest
@EnableAutoConfiguration
@AutoConfigureMockMvc(addFilters = false)
public class PointControllerAcceptanceTest extends AbstractControllerAcceptanceTest<PointEntity> {


    final static Logger LOG = LoggerFactory.getLogger(PointControllerAcceptanceTest.class);
    private static final String data = "testdata/point/";
    private static final String restpath = "/api/points/";

    private JacksonTester<PointEntity> jsonTester;

    @Override
    public Class<PointEntity> getEntityClass() {
        return PointEntity.class;
    }

    @Override
    public String getRestPath() {
        return restpath;
    }

    @Override
    public JacksonTester<PointEntity> getJsonTester() {
        return jsonTester;
    }

    @Test
    public void canCreate() throws Exception {
        // given
//        PointEntity entity = readFromFile(data + "Point.json");
  
        // when
//        MockHttpServletResponse response = create(entity);

        // then
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
//        PointEntity entityresult = mapper.readValue(response.getContentAsString(), PointEntity.class);
//        assertThat(entityresult.getBranch()).isEqualTo("v2");
    }

    @Test
    public void isValidated() throws Exception {
        // given
//        PointEntity entity = readFromFile(data + "Point-wrong.json");
  
        // when
//        MockHttpServletResponse response = create(entity);

        // then
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void canNotFindById() throws Exception {
        // when
        MockHttpServletResponse response = mvc
                .perform(get(getRestPath() + "/4242").contentType(MediaType.APPLICATION_JSON)).andReturn()
                .getResponse();

        // then
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void canRetrieveById() throws Exception {
        // given
//        PointEntity entity = readFromFile(data + "Point.json");
//        MockHttpServletResponse response = create(entity);
//        PointEntity entity2 = mapper.readValue(response.getContentAsString(), PointEntity.class);

        // when
//        response = retrieveById(entity2.getId());

        // then
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
//        PointEntity entityresult = mapper.readValue(response.getContentAsString(), PointEntity.class);
//        assertThat(dtoresult.getBranch()).isEqualTo("v2");
    }

    @Test
    public void canUpdate() throws Exception {

        // given
//        PointEntity entity = readFromFile(data + "Point.json");
//        MockHttpServletResponse response = create(entity);
//        PointEntity entity2 = mapper.readValue(response.getContentAsString(), PointEntity.class);

        // when
//        response = update(entity2);

        // then
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
//        PointEntity entityresult = mapper.readValue(response.getContentAsString(), PointEntity.class);
//        assertThat(dtoresult.getBranch()).isEqualTo("v2");
    }

    @Override
    @Test
    public void canDelete() throws Exception {
        // given
//        PointEntity entity = readFromFile(data + "Point.json");
//        MockHttpServletResponse response = create(entity);
//        PointEntity entity2 = mapper.readValue(response.getContentAsString(), PointEntity.class);
//        response = retrieveById(entity2.getId());
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());

        // when
//        delete(entity2.getId());

        // then
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
//        response = retrieveById(entity2.getId());
//        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

}
