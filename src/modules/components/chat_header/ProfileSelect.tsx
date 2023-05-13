import React from "react";
import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";

type ChatWindowProfile = {
  title: string;
  content: string;
};

interface ProfileSelectProps {
  profileList: ChatWindowProfile[];
  selectedProfile: ChatWindowProfile | null;
  onSelect: (profile: ChatWindowProfile) => void;
}

const ProfileSelect: React.FC<ProfileSelectProps> = ({ profileList, selectedProfile, onSelect }) => {
    const handleChange = (event: SelectChangeEvent) => {
      const profile = profileList.find((p) => p.title === event.target.value);
      if (profile) {
        onSelect(profile);
      }
    };
  
    return (
        <FormControl
        variant="outlined"
        size="small"
        sx={{
            background: "#343642",
          position: 'absolute',
          left: 16,
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              borderColor: '#C5C5D2',
              borderRadius: 6,
              borderWidth: 0.5,
            },
          },
          '.MuiSvgIcon-root ': {
            fill: "#C5C5D2 !important",
          }
        }}
      >
        <Select value={selectedProfile?.title || ""} onChange={handleChange}
          sx={{ color: "#C5C5D2", fontSize: 13, height: 18}}>
          {profileList.map((profile) => (
            <MenuItem key={profile.title} value={profile.title}>
              {profile.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export default ProfileSelect;