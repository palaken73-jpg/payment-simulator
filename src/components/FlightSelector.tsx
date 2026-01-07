import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Chip,
  Avatar 
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

export interface Flight {
  id: number;
  from: string;
  to: string;
  price: number;
  airline: string;
  token: string;
  duration: string;
}

interface FlightSelectorProps {
  flights?: Flight[];
  onSelect: (flight: Flight) => void;
  selectedId?: number;
}

const DEFAULT_FLIGHTS: Flight[] = [
  { id: 1, from: 'JFK', to: 'LAX', price: 0.85, airline: 'FlyAnyTrip Air', token: 'ETH', duration: '5h 45m' },
  { id: 2, from: 'LHR', to: 'CDG', price: 0.42, airline: 'Web3 Airways', token: 'USDC', duration: '1h 20m' },
  { id: 3, from: 'SFO', to: 'HND', price: 1.25, airline: 'Crypto Airlines', token: 'ETH', duration: '10h 30m' },
];

const FlightSelector: React.FC<FlightSelectorProps> = ({ 
  flights = DEFAULT_FLIGHTS, 
  onSelect, 
  selectedId 
}) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {flights.map((flight) => {
        const isSelected = selectedId === flight.id;
        
        return (
          <Card
            key={flight.id}
            elevation={isSelected ? 3 : 1}
            onClick={() => onSelect(flight)}
            sx={{
              cursor: 'pointer',
              border: isSelected ? '2px solid #2196f3' : '1px solid #e0e0e0',
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar sx={{ bgcolor: '#2196f3', width: 32, height: 32 }}>
                      {flight.airline.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {flight.airline}
                    </Typography>
                    <Chip label="Direct" size="small" color="success" variant="outlined" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlightTakeoffIcon />
                      <Typography variant="h6">{flight.from}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {flight.duration}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlightLandIcon />
                      <Typography variant="h6">{flight.to}</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {flight.price.toFixed(2)} {flight.token}
                  </Typography>
                  <Button
                    variant={isSelected ? "outlined" : "contained"}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(flight);
                    }}
                  >
                    {isSelected ? '✓ Selected' : 'Select'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default FlightSelector;