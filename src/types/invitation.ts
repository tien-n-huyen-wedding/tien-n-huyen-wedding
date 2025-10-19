// Invitation component types
export interface InvitationData {
  // Couple information
  groomName: string;
  brideName: string;

  // Wedding details
  weddingDate: string;
  weddingTime: string;
  venue: string;
  venueAddress: string;

  // Optional fields
  message?: string;
  rsvpInfo?: string;
  dressCode?: string;

  // Styling options
  theme?: 'elegant' | 'romantic' | 'modern' | 'classic';
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Invitation card props
export interface InvitationCardProps {
  data: InvitationData;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showRSVP?: boolean;
  showDressCode?: boolean;
  subtitle?: string;
  greeting?: string;
  guestName?: string;
}

// RSVP response types
export interface RSVPResponse {
  name: string;
  email: string;
  attending: boolean;
  guestCount: number;
  dietaryRequirements?: string;
  message?: string;
}

// Invitation card variants
export type InvitationVariant =
  | 'standard'
  | 'elegant'
  | 'minimal'
  | 'floral'
  | 'vintage';

// Invitation card size options
export interface InvitationSize {
  width: number;
  height: number;
  scale: number;
}
