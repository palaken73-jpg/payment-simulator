import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress, Paper, Alert, AlertTitle,Collapse,IconButton} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface TransactionTrackerProps {
  isConnected: boolean;
  amount: number;
  token: string;
}

type TransactionStep = 'idle' | 'approving' | 'processing' | 'confirming' | 'success' | 'error';

const TransactionTracker: React.FC<TransactionTrackerProps> = ({ 
  isConnected, 
  amount, 
  token 
}) => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const steps = [
    { key: 'approving', label: 'Approve Spending', description: 'Allow contract to spend your tokens' },
    { key: 'processing', label: 'Process Payment', description: 'Transfer tokens to FlyAnyTrip' },
    { key: 'confirming', label: 'Confirm Booking', description: 'Secure your flight on blockchain' },
  ];

  const simulateTransaction = async () => {
    if (!isConnected) {
      setErrorMessage('Please connect your wallet first');
      setCurrentStep('error');
      return;
    }

    try {
      // Step 1: Approving
      setCurrentStep('approving');
      setErrorMessage('');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 2: Processing
      setCurrentStep('processing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 3: Confirming
      setCurrentStep('confirming');
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Success
      setCurrentStep('success');
      setTxHash(`0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`);
      
    } catch (error) {
      setCurrentStep('error');
      setErrorMessage('Transaction failed. Please try again.');
    }
  };

  const resetTransaction = () => {
    setCurrentStep('idle');
    setTxHash('');
    setErrorMessage('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txHash || '0x000...000');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepIndex = (step: TransactionStep) => {
    const stepOrder = ['idle', 'approving', 'processing', 'confirming', 'success', 'error'];
    return stepOrder.indexOf(step);
  };

  const progressValue = currentStep === 'idle' ? 0 : 
                       currentStep === 'approving' ? 33 : 
                       currentStep === 'processing' ? 66 : 
                       currentStep === 'confirming' ? 90 : 100;

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptIcon /> Complete Payment
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            {steps.map((step, index) => {
              const stepKey = step.key as TransactionStep;
              const isCompleted = getStepIndex(currentStep) > getStepIndex(stepKey);
              const isCurrent = currentStep === stepKey;
              
              return (
                <Box key={step.key} sx={{ textAlign: 'center', flex: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: isCompleted ? '#4CAF50' : isCurrent ? '#2196f3' : '#e0e0e0',
                      color: isCompleted || isCurrent ? 'white' : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </Box>
                  <Typography variant="caption" fontWeight={isCurrent ? 'bold' : 'normal'}>
                    {step.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressValue} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }}
          />
        </Box>

        {currentStep === 'idle' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Ready to Book! ✈️
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Pay {amount.toFixed(2)} {token} to confirm your flight
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={simulateTransaction}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                textTransform: 'none'
              }}
              startIcon={<ArrowForwardIcon />}
            >
              Pay with Crypto
            </Button>
          </Box>
        )}

        {currentStep === 'approving' && (
          <Alert severity="info" icon={<PendingIcon />} sx={{ mb: 2 }}>
            <AlertTitle>Approving Transaction</AlertTitle>
            Please approve the spending cap in your wallet...
          </Alert>
        )}

        {currentStep === 'processing' && (
          <Alert severity="info" icon={<PendingIcon />} sx={{ mb: 2 }}>
            <AlertTitle>Processing Payment</AlertTitle>
            Transferring {amount.toFixed(2)} {token} to FlyAnyTrip...
          </Alert>
        )}

        {currentStep === 'confirming' && (
          <Alert severity="info" icon={<PendingIcon />} sx={{ mb: 2 }}>
            <AlertTitle>Confirming on Blockchain</AlertTitle>
            Waiting for network confirmation (2/12 blocks)...
          </Alert>
        )}

        {currentStep === 'success' && (
          <Box>
            <Alert 
              severity="success" 
              icon={<CheckCircleIcon />}
              action={
                <IconButton onClick={resetTransaction} color="inherit" size="small">
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: 3 }}
            >
              <AlertTitle>Payment Successful! </AlertTitle>
              Your flight has been booked and confirmed on the blockchain.
            </Alert>
            
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 Transaction Details
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Transaction Hash:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontFamily="monospace">
                    {txHash}
                  </Typography>
                  <IconButton size="small" onClick={copyToClipboard}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              
              {copied && (
                <Typography variant="caption" color="success.main">
                  Copied to clipboard!
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Status:
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  Confirmed
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Amount:
                </Typography>
                <Typography variant="body2">
                  {amount.toFixed(2)} {token}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Network:
                </Typography>
                <Typography variant="body2">
                  Ethereum Mainnet
                </Typography>
              </Box>
            </Paper>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                You earned {(amount * 10).toFixed(0)} tokens!
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tokens have been deposited to your wallet. Use them for future bookings.
              </Typography>
            </Box>
          </Box>
        )}

        {currentStep === 'error' && (
          <Alert 
            severity="error" 
            icon={<ErrorIcon />}
            action={
              <Button color="inherit" size="small" onClick={resetTransaction}>
                Try Again
              </Button>
            }
          >
            <AlertTitle>Payment Failed</AlertTitle>
            {errorMessage || 'Transaction was rejected or failed.'}
          </Alert>
        )}

        {/* Current Step Description */}
        {currentStep !== 'idle' && currentStep !== 'success' && currentStep !== 'error' && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            {steps.find(s => s.key === currentStep)?.description}
          </Typography>
        )}

        {/* Loading Animation */}
        {(currentStep === 'approving' || currentStep === 'processing' || currentStep === 'confirming') && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              This may take a few seconds...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TransactionTracker;
