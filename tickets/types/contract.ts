export type Chain = 'ethereum' | 'polygon' | 'bsc' | 'arbitrum';

export interface EventDetails {
  name: string;
  symbol: string;
  description: string;
  chain: Chain;
  totalSupply: number;
  paymentToken: string;
}

export interface Benefit {
  name: string;
  details: string;
}

export interface TicketTier {
  name: string;
  price: number;
  supply: number;
  benefits: Benefit[];
  maxPerWallet: number;
}

export interface SecuritySettings {
  requireKYC: boolean;
  enableMultiSig: boolean;
  enableRateLimiting: boolean;
  enablePausable: boolean;
}

export interface GeoZone {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface LocationSettings {
  enabled: boolean;
  zones: GeoZone[];
}

export interface MarketSettings {
  enableResale: boolean;
  royaltyPercentage: number;
  soulbound: boolean;
}

export interface ContractConfig {
  eventDetails: EventDetails;
  ticketTiers: TicketTier[];
  security: SecuritySettings;
  location: LocationSettings;
  market: MarketSettings;
}