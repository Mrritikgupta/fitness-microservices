package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@Data
public class ActivityMessageListener {
    private  final ActivityAIService activityAIService;
    private  final RecommendationRepository recommendationRepository;

    @KafkaListener(topics = "${spring.kafka.topic.name}",groupId = "activity-processor-group")
    public void processActivity(Activity activity){
        try{
        log.info("Received Activity for processing: {}", activity.getUserId());
       Recommendation recommendation = activityAIService.generateRecommendation(activity);
       recommendationRepository.save(recommendation);

        } catch(Exception e){
            log.error("Error processing activity: {}", e.getMessage());
        }

    }
}
