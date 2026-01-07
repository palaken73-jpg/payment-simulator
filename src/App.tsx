import React, { useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import WalletConnector from './components/WalletConnector';
import FlightSelector, { Flight } from './components/FlightSelector';
import GasEstimator from './components/GasEstimator';
import TransactionTracker from './components/TransactionTracker';


function App() {
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleConnect = (acc: string) => {
    setAccount(acc);
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const FloatingDecorations = () => (
    <>
      <div className="floating-heart" style={{ left: '10%', top: '20%', color: '#FFB6C1' }}>♥</div>
      <div className="floating-heart" style={{ left: '85%', top: '40%', color: '#DDA0DD' }}>♥</div>
      <div className="floating-heart" style={{ left: '15%', top: '70%', color: '#FF8FAB' }}>♥</div>
      <div className="floating-heart" style={{ left: '90%', top: '80%', color: '#FF69B4' }}>♥</div>
      <div className="floating-heart" style={{ left: '5%', top: '90%', color: '#FF1493' }}>♥</div>
    </>
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, position: 'relative' }}>
      <FloatingDecorations />
      
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
          ✈️ FlyAnyTrip Web3 Simulator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Book flights with cryptocurrency • Powered by blockchain
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left Column: Flight Selection */}
        <Box sx={{ flex: 2 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Step 1: Choose Your Flight
            </Typography>
            
            <FlightSelector 
              onSelect={handleSelectFlight}
              selectedId={selectedFlight?.id}
            />
            
            <Box sx={{ my: 4, height: 1, bgcolor: '#e0e0e0' }} />
            
            <Typography variant="h5" gutterBottom>
              Step 2: Connect Your Wallet
            </Typography>
            
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <WalletConnector 
                onConnect={handleConnect}
                onConnectionChange={handleConnectionChange}
              />
            </Box>
          </Paper>
        </Box>

        {/* Right Column: Summary */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Booking Summary
            </Typography>
            
            {selectedFlight ? (
              <Box>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" color="primary">
                    {selectedFlight.from} → {selectedFlight.to}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedFlight.airline} • {selectedFlight.duration}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2, color: '#2196f3' }}>
                    {selectedFlight.price.toFixed(2)} {selectedFlight.token}
                  </Typography>
                </Box>
                
                {isConnected ? (
                  <Box>
                    <Typography variant="body2" color="success.main" gutterBottom>
                      ✅ Wallet connected and ready for payment
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                      <GasEstimator 
                        amount={selectedFlight.price}
                        token={selectedFlight.token}
                      />
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                      <TransactionTracker 
                        isConnected={isConnected}
                        amount={selectedFlight.price}
                        token={selectedFlight.token}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Connect your wallet to proceed with payment
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                Select a flight to see booking details
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">
          This is a simulation for FlyAnyTrip internship application • Built overnight
        </Typography>
        <Typography variant="caption" display="block">
          React + TypeScript + Web3.js • Not a real booking system
        </Typography>
      </Box>

      <MyMelodyMascot />
    </Container>
  );
}

export default App;
