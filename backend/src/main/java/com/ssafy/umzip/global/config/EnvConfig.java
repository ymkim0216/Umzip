package com.ssafy.umzip.global.config;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertySourceFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;
import java.util.Properties;

@Component
@Configuration
public class EnvConfig implements PropertySourceFactory {

    @Override
    public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
        YamlPropertiesFactoryBean factoryBean = new YamlPropertiesFactoryBean();
        factoryBean.setResources(resource.getResource());
        Properties properties = factoryBean.getObject();
        assert properties != null;
        return new PropertiesPropertySource(Objects.requireNonNull(resource.getResource().getFilename()), properties);
    }
}
