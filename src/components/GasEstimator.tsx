import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SpeedIcon from '@mui/icons-material/Speed';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface GasEstimatorProps {
  amount: number;
  token: string;
}

type GasSpeed = 'slow' | 'average' | 'fast';

const GasEstimator: React.FC<GasEstimatorProps> = ({ amount, token }) => {
  const [gasSpeed, setGasSpeed] = useState<GasSpeed>('average');
  const [gasPrice, setGasPrice] = useState<number>(0.000025);
  const networkFee = 0.0005;
  const gasPrices = {
    slow: 0.000020,
    average: 0.000025,
    fast: 0.000032
  };
 
  useEffect(() => {
  const gasPrices = {
    slow: 0.000020,
    average: 0.000025,
    fast: 0.000032
  };
  setGasPrice(gasPrices[gasSpeed]);
}, [gasSpeed]);

  const gasCost = amount * 0.002; 
  const totalGas = gasCost + gasPrice + networkFee;
  const totalAmount = amount + totalGas;
  
  const ethToUsd = 2500;
  const totalUsd = totalAmount * ethToUsd;
  
  const handleSpeedChange = (speed: GasSpeed) => {
    setGasSpeed(speed);
  };
  
  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GasMeterIcon /> Gas & Fees Estimation
      </Typography>
      
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f8f9fa', 
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
     
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SpeedIcon fontSize="small" /> Transaction Speed
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(['slow', 'average', 'fast'] as GasSpeed[]).map((speed) => (
              <Chip
                key={speed}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {speed === 'slow' ? 'Slow' : speed === 'average' ? ' Average' : 'Fast'}
                    {gasSpeed === speed && ' ✓'}
                  </Box>
                }
                onClick={() => handleSpeedChange(speed)}
                variant={gasSpeed === speed ? 'filled' : 'outlined'}
                color={gasSpeed === speed ? 'primary' : 'default'}
                sx={{ 
                  textTransform: 'capitalize',
                  flex: 1,
                  py: 2
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {gasSpeed === 'slow' ? '~5-10 minutes • Cheapest' : 
             gasSpeed === 'average' ? '~2-5 minutes • Recommended' : 
             '~1-2 minutes • Priority'}
          </Typography>
        </Box>
        
       
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Cost Breakdown
          </Typography>
          
          <Box sx={{ 
            bgcolor: 'white', 
            p: 2, 
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2">
                Flight Ticket
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {amount.toFixed(4)} {token}
              </Typography>
            </Box>
            
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2">
                  Network Gas
                </Typography>
                <Tooltip title="Cost to process the transaction on blockchain">
                  <InfoIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 14 }} />
                </Tooltip>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {gasCost.toFixed(6)} {token}
              </Typography>
            </Box>
            
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2">
                Gas Price ({gasSpeed})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gasPrice.toFixed(6)} {token}
              </Typography>
            </Box>
            
          
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2">
                  Network Fee
                </Typography>
                <Tooltip title="network fee">
                  <InfoIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 14 }} />
                </Tooltip>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {networkFee.toFixed(4)} {token}
              </Typography>
            </Box>
            
           
            <Box sx={{ 
              height: 1, 
              bgcolor: '#e0e0e0', 
              my: 1.5,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 8,
                height: 8,
                border: '2px solid #e0e0e0',
                borderRadius: '50%',
                bgcolor: 'white'
              }
            }} />
            
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Amount : 
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {totalAmount.toFixed(4)} {token}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ≈ ${totalUsd.toFixed(2)} INR
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
      
        <Box sx={{ 
          p: 2, 
          bgcolor: '#e8f5e9', 
          borderRadius: 1,
          border: '1px solid #c8e6c9'
        }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CurrencyExchangeIcon fontSize="small" color="success" />
            <Box component="span" fontWeight="medium" color="success.dark">
              Token Rewards:
            </Box>
            You'll earn <Box component="span" fontWeight="bold">{(amount * 10).toFixed(0)} </Box> tokens
          </Typography>
          <Typography variant="caption" color="success.dark" sx={{ mt: 0.5, display: 'block' }}>
            Redeemable for future flights and upgrades
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GasEstimator;
