// CircularProfile.tsx
import React from 'react';
import { Avatar } from '@mui/material';
import { styled } from "@mui/material/styles";

interface CircularProfileProps {
  size?: number;
  name: string;
}

const StyledAvatar = styled(Avatar)<{ size: number, isUser: boolean }>(({ theme, size, isUser }) => ({
  width: size,
  height: size,
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  fontSize: Math.floor(size * 0.36),
  fontWeight: 'bold',
}));

const CircularProfile: React.FC<CircularProfileProps> = ({ size = 52, name }) => {
  const isUser = name === 'user';

  return <StyledAvatar size={size} isUser={isUser}>{isUser ? "U" : "G"}</StyledAvatar>;
};

export default CircularProfile;
