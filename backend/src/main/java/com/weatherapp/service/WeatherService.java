package com.weatherapp.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.weatherapp.model.WeatherData;
import com.weatherapp.repository.WeatherDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Service
public class WeatherService {

    @Autowired
    private WeatherDataRepository weatherDataRepository;

    private final String WEATHER_API_KEY = "7ae5b4c2c8d94ae7bce80813241707";

    public WeatherData getWeatherByLocation(String lat, String lon) {
        String url = "http://api.weatherapi.com/v1/current.json?key=" + WEATHER_API_KEY + "&q=" + lat + "," + lon;
        RestTemplate restTemplate = new RestTemplate();
        WeatherApiResponse response = restTemplate.getForObject(url, WeatherApiResponse.class);
        return convertToWeatherData(response);
    }

    public WeatherData getWeatherByCity(String city) {
        String url = "http://api.weatherapi.com/v1/current.json?key=" + WEATHER_API_KEY + "&q=" + city;
        RestTemplate restTemplate = new RestTemplate();
        WeatherApiResponse response = restTemplate.getForObject(url, WeatherApiResponse.class);
        return convertToWeatherData(response);
    }

    public List<WeatherData> getAllWeatherData() {
        return weatherDataRepository.findAll();
    }

    // New method to convert API response to WeatherData without saving it to the database
    private WeatherData convertToWeatherData(WeatherApiResponse response) {
        WeatherData weatherData = new WeatherData();
        weatherData.setPlaceName(response.getLocation().getName() + ", " + response.getLocation().getRegion() + ", " + response.getLocation().getCountry());
        weatherData.setDateTime(response.getLocation().getLocaltime());
        weatherData.setTemperature(response.getCurrent().getTempC());
        weatherData.setHumidity(response.getCurrent().getHumidity());
        weatherData.setPrecipitation(response.getCurrent().getPrecipMm());
        weatherData.setWindSpeed(response.getCurrent().getWindKph());
        weatherData.setUvIndex(response.getCurrent().getUv());
        weatherData.setAqi(0);
        weatherData.setCondition(response.getCurrent().getCondition().getText());
        weatherData.setPressure(response.getCurrent().getPressureMb());
        weatherData.setCloud(response.getCurrent().getCloud());
        weatherData.setFeelslikeC(response.getCurrent().getFeelslikeC());
        weatherData.setHeatindexC(response.getCurrent().getHeatindexC());
        weatherData.setDewpointC(response.getCurrent().getDewpointC());
        weatherData.setVisKm(response.getCurrent().getVisKm());
        weatherData.setDay(response.getCurrent().getIsDay() == 1 ? "Day" : "Night");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDate date = LocalDate.parse(response.getLocation().getLocaltime(), formatter);
        String weekday = date.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        weatherData.setWeekday(weekday);

        return weatherData;
    }

    // Method to save WeatherData to the database after user confirmation
    public WeatherData saveWeatherData(WeatherData weatherData) {
        return weatherDataRepository.save(weatherData);
    }

    // WeatherApiResponse class and nested classes with getters and setters...



    static class WeatherApiResponse {
        @JsonProperty("location")
        private Location location;

        @JsonProperty("current")
        private Current current;

        public Location getLocation() {
            return location;
        }

        public void setLocation(Location location) {
            this.location = location;
        }

        public Current getCurrent() {
            return current;
        }

        public void setCurrent(Current current) {
            this.current = current;
        }

        static class Location {
            @JsonProperty("name")
            private String name;

            @JsonProperty("region")
            private String region;

            @JsonProperty("country")
            private String country;

            @JsonProperty("localtime")
            private String localtime;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getRegion() {
                return region;
            }

            public void setRegion(String region) {
                this.region = region;
            }

            public String getCountry() {
                return country;
            }

            public void setCountry(String country) {
                this.country = country;
            }

            public String getLocaltime() {
                return localtime;
            }

            public void setLocaltime(String localtime) {
                this.localtime = localtime;
            }
        }

        static class Current {
            @JsonProperty("temp_c")
            private double temp_c;

            @JsonProperty("humidity")
            private int humidity;

            @JsonProperty("precip_mm")
            private double precip_mm;

            @JsonProperty("wind_kph")
            private double wind_kph;

            @JsonProperty("uv")
            private double uv;

            @JsonProperty("condition")
            private Condition condition;

            @JsonProperty("pressure_mb")
            private double pressure_mb;

            @JsonProperty("cloud")
            private int cloud;

            @JsonProperty("feelslike_c")
            private double feelslike_c;

            @JsonProperty("heatindex_c")
            private double heatindex_c;

            @JsonProperty("dewpoint_c")
            private double dewpoint_c;

            @JsonProperty("vis_km")
            private double vis_km;

            @JsonProperty("is_day")
            private int is_day;

            public double getTempC() {
                return temp_c;
            }

            public void setTempC(double temp_c) {
                this.temp_c = temp_c;
            }

            public int getHumidity() {
                return humidity;
            }

            public void setHumidity(int humidity) {
                this.humidity = humidity;
            }

            public double getPrecipMm() {
                return precip_mm;
            }

            public void setPrecipMm(double precip_mm) {
                this.precip_mm = precip_mm;
            }

            public double getWindKph() {
                return wind_kph;
            }

            public void setWindKph(double wind_kph) {
                this.wind_kph = wind_kph;
            }

            public double getUv() {
                return uv;
            }

            public void setUv(double uv) {
                this.uv = uv;
            }

            public Condition getCondition() {
                return condition;
            }

            public void setCondition(Condition condition) {
                this.condition = condition;
            }

            public double getPressureMb() {
                return pressure_mb;
            }

            public void setPressureMb(double pressure_mb) {
                this.pressure_mb = pressure_mb;
            }

            public int getCloud() {
                return cloud;
            }

            public void setCloud(int cloud) {
                this.cloud = cloud;
            }

            public double getFeelslikeC() {
                return feelslike_c;
            }

            public void setFeelslikeC(double feelslike_c) {
                this.feelslike_c = feelslike_c;
            }

            public double getHeatindexC() {
                return heatindex_c;
            }

            public void setHeatindexC(double heatindex_c) {
                this.heatindex_c = heatindex_c;
            }

            public double getDewpointC() {
                return dewpoint_c;
            }

            public void setDewpointC(double dewpoint_c) {
                this.dewpoint_c = dewpoint_c;
            }

            public double getVisKm() {
                return vis_km;
            }

            public void setVisKm(double vis_km) {
                this.vis_km = vis_km;
            }

            public int getIsDay() {
                return is_day;
            }

            public void setIsDay(int is_day) {
                this.is_day = is_day;
            }

            static class Condition {
                private String text;

                public String getText() {
                    return text;
                }

                public void setText(String text) {
                    this.text = text;
                }
            }
        }
    }
}
