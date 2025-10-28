import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import { useGitHub } from "@/context/GithubContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import RepositoryCard from "@/components/RepositoryCard";
import { GitHubRepository, GitHubUser } from "@/types/github.types";

const AboutTab = React.memo<{ userData: GitHubUser }>(({ userData }) => {
  const formattedDate = useMemo(
    () =>
      new Date(userData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [userData.created_at]
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        About {userData.name || userData.login}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {userData.bio && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body1">{userData.bio}</Typography>
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Profile Statistics
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 1,
            }}
          >
            <Typography variant="body2">
              <strong>Public Repositories:</strong> {userData.public_repos}
            </Typography>
            <Typography variant="body2">
              <strong>Public Gists:</strong> {userData.public_gists}
            </Typography>
            <Typography variant="body2">
              <strong>Followers:</strong> {userData.followers}
            </Typography>
            <Typography variant="body2">
              <strong>Following:</strong> {userData.following}
            </Typography>
            <Typography variant="body2">
              <strong>Account Created:</strong> {formattedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AboutTab.displayName = "AboutTab";

const RepositoriesTab = React.memo<{
  repos: GitHubRepository[];
  loading: boolean;
  hasMoreRepos: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}>(({ repos, loading, hasMoreRepos, scrollContainerRef }) => {
  if (repos.length === 0 && !loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No public repositories found
        </Typography>
      </Box>
    );
  }

  return (
    <Box ref={scrollContainerRef}>
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={30} />
        </Box>
      )}

      {!hasMoreRepos && repos.length > 0 && (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="body2" color="text.secondary">
            All repositories loaded
          </Typography>
        </Box>
      )}
    </Box>
  );
});

RepositoriesTab.displayName = "RepositoriesTab";

const RepositoryList: React.FC = () => {
  const { repos, userData, loading, hasMoreRepos, loadMoreRepos } = useGitHub();
  const [tabValue, setTabValue] = useState<number>(0);

  const scrollContainerRef = useInfiniteScroll(
    loadMoreRepos,
    hasMoreRepos,
    loading
  );

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number): void => {
      setTabValue(newValue);
    },
    []
  );

  if (!userData) return null;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={`Repositories (${userData.public_repos})`}
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab label="About" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 0}
        id="tabpanel-0"
        aria-labelledby="tab-0"
      >
        {tabValue === 0 && (
          <RepositoriesTab
            repos={repos}
            loading={loading}
            hasMoreRepos={hasMoreRepos}
            scrollContainerRef={scrollContainerRef}
          />
        )}
      </Box>

      <Box
        role="tabpanel"
        hidden={tabValue !== 1}
        id="tabpanel-1"
        aria-labelledby="tab-1"
      >
        {tabValue === 1 && <AboutTab userData={userData} />}
      </Box>
    </Box>
  );
};

export default React.memo(RepositoryList);
