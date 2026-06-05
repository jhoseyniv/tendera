'use client';

import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  'Company Info',
  'Workspace Setup',
  'Admin User Setup',
  'Subscription Selection',
  'Provisioning'
];

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleFinish = () => {
    alert('Onboarding Complete! (MVP)');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <TextField label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Workspace Name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Admin Name" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            <TextField label="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            <TextField label="Admin Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>Subscription Selection (Pilot / Enterprise)</Typography>
            <Button variant={activeStep === 3 ? 'contained' : 'outlined'}>Pilot Plan</Button>
            <Button variant={activeStep === 3 ? 'outlined' : 'contained'}>Enterprise Plan</Button>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>Provisioning in progress...</Typography>
            <Typography>Tenant and Workspace are being created.</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Onboarding Wizard</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleFinish}>Finish</Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Container>
  );
}