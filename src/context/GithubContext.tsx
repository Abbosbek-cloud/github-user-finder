import React, { createContext, useState, useContext, useCallback } from "react";
import { getCache, setCache } from "@/utils/cache";
import type {
  GitHubUser,
  GitHubRepository,
  GitHubContextType,
} from "@/types/github.types";
import {
  checkRateLimit,
  fetchUserProfile,
  fetchUserRepositories,
} from "@/services/github";

// Create context with proper typing
const GitHubContext = createContext<GitHubContextType | null>(null);

// State interface
interface GitHubState {
  userData: GitHubUser | null;
  repos: GitHubRepository[];
  loading: boolean;
  error: string | null;
  searchedUsername: string;
  currentPage: number;
  hasMoreRepos: boolean;
}

// Initial state
const initialState: GitHubState = {
  userData: null,
  repos: [],
  loading: false,
  error: null,
  searchedUsername: "",
  currentPage: 1,
  hasMoreRepos: false,
};

// Provider props
interface GitHubProviderProps {
  children: React.ReactNode;
}

// GitHub provider component with enhanced error handling
export const GitHubProvider: React.FC<GitHubProviderProps> = ({ children }) => {
  const [state, setState] = useState<GitHubState>(initialState);

  /**
   * Check if error is due to rate limiting
   */
  const handleAPIError = async (error: string): Promise<string> => {
    // Check rate limit status
    const rateLimitResult = await checkRateLimit();

    if (rateLimitResult.success && rateLimitResult.data) {
      const { rate } = rateLimitResult.data;

      if (rate.remaining === 0) {
        const resetTime = new Date(rate.reset * 1000).toLocaleTimeString();
        return `Rate limit exceeded. Resets at ${resetTime}. Try again later.`;
      }
    }

    return error;
  };

  /**
   * Search for a GitHub user
   */
  const searchUser = useCallback(async (username: string): Promise<void> => {
    if (!username || !username.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a username",
      }));
      return;
    }

    const trimmedUsername = username.trim();

    // Check cache first
    const cachedUser = getCache<GitHubUser>(`user_${trimmedUsername}`);
    const cachedRepos = getCache<GitHubRepository[]>(
      `repos_${trimmedUsername}_1`
    );

    if (cachedUser && cachedRepos) {
      setState({
        userData: cachedUser,
        repos: cachedRepos,
        loading: false,
        error: null,
        searchedUsername: trimmedUsername,
        currentPage: 1,
        hasMoreRepos: cachedRepos.length === 10,
      });
      return;
    }

    // If not in cache, fetch from API
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      searchedUsername: trimmedUsername,
    }));

    try {
      // Fetch user profile
      const userResult = await fetchUserProfile(trimmedUsername);

      if (!userResult.success || !userResult.data) {
        const errorMessage = await handleAPIError(
          userResult.error || "Failed to fetch user"
        );

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          userData: null,
          repos: [],
        }));
        return;
      }

      // Fetch repositories
      const reposResult = await fetchUserRepositories(trimmedUsername, 1, 10);

      if (!reposResult.success || !reposResult.data) {
        const errorMessage = await handleAPIError(
          reposResult.error || "Failed to fetch repositories"
        );

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          userData: userResult.data ?? null,
          repos: [],
        }));
        return;
      }

      // Cache the results
      setCache(`user_${trimmedUsername}`, userResult.data);
      setCache(`repos_${trimmedUsername}_1`, reposResult.data);

      setState({
        userData: userResult.data,
        repos: reposResult.data,
        loading: false,
        error: null,
        searchedUsername: trimmedUsername,
        currentPage: 1,
        hasMoreRepos: reposResult.hasMore,
      });
    } catch (error) {
      console.error("Error searching user:", error);
      const errorMessage = await handleAPIError("An unexpected error occurred");

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  /**
   * Load more repositories (for infinite scroll)
   */
  const loadMoreRepos = useCallback(async (): Promise<void> => {
    if (!state.searchedUsername || state.loading || !state.hasMoreRepos) {
      return;
    }

    const nextPage = state.currentPage + 1;

    // Check cache first
    const cachedRepos = getCache<GitHubRepository[]>(
      `repos_${state.searchedUsername}_${nextPage}`
    );

    if (cachedRepos) {
      setState((prev) => ({
        ...prev,
        repos: [...prev.repos, ...cachedRepos],
        currentPage: nextPage,
        hasMoreRepos: cachedRepos.length === 10,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const reposResult = await fetchUserRepositories(
        state.searchedUsername,
        nextPage,
        10
      );

      if (reposResult.success && reposResult.data) {
        // Cache the results
        setCache(
          `repos_${state.searchedUsername}_${nextPage}`,
          reposResult.data
        );

        setState((prev) => ({
          ...prev,
          repos: [...prev.repos, ...reposResult.data!],
          loading: false,
          currentPage: nextPage,
          hasMoreRepos: reposResult.hasMore,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          hasMoreRepos: false,
        }));
      }
    } catch (error) {
      console.error("Error loading more repos:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        hasMoreRepos: false,
      }));
    }
  }, [
    state.searchedUsername,
    state.loading,
    state.hasMoreRepos,
    state.currentPage,
  ]);

  /**
   * Clear search results
   */
  const clearSearch = useCallback((): void => {
    setState(initialState);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback((): void => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: GitHubContextType = {
    ...state,
    searchUser,
    loadMoreRepos,
    clearSearch,
    clearError,
  };

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
};

// Custom hook to use GitHub context
export const useGitHub = (): GitHubContextType => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }
  return context;
};

export default GitHubContext;
