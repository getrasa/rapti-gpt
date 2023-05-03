import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddProfileDialog from "./AddProfileDialog";

interface ProfilesDialogProps {
  open: boolean;
  onClose: () => void;
  profileList: UserProfile[];
  setProfileList: (profiles: UserProfile[]) => void;
}

const ProfilesDialog: React.FC<ProfilesDialogProps> = ({
  open,
  onClose,
  profileList,
  setProfileList,
}) => {
  const [addProfileDialogOpen, setAddProfileDialogOpen] = useState(false);
  const [editingProfileIndex, setEditingProfileIndex] = useState<number | null>(
    null
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Profiles</DialogTitle>
      <DialogContent>
        <List>
          {profileList.map((profile, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                setEditingProfileIndex(index);
                setAddProfileDialogOpen(true);
              }}
            >
              <ListItemText
                primary={profile.title}
                secondary={profile.content}
                primaryTypographyProps={{
                  noWrap: true,
                  style: { overflow: "hidden", textOverflow: "ellipsis" },
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  style: { overflow: "hidden", textOverflow: "ellipsis" },
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    const newProfileList = profileList.filter(
                      (_, i) => i !== index
                    );
                    setProfileList(newProfileList);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setAddProfileDialogOpen(true)}
          >
            Add Profile
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogActions>
      <AddProfileDialog
        open={addProfileDialogOpen}
        onClose={() => {
          setAddProfileDialogOpen(false);
          setEditingProfileIndex(null);
        }}
        onSave={(newProfile) => {
          if (editingProfileIndex !== null) {
            const updatedProfileList = [...profileList];
            updatedProfileList[editingProfileIndex] = newProfile;
            setProfileList(updatedProfileList);
          } else {
            setProfileList([...profileList, newProfile]);
          }
          setAddProfileDialogOpen(false);
          setEditingProfileIndex(null);
        }}
        initialValues={
          editingProfileIndex !== null ? profileList[editingProfileIndex] : null
        }
      />
    </Dialog>
  );
};
export default ProfilesDialog;
