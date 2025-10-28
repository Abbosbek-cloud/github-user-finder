import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./App.css";

import { useGitHub } from "./context/GithubContext";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/Searchbar";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import UserProfile from "./components/UserProfile";
import RepositoryList from "./components/RepositoryList";
import RateLimitMonitor from "./components/RateLimit";

function App() {
  const { userData, loading, error, clearError } = useGitHub();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {/* App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 2px 12px rgba(102, 126, 234, 0.3)",
        }}
      >
        <Toolbar>
          <GitHubIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub User Finder
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{ py: 4, minHeight: "calc(100dvh - 126px)" }}
      >
        {/* Search Bar */}
        <SearchBar />

        {/* Error Message */}
        {error && <ErrorMessage error={error} onClose={clearError} />}

        {/* Loading State */}
        {loading && !userData && (
          <LoadingSpinner message="Searching for user..." />
        )}

        {/* User Profile and Repositories */}
        {userData && (
          <>
            <UserProfile />
            <RepositoryList />
          </>
        )}

        {/* Welcome Message */}
        {!userData && !loading && !error && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <GitHubIcon
              sx={{
                fontSize: 80,
                color: "text.secondary",
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom fontWeight="600">
              Welcome to GitHub User Finder
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Search for any GitHub user to view their profile and repositories
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Built with React, Material UI, and the GitHub API
          </Typography>
        </Container>
      </Box>
      <RateLimitMonitor />
    </Box>
  );
}

export default App;
