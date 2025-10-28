// GitHub API Response Types

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface RepositoriesResponse extends APIResponse<GitHubRepository[]> {
  hasMore: boolean;
}

// Context Types
export interface GitHubContextType {
  userData: GitHubUser | null;
  repos: GitHubRepository[];
  loading: boolean;
  error: string | null;
  searchedUsername: string;
  currentPage: number;
  hasMoreRepos: boolean;
  searchUser: (username: string) => Promise<void>;
  loadMoreRepos: () => Promise<void>;
  clearSearch: () => void;
  clearError: () => void;
}

export interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
  theme: any; // MUI Theme type
}

export interface RateLimitResponse {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    search: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    graphql: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
  };
  rate: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
  };
}
