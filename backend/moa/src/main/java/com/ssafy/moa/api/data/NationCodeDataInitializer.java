package com.ssafy.moa.api.data;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Component
public class NationCodeDataInitializer implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(checkIfInitialDataExists()) {
            insertInitialData();
        }
    }

    private boolean checkIfInitialDataExists() {
        Long count = (Long) entityManager.createQuery("SELECT COUNT(1) FROM NationCode nc").getSingleResult();
        return count == 0;
    }

    private void insertInitialData() {

        StringBuilder insertQuery = new StringBuilder("INSERT INTO nation_code (nation_code, nation_name) VALUES ");

        // 나라 데이터 가져오기
        String[] countries = Locale.getISOCountries();

        for (int i = 0; i < countries.length; i++) {
            Locale locale = new Locale("en", countries[i]);
            insertQuery.append("(").append(i+1).append(", '").append(locale.getDisplayCountry()).append("')");
            if (i < countries.length - 1) {
                insertQuery.append(", ");
            }
        }

        entityManager.createNativeQuery(insertQuery.toString()).executeUpdate();
    }
}
