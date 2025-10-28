import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Tooltip,
  IconButton,
  Collapse,
  Typography,
  LinearProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";

import { RateLimitResponse } from "@/types/github.types";
import { checkRateLimit } from "@/services/github";

const RateLimitMonitor: React.FC = () => {
  const [rateLimit, setRateLimit] = useState<RateLimitResponse | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRateLimit = async () => {
    setLoading(true);
    const result = await checkRateLimit();
    if (result.success && result.data) {
      setRateLimit(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRateLimit();
  }, []);

  if (!rateLimit) return null;

  const { rate } = rateLimit;
  const percentage = (rate.remaining / rate.limit) * 100;
  const resetTime = new Date(rate.reset * 1000).toLocaleTimeString();

  // Color based on remaining requests
  const getColor = () => {
    if (percentage > 50) return "success";
    if (percentage > 20) return "warning";
    return "error";
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={`${rate.remaining} / ${rate.limit} requests remaining`}>
          <Chip
            label={`API: ${rate.remaining}/${rate.limit}`}
            color={getColor()}
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>

        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          <InfoIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" onClick={fetchRateLimit} disabled={loading}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box
          sx={{
            mt: 1,
            p: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 250,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            GitHub API Rate Limit
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="body2">Remaining:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {rate.remaining} / {rate.limit}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={percentage}
              color={getColor()}
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" color="text.secondary">
              Resets at: {resetTime}
            </Typography>
          </Box>

          {/* Detailed Resources */}
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              Resources:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption">Core:</Typography>
                <Typography variant="caption">
                  {rateLimit.resources.core.remaining}/
                  {rateLimit.resources.core.limit}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption">Search:</Typography>
                <Typography variant="caption">
                  {rateLimit.resources.search.remaining}/
                  {rateLimit.resources.search.limit}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption">GraphQL:</Typography>
                <Typography variant="caption">
                  {rateLimit.resources.graphql.remaining}/
                  {rateLimit.resources.graphql.limit}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default RateLimitMonitor;
