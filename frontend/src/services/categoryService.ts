import api from "./api";
import { Category, CategoryRequest } from "@/types";

class CategoryService {
    async getMyCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>("/api/categories/me");
        return response.data;
    }

    async createCategory(request: CategoryRequest): Promise<Category> {
        const response = await api.post<Category>("/api/categories", request);
        return response.data;
    }
}

export default new CategoryService();