package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.CategorySpendingResponse;
import com.pluralsight.financebuddy.dto.DashboardResponse;
import com.pluralsight.financebuddy.dto.MonthlySummaryResponse;
import com.pluralsight.financebuddy.services.CurrentUserService;
import com.pluralsight.financebuddy.services.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final CurrentUserService currentUserService;


    public DashboardController(DashboardService dashboardService, CurrentUserService currentUserService) {
        this.dashboardService = dashboardService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/me")
    public DashboardResponse getMyDashboard() {
        Long userId = currentUserService.getCurrentUser().getId();
        return dashboardService.getDashboardByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public DashboardResponse getDashboardByUser(@PathVariable Long userId) {
        return dashboardService.getDashboardByUserId(userId);
    }

    @GetMapping("/user/{userId}/spending-by-category")
    public List<CategorySpendingResponse> getSpendingByCategory(
            @PathVariable Long userId,
            @RequestParam int month,
            @RequestParam int year) {
        return dashboardService.getSpendingByCategory(userId, month, year);
    }

    @GetMapping("/user/{userId}/monthly-summary")
    public MonthlySummaryResponse getMonthlySummary(
            @PathVariable Long userId,
            @RequestParam int month,
            @RequestParam int year) {
        return dashboardService.getMonthlySummary(userId, month, year);
    }
}