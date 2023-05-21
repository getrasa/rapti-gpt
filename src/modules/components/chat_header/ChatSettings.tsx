import Popper, { PopperProps } from "@mui/material/Popper";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChatStateContext } from "../ChatStateProvider";
import { MenuItem, Select } from "@mui/material";
import { MouseEvent, useContext } from "react";
import { SupportedLanguages } from "../chat_content/TextToSpeech";
import { useState } from "react";
import { ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";

const ChatSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const clickAwayHandler = () => setIsOpen(false);
  const clickHandler = () => setIsOpen(true);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    clickHandler();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-describedby={"language-popper"}
        onClick={handleClick}
        sx={{ color: "#C5C5D2" }}
        size="small"
      >
        <SettingsIcon fontSize="small" />
      </IconButton>
      {isOpen && (
        <PopperWithArrow
          open={isOpen && open}
          anchorEl={anchorEl}
          popperId={"language-popper"}
          clickAwayHandler={clickAwayHandler}
        />
      )}
    </>
  );
};
export default ChatSettings;

const PopperWithArrow: React.FC<
  Omit<
    PopperProps & {
      popperId: string | undefined;
      clickAwayHandler?: () => void;
    },
    "children"
  >
> = ({ open, anchorEl, popperId, clickAwayHandler }) => {
  return (
    <ClickAwayListener
      onClickAway={() => clickAwayHandler?.()}
      mouseEvent={"onMouseUp"}
    >
      <Popper
        id={popperId}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        modifiers={[{ name: "arrow", enabled: true }]}
        sx={{
          backgroundColor: "#272932",
          borderRadius: 1,
          color: "#C5C5D2",
          padding: 2,
          boxShadow: 4,
        }}
      >
        <Grid container spacing={2} minWidth={300}>
          <Grid item xs={6} display="flex" alignItems="center">
            <Typography variant="body1">T2S Language</Typography>
          </Grid>
          <Grid item xs={6}>
            <LanguageSelect />
          </Grid>
          {/* <Grid item xs={6} display="flex" alignItems="center">
            <Typography variant="body1">Text 2</Typography>
          </Grid>
          <Grid item xs={6}>
            <LanguageSelect />
          </Grid> */}
        </Grid>
      </Popper>
    </ClickAwayListener>
  );
};

const LanguageSelect: React.FC = () => {
  const context = useContext(ChatStateContext);
  const { mainLanguage, setMainLanguage } = context!;

  const handleChange: any = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const languageCode = event.target.value as SupportedLanguages;
    setMainLanguage(languageCode);
    console.log("Language changed to:", languageCode);
  };

  return (
    <Select
      value={mainLanguage}
      onChange={handleChange}
      size="small"
      sx={{ backgroundColor: "#C5C5D2", width: "100%" }}
    >
      <MenuItem value={SupportedLanguages.English}>English</MenuItem>
      <MenuItem value={SupportedLanguages.Polish}>Polish</MenuItem>
      <MenuItem value={SupportedLanguages.Japanese}>Japanese</MenuItem>
      <MenuItem value={SupportedLanguages.Spanish}>Spanish</MenuItem>
      <MenuItem value={SupportedLanguages.Chinese}>Chinese</MenuItem>
      <MenuItem value={SupportedLanguages.Italian}>Italian</MenuItem>
      <MenuItem value={SupportedLanguages.Russian}>Russian</MenuItem>
    </Select>
  );
};
