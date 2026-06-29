package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.DashboardResponse;
import com.pluralsight.financebuddy.services.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/user/{userId}")
    public DashboardResponse getDashboardByUser(@PathVariable Long userId) {
        return dashboardService.getDashboardByUserId(userId);
    }
}