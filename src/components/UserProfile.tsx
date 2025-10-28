import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Grid,
  Chip,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  Business,
  Link as LinkIcon,
  Email,
  Twitter,
  GitHub,
} from "@mui/icons-material";

import { useGitHub } from "@/context/GithubContext";

interface StatItem {
  label: string;
  value: number;
}

const UserProfile: React.FC = () => {
  const { userData } = useGitHub();

  if (!userData) return null;

  const {
    avatar_url,
    name,
    login,
    bio,
    location,
    company,
    blog,
    email,
    twitter_username,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    created_at,
  } = userData;

  const stats: StatItem[] = [
    { label: "Repositories", value: public_repos },
    { label: "Followers", value: followers },
    { label: "Following", value: following },
    { label: "Gists", value: public_gists },
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      sx={{
        mb: 4,
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Avatar and Basic Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={avatar_url}
                alt={name || login}
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {name || login}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{login}
              </Typography>

              <IconButton
                component="a"
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{ mt: 1 }}
              >
                <GitHub />
              </IconButton>
            </Box>
          </Grid>

          {/* Details and Stats */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Bio */}
            {bio && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.primary">
                  {bio}
                </Typography>
              </Box>
            )}

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {stats.map((stat) => (
                <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "action.hover",
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {stat.value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Additional Info */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {location && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {location}
                  </Typography>
                </Box>
              )}

              {company && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Business fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {company}
                  </Typography>
                </Box>
              )}

              {blog && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LinkIcon fontSize="small" color="action" />
                  <Link
                    href={blog.startsWith("http") ? blog : `https://${blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                  >
                    {blog}
                  </Link>
                </Box>
              )}

              {email && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email fontSize="small" color="action" />
                  <Link href={`mailto:${email}`} variant="body2">
                    {email}
                  </Link>
                </Box>
              )}

              {twitter_username && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Twitter fontSize="small" color="action" />
                  <Link
                    href={`https://twitter.com/${twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                  >
                    @{twitter_username}
                  </Link>
                </Box>
              )}

              <Box sx={{ mt: 1 }}>
                <Chip
                  label={`Member since ${formatDate(created_at)}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
