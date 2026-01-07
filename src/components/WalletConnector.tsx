import React, { useState } from 'react';
import { Button, Alert, Box, Typography, Chip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface WalletConnectorProps {
  onConnect: (account: string) => void;
  onConnectionChange: (connected: boolean) => void;
}

const MOCK_ACCOUNTS = [
  '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  '0xAb5801a7D398351b8bE11C439e05C5B3259aec9B',
  '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db'
];

const WalletConnector: React.FC<WalletConnectorProps> = ({ 
  onConnect, 
  onConnectionChange 
}) => {
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
     
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      if (typeof (window as any).ethereum !== 'undefined') {
        // Real MetaMask flow
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
          const connectedAccount = accounts[0];
          setAccount(connectedAccount);
          onConnect(connectedAccount);
          onConnectionChange(true);
        }
      } else {
        const randomAccount = MOCK_ACCOUNTS[Math.floor(Math.random() * MOCK_ACCOUNTS.length)];
        setAccount(randomAccount);
        onConnect(randomAccount);
        onConnectionChange(true);
        setError('MetaMask not detected - using demo account');
      }
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    onConnect('');
    onConnectionChange(false);
    setError('');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!account ? (
        <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          disabled={isConnecting}
          fullWidth
          size="large"
          startIcon={<AccountBalanceWalletIcon />}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
              transition: 'all 0.2s'
            }
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect your Web3 Wallet'}
        </Button>
      ) : (
        <Box
          sx={{
            p: 2,
            border: '2px solid #4CAF50',
            borderRadius: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.05)',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ color: '#4CAF50' }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Wallet Connected
              </Typography>
            </Box>
            <Chip 
              label="Demo Mode" 
              size="small" 
              color="info" 
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
            {formatAddress(account)}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              Balance:
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {(Math.random() * 5 + 0.5).toFixed(2)} ETH
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={disconnectWallet}
            size="small"
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Disconnect
          </Button>
        </Box>
      )}
      
      {error && (
        <Alert 
          severity={error.includes('demo') ? 'info' : 'warning'} 
          sx={{ mt: 2 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      
      {!account && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          This demo works with MetaMask or in simulation mode
        </Typography>
      )}
    </Box>
  );
};

export default WalletConnector;
