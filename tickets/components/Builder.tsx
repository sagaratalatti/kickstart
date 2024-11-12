import React, { useState } from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { EventDetailsForm } from '../components/EventDetailsForm';
import { TicketConfigForm } from '../components/TicketConfigForm';
import { SecurityForm } from '../components/SecurityForm';
import { LocationForm } from '../components/LocationForm';
import { MarketRulesForm } from '../components/MarketRulesForm';
import { ReviewForm } from '../components/ReviewForm';
import { Ticket } from 'lucide-react';
import type { EventDetails, TicketTier, SecuritySettings, LocationSettings, MarketSettings } from '../types/contract';

const STEPS = [
  'Event Details',
  'Ticket Config',
  'Security',
  'Location',
  'Market Rules',
  'Review',
];

function TicketBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<{
    eventDetails?: EventDetails;
    ticketTiers?: TicketTier[];
    security?: SecuritySettings;
    location?: LocationSettings;
    market?: MarketSettings;
  }>({});

  const handleEventDetailsSubmit = (data: EventDetails) => {
    setFormData((prev) => ({ ...prev, eventDetails: data }));
    setCurrentStep(1);
  };

  const handleTicketConfigSubmit = (data: { ticketTiers: TicketTier[] }) => {
    setFormData((prev) => ({ ...prev, ticketTiers: data.ticketTiers }));
    setCurrentStep(2);
  };

  const handleSecuritySubmit = (data: SecuritySettings) => {
    setFormData((prev) => ({ ...prev, security: data }));
    setCurrentStep(3);
  };

  const handleLocationSubmit = (data: LocationSettings) => {
    setFormData((prev) => ({ ...prev, location: data }));
    setCurrentStep(4);
  };

  const handleMarketRulesSubmit = (data: MarketSettings) => {
    setFormData((prev) => ({ ...prev, market: data }));
    setCurrentStep(5);
  };

  const handleReviewBack = () => {
    setCurrentStep(4);
  };

  const handleDeployContract = () => {
    // Handle contract deployment
    console.log('Deploying contract with data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                NFT Event Ticketing
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Event Contract
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Set up your NFT event ticketing smart contract with our step-by-step
            wizard.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="mt-8">
          {currentStep === 0 && (
            <EventDetailsForm
              onSubmit={handleEventDetailsSubmit}
              defaultValues={formData.eventDetails}
            />
          )}
          {currentStep === 1 && (
            <TicketConfigForm
              onSubmit={handleTicketConfigSubmit}
              defaultValues={
                formData.ticketTiers ? { ticketTiers: formData.ticketTiers } : undefined
              }
            />
          )}
          {currentStep === 2 && (
            <SecurityForm
              onSubmit={handleSecuritySubmit}
              defaultValues={formData.security}
            />
          )}
          {currentStep === 3 && (
            <LocationForm
              onSubmit={handleLocationSubmit}
              defaultValues={formData.location}
            />
          )}
          {currentStep === 4 && (
            <MarketRulesForm
              onSubmit={handleMarketRulesSubmit}
              defaultValues={formData.market}
            />
          )}
          {currentStep === 5 && (
            <ReviewForm
              data={formData}
              onBack={handleReviewBack}
              onSubmit={handleDeployContract}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default TicketBuilder;