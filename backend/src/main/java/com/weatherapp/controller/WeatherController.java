package com.weatherapp.controller;

import com.weatherapp.model.WeatherData;
import com.weatherapp.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3001")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/location")
    public WeatherData getWeatherByLocation(@RequestParam String lat, @RequestParam("lon") String lon) {
        System.out.println(lat+lon);
        return weatherService.getWeatherByLocation(lat, lon);
    }

    @GetMapping("/city")
    public WeatherData getWeatherByCity(@RequestParam("place") String city) {
        return weatherService.getWeatherByCity(city);
    }

    @GetMapping("/all")
    public List<WeatherData> getAllWeatherData() {
        return weatherService.getAllWeatherData();
    }
     // New endpoint to save weather data to the database
     @PostMapping("/save")
     public WeatherData saveWeatherData(@RequestBody WeatherData weatherData) {
         return weatherService.saveWeatherData(weatherData);
     }

}
