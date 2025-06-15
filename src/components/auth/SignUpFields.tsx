
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignUpFieldsProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  referrerWhatsapp: string;
  setReferrerWhatsapp: (value: string) => void;
}

const SignUpFields: React.FC<SignUpFieldsProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  whatsappNumber,
  setWhatsappNumber,
  referrerWhatsapp,
  setReferrerWhatsapp,
}) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
      <Input
        id="whatsappNumber"
        type="tel"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
        placeholder="Enter your WhatsApp number"
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="referrerWhatsapp">Referrer WhatsApp Number (Optional)</Label>
      <Input
        id="referrerWhatsapp"
        type="tel"
        value={referrerWhatsapp}
        onChange={(e) => setReferrerWhatsapp(e.target.value)}
        placeholder="WhatsApp number of person who referred you"
      />
      <p className="text-xs text-muted-foreground">
        If someone referred you, enter their WhatsApp number to give them 50 bonus credits!
      </p>
    </div>
  </>
);

export default SignUpFields;
