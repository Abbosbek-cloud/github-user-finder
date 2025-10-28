import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Link,
  IconButton,
} from "@mui/material";
import { Star, OpenInNew } from "@mui/icons-material";
import type { GitHubRepository } from "@/types/github.types";
import ForkIcon from "@/icons/Fork.icon";

interface RepositoryCardProps {
  repo: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    stargazers_count,
    forks_count,
    language,
    updated_at,
    topics = [],
  } = repo;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365)
      return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  // Language colors (common ones)
  const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
  };

  return (
    <Card
      sx={{
        mb: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 4px 12px rgba(0,0,0,0.1)"
              : "0 4px 12px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent>
        {/* Repository Name */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Link
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography variant="h6" fontWeight="600" color="primary">
              {name}
            </Typography>
          </Link>

          <IconButton
            size="small"
            component="a"
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 1 }}
          >
            <OpenInNew fontSize="small" />
          </IconButton>
        </Box>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )}

        {/* Topics */}
        {topics.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
            {topics.slice(0, 5).map((topic) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
          </Box>
        )}

        {/* Stats and Language */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
          }}
        >
          {language && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: languageColors[language] || "#888",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {language}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star fontSize="small" sx={{ color: "#fbbf24" }} />
            <Typography variant="body2" color="text.secondary">
              {stargazers_count.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ForkIcon fontSize="small" fontWeight={500} color="action" />
            <Typography variant="body2" color="text.secondary">
              {forks_count.toLocaleString()}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {formatDate(updated_at)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;
