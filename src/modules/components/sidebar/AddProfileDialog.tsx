import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserProfile } from "../../types/UserProfile";

interface AddProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newProfile: UserProfile) => void;
  initialValues?: UserProfile | null;
}

const AddProfileDialog: React.FC<AddProfileDialogProps> = ({
  open,
  onClose,
  onSave,
  initialValues,
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [content, setContent] = useState(initialValues?.content || "");

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (!title || !content) {
      return;
    }
    const newProfile: UserProfile = {
      title,
      content,
    };
    onSave(newProfile);
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialValues ? "Save Profile" : "Add Profile"}
      </DialogTitle>
      <DialogContent>
        <Box py={1}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            sx={{mt: 2}}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          {initialValues ? "Save" : "Add"}
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProfileDialog;
