import axios, { type AxiosInstance } from "axios";
import type {
  GitHubUser,
  GitHubRepository,
  APIResponse,
  RepositoriesResponse,
  RateLimitResponse,
} from "../types/github.types";

const BASE_URL = "https://api.github.com";

// Create axios instance with base configuration
const githubAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

/**
 * Fetch GitHub user profile data
 * @param username - GitHub username
 * @returns User data object
 */
export const fetchUserProfile = async (
  username: string
): Promise<APIResponse<GitHubUser>> => {
  try {
    const response = await githubAPI.get<GitHubUser>(`/users/${username}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.status === 404
          ? "User not found"
          : "Failed to fetch user data",
    };
  }
};

/**
 * Fetch user's public repositories
 * @param username - GitHub username
 * @param page - Page number for pagination
 * @param perPage - Number of repos per page
 * @returns Repository data array
 */
export const fetchUserRepositories = async (
  username: string,
  page: number = 1,
  perPage: number = 10
): Promise<RepositoriesResponse> => {
  try {
    const response = await githubAPI.get<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        params: {
          page,
          per_page: perPage,
          sort: "updated",
          direction: "desc",
        },
      }
    );

    return {
      success: true,
      data: response.data,
      hasMore: response.data.length === perPage,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to fetch repositories",
      data: [],
      hasMore: false,
    };
  }
};

/**
 * Check GitHub API rate limit status
 * @returns Rate limit information
 */
export const checkRateLimit = async (): Promise<
  APIResponse<RateLimitResponse>
> => {
  try {
    const response = await githubAPI.get<RateLimitResponse>("/rate_limit");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to check rate limit",
    };
  }
};

export default {
  fetchUserProfile,
  fetchUserRepositories,
  checkRateLimit,
};
