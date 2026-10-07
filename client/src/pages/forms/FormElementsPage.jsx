import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  AttachMoney,
  CloudUpload,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  Search,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { PageHeader, COUNTRY_OPTIONS } from '../../components/common';

function Section({ title, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}
Section.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };

const SKILLS = ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Python', 'Docker', 'AWS', 'GraphQL'];

// Every basic input type in one place. All fields are "controlled":
// React state is the single source of truth and the input just displays it.
const FormElementsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('USA');
  const [skills, setSkills] = useState(['React', 'Node.js']);
  const [multi, setMulti] = useState(['Email']);
  const [checks, setChecks] = useState({ news: true, offers: false, updates: true });
  const [radio, setRadio] = useState('monthly');
  const [switches, setSwitches] = useState({ wifi: true, bluetooth: false });
  const [volume, setVolume] = useState(40);
  const [range, setRange] = useState([20, 70]);
  const [align, setAlign] = useState('left');
  const [files, setFiles] = useState([]);

  return (
    <Box>
      <PageHeader title="Form Elements" subtitle="Inputs, selects, checkboxes, radios, switches, sliders and file upload — all controlled by React state." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Text Fields">
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField label="Outlined" placeholder="John Doe" />
              <TextField label="Filled" variant="filled" />
              <TextField label="Standard" variant="standard" />
              <TextField label="Disabled" disabled defaultValue="Can't touch this" />
              <TextField label="With helper text" helperText="We'll never share your email." />
              <TextField label="Error state" error helperText="This field is required" />
              <TextField label="Small" size="small" />
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Adornments & Special Inputs">
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                label="Search"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search /></InputAdornment> } }}
              />
              <TextField
                label="Amount"
                type="number"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><AttachMoney fontSize="small" /></InputAdornment> } }}
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="fe-password">Password</InputLabel>
                <OutlinedInput
                  id="fe-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label="toggle password visibility">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
                />
              </FormControl>
              <TextField label="Message" multiline minRows={3} placeholder="Write something…" />
              <TextField label="Date" type="date" slotProps={{ inputLabel: { shrink: true } }} />
              <TextField label="Time" type="time" slotProps={{ inputLabel: { shrink: true } }} />
            </Box>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Select & Autocomplete">
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField select label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
                {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
              <FormControl>
                <InputLabel id="fe-multi">Contact methods</InputLabel>
                <Select
                  labelId="fe-multi"
                  multiple
                  value={multi}
                  onChange={(e) => setMulti(e.target.value)}
                  input={<OutlinedInput label="Contact methods" />}
                  renderValue={(sel) => (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {sel.map((v) => <Chip key={v} label={v} size="small" />)}
                    </Box>
                  )}
                >
                  {['Email', 'Phone', 'SMS', 'Slack'].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <Autocomplete
                multiple
                options={SKILLS}
                value={skills}
                onChange={(_, v) => setSkills(v)}
                renderInput={(params) => <TextField {...params} label="Skills (type to search)" />}
              />
              <Autocomplete
                freeSolo
                options={COUNTRY_OPTIONS}
                renderInput={(params) => <TextField {...params} label="Free text with suggestions" />}
              />
            </Box>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Checkboxes, Radios & Switches">
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Email me about</FormLabel>
              <FormGroup row>
                {Object.keys(checks).map((k) => (
                  <FormControlLabel
                    key={k}
                    control={<Checkbox checked={checks[k]} onChange={(e) => setChecks({ ...checks, [k]: e.target.checked })} />}
                    label={k[0].toUpperCase() + k.slice(1)}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <FormControl sx={{ mb: 2, display: 'block' }}>
              <FormLabel>Billing cycle</FormLabel>
              <RadioGroup row value={radio} onChange={(e) => setRadio(e.target.value)}>
                <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                <FormControlLabel value="lifetime" control={<Radio />} label="Lifetime" disabled />
              </RadioGroup>
            </FormControl>
            <FormGroup row sx={{ mb: 2 }}>
              {Object.keys(switches).map((k) => (
                <FormControlLabel
                  key={k}
                  control={<Switch checked={switches[k]} onChange={(e) => setSwitches({ ...switches, [k]: e.target.checked })} />}
                  label={k === 'wifi' ? 'Wi-Fi' : 'Bluetooth'}
                />
              ))}
            </FormGroup>
            <Typography variant="body2" color="text.secondary">
              State: {JSON.stringify({ checks, radio, switches })}
            </Typography>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Sliders & Toggle Buttons">
            <Typography gutterBottom>Volume: {volume}</Typography>
            <Slider value={volume} onChange={(_, v) => setVolume(v)} valueLabelDisplay="auto" sx={{ mb: 2 }} />
            <Typography gutterBottom>Price range: ${range[0]} – ${range[1]}</Typography>
            <Slider value={range} onChange={(_, v) => setRange(v)} valueLabelDisplay="auto" color="secondary" sx={{ mb: 2 }} />
            <Slider defaultValue={30} step={10} marks min={0} max={100} valueLabelDisplay="auto" color="success" sx={{ mb: 3 }} />
            <ToggleButtonGroup value={align} exclusive onChange={(_, v) => v && setAlign(v)}>
              <ToggleButton value="left" aria-label="left"><FormatAlignLeft /></ToggleButton>
              <ToggleButton value="center" aria-label="center"><FormatAlignCenter /></ToggleButton>
              <ToggleButton value="right" aria-label="right"><FormatAlignRight /></ToggleButton>
            </ToggleButtonGroup>
            <Typography sx={{ mt: 1, textAlign: align }} color="text.secondary">Aligned {align}</Typography>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="File Upload">
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
              }}
            >
              <CloudUpload color="primary" sx={{ fontSize: 48 }} />
              <Typography sx={{ my: 1 }}>Choose files to see them listed below</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Files stay in your browser — nothing is uploaded.
              </Typography>
              <Button variant="contained" component="label">
                Browse files
                <input hidden multiple type="file" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
              </Button>
            </Box>
            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {files.map((f) => (
                  <Typography key={f.name} variant="body2">
                    {f.name} — {(f.size / 1024).toFixed(1)} KB
                  </Typography>
                ))}
                <Button size="small" color="error" sx={{ mt: 1 }} onClick={() => setFiles([])}>Clear</Button>
              </Box>
            )}
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormElementsPage;
