import { useId } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";

export function RSVPForm() {
  const { t } = useTranslation();
  const noticeId = useId();

  return (
    <Box>
      <Typography
        id={noticeId}
        sx={{
          mb: 3,
          color: "#a71650",
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
          textAlign: "right",
          transform: "rotate(-4deg)",
        }}
      >
        {t("eventEnded")}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ opacity: 0.55 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            {t("confirmAttendance")}
          </Typography>
          <Box
            component="form"
            aria-describedby={noticeId}
            onSubmit={(event) => event.preventDefault()}
            sx={{ maxWidth: 400, mx: "auto" }}
          >
            <TextField
              fullWidth
              label={t("yourName")}
              name="fullName"
              value=""
              margin="normal"
              variant="standard"
              disabled
            />
            <FormControl
              component="fieldset"
              sx={{ my: 3, width: "100%" }}
              disabled
            >
              <FormLabel component="legend">{t("willYouAttend")}</FormLabel>
              <RadioGroup
                name="attendance"
                value="yes"
                row
                sx={{ justifyContent: "center", mt: 1 }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={t("yesAttend")}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label={t("noAttend")}
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              disabled
              sx={{
                mt: 2,
                py: 1.5,
                borderWidth: 2,
                borderRadius: 0,
                letterSpacing: "0.1em",
              }}
            >
              {t("submitResponse")}
            </Button>
          </Box>
        </Box>
        <Box
          component="svg"
          aria-hidden="true"
          viewBox="0 0 500 340"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            color: "#e41e71",
          }}
        >
          <path
            d="M 28 37 C 142 46 326 27 465 33
              L 59 60 C 180 52 352 63 440 48
              C 463 51 145 116 57 137
              C 152 127 321 135 453 116
              L 89 151 Q 256 136 425 142
              C 445 151 163 202 82 217
              Q 227 239 431 211
              L 53 244 Q 195 242 405 229
              C 430 237 130 282 49 302
              Q 229 295 449 307
              L 104 321 Q 286 312 424 318"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.68"
          />
        </Box>
      </Box>
    </Box>
  );
}
