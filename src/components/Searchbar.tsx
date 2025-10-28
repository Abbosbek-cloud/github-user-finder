import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useGitHub } from "@/context/GithubContext";
import createDebouncedFunction from "@/utils/debounce";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { searchUser, clearSearch } = useGitHub();

  // Create debounced search function with proper typing
  const debouncedSearch = useRef(
    createDebouncedFunction((username: string) => {
      // Double-check that username is not empty before searching
      if (username && username.trim()) {
        searchUser(username);
      }
    }, 500)
  ).current;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    // Cancel any pending searches first
    debouncedSearch.cancel();

    // Only schedule a new search if value is not empty
    if (value.trim()) {
      debouncedSearch(value);
    } else {
      // If input is cleared, clear the search results
      clearSearch();
    }
  };

  // Handle clear button
  const handleClear = (): void => {
    // Cancel any pending debounced searches
    debouncedSearch.cancel();

    // Clear input and results
    setInputValue("");
    clearSearch();
  };

  // Handle form submit (for Enter key)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Cancel any pending debounced searches
    debouncedSearch.cancel();

    // Only search if input has value
    if (inputValue.trim()) {
      searchUser(inputValue);
    }
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Search GitHub username..."
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "divider",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      </form>
      <Box sx={{ mt: 1 }}>
        <Box
          component="span"
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
          }}
        >
          Try searching for: octocat, torvalds, gaearon
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchBar;
