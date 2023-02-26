import InputSection from "@/components/layout/InputSection";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { NumericFormat } from "react-number-format";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const HouseSituationForm = () => {
  const {
    HousingFormState,
    handleChangeLocation,
    handleChangeType,
    handleChangePrice,
    handleChangePriceIncrementation,
    handleChangeIsOwnAndUnique,
    handleChangeIsEntiteldToReduction,
  } = useHousingForm();
  return (
    <>
      <FormPaneHeader title="House Situation" />
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            value={HousingFormState.location || ""}
            onChange={(e) => handleChangeLocation(e.target.value)}
            size="small"
            label="Location"
          >
            <MenuItem value={"Brussels"}>Brussels</MenuItem>
            <MenuItem value={"Flanders"}>Flanders</MenuItem>
            <MenuItem value={"Wallonia"}>Wallonia</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            value={HousingFormState.type || ""}
            onChange={(e) => handleChangeType(e.target.value)}
            size="small"
            label="Type"
          >
            <MenuItem value={"House"}>House</MenuItem>
            <MenuItem value={"Appartment"}>Appartment</MenuItem>
            <MenuItem value={"Domain"}>Domain</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <NumericFormat
            customInput={TextField}
            value={HousingFormState.price}
            label="Amount"
            variant="outlined"
            size="small"
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={" "}
            suffix={" €"}
            onValueChange={({ value: v }) => {
              handleChangePrice(+v);
            }}
            onKeyDown={(e) => {
              handleChangePriceIncrementation(e.key);
            }}
            InputProps={{
              style: {
                paddingRight: 0,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: "40px",
                      py: 1,
                      px: 1,
                    }}
                  >
                    <IconButton
                      sx={{
                        height: "25px",
                        width: "30px",
                        bgcolor: "#1E293B",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "#374151" },
                        mr: 1,
                      }}
                      onClick={() =>
                        handleChangePriceIncrementation("ArrowDown")
                      }
                    >
                      <RemoveIcon
                        sx={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        // border: 1,
                        height: "25px",
                        width: "30px",
                        bgcolor: "#1E293B",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "#374151" },
                      }}
                      onClick={() => handleChangePriceIncrementation("ArrowUp")}
                    >
                      <AddIcon
                        sx={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={HousingFormState.isOwnAndUnique || false}
                onChange={(e) => handleChangeIsOwnAndUnique(e.target.checked)}
              />
            }
            label="This home is my own an unique home"
          />
        </FormGroup>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={HousingFormState.isEntiteldToReduction || false}
                onChange={(e) =>
                  handleChangeIsEntiteldToReduction(e.target.checked)
                }
              />
            }
            label="I have the right to get an abattement"
          />
        </FormGroup>
      </InputSection>
    </>
  );
};

export default HouseSituationForm;
