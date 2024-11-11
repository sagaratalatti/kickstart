import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FileText,
  Ticket,
  Shield,
  MapPin,
  Store,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Wallet,
  ArrowLeft,
  Lock,
  Coins,
  Layers,
  Users,
  Gauge,
  Pause,
  Gift,
  Percent
} from 'lucide-react';
import { clsx } from 'clsx';
import type { ContractConfig } from '../types/contract';

interface ReviewFormProps {
  data: Partial<ContractConfig>;
  onBack: () => void;
  onSubmit: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  data,
  onBack,
  onSubmit,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['eventDetails']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const SectionHeader = ({ 
    title, 
    icon: Icon, 
    color, 
    section 
  }: { 
    title: string; 
    icon: React.ElementType; 
    color: string;
    section: string;
  }) => (
    <div
      onClick={() => toggleSection(section)}
      className={clsx(
        "flex items-center justify-between p-4 cursor-pointer",
        "hover:bg-gray-50 transition-colors duration-200"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {expandedSections.includes(section) ? (
        <ChevronUp className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      )}
    </div>
  );

  const DataRow = ({ label, value, icon: Icon, color }: { label: string; value: React.ReactNode; icon?: React.ElementType; color?: string }) => (
    <div className="flex items-center py-3 px-4 hover:bg-gray-50">
      <div className="flex items-center gap-3 w-1/3">
        {Icon && (
          <div className={`p-1.5 rounded-lg ${color || 'bg-gray-100'}`}>
            <Icon className={`w-4 h-4 ${color ? 'text-white' : 'text-gray-500'}`} />
          </div>
        )}
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="w-2/3 text-sm text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Event Details Section */}
        <SectionHeader
          title="Event Details"
          icon={FileText}
          color="bg-blue-500"
          section="eventDetails"
        />
        {expandedSections.includes('eventDetails') && (
          <div className="border-t border-gray-100">
            <DataRow
              label="Event Name"
              value={data.eventDetails?.name}
              icon={FileText}
              color="bg-blue-500"
            />
            <DataRow
              label="Symbol"
              value={data.eventDetails?.symbol}
              icon={Layers}
              color="bg-indigo-500"
            />
            <DataRow
              label="Chain"
              value={data.eventDetails?.chain?.toUpperCase()}
              icon={Layers}
              color="bg-purple-500"
            />
            <DataRow
              label="Total Supply"
              value={data.eventDetails?.totalSupply}
              icon={Coins}
              color="bg-amber-500"
            />
            <DataRow
              label="Payment Token"
              value={data.eventDetails?.paymentToken}
              icon={Wallet}
              color="bg-green-500"
            />
          </div>
        )}

        {/* Ticket Configuration Section */}
        <SectionHeader
          title="Ticket Configuration"
          icon={Ticket}
          color="bg-indigo-500"
          section="ticketConfig"
        />
        {expandedSections.includes('ticketConfig') && (
          <div className="border-t border-gray-100">
            {data.ticketTiers?.map((tier, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <div className="py-3 px-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-900">Tier {index + 1}: {tier.name}</h4>
                </div>
                <div className="px-4">
                  <DataRow
                    label="Price"
                    value={`${tier.price} ${data.eventDetails?.paymentToken}`}
                    icon={Coins}
                    color="bg-green-500"
                  />
                  <DataRow
                    label="Supply"
                    value={tier.supply}
                    icon={Layers}
                    color="bg-blue-500"
                  />
                  <DataRow
                    label="Max Per Wallet"
                    value={tier.maxPerWallet}
                    icon={Wallet}
                    color="bg-purple-500"
                  />
                  <div className="py-3">
                    <h5 className="text-sm font-medium text-gray-600 mb-2">Benefits</h5>
                    <div className="space-y-2">
                      {tier.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-center gap-2 text-sm">
                          <Gift className="w-4 h-4 text-indigo-500" />
                          <span className="font-medium">{benefit.name}:</span>
                          <span className="text-gray-600">{benefit.details}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Settings Section */}
        <SectionHeader
          title="Security Settings"
          icon={Shield}
          color="bg-blue-500"
          section="security"
        />
        {expandedSections.includes('security') && (
          <div className="border-t border-gray-100">
            <DataRow
              label="KYC Required"
              value={data.security?.requireKYC ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={Users}
              color="bg-blue-500"
            />
            <DataRow
              label="Multi-Signature"
              value={data.security?.enableMultiSig ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={Shield}
              color="bg-purple-500"
            />
            <DataRow
              label="Rate Limiting"
              value={data.security?.enableRateLimiting ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={Gauge}
              color="bg-emerald-500"
            />
            <DataRow
              label="Pausable"
              value={data.security?.enablePausable ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={Pause}
              color="bg-amber-500"
            />
          </div>
        )}

        {/* Location Settings Section */}
        <SectionHeader
          title="Location Settings"
          icon={MapPin}
          color="bg-purple-500"
          section="location"
        />
        {expandedSections.includes('location') && (
          <div className="border-t border-gray-100">
            <DataRow
              label="Location Restrictions"
              value={data.location?.enabled ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={MapPin}
              color="bg-purple-500"
            />
            {data.location?.enabled && data.location.zones.map((zone, index) => (
              <div key={index} className="ml-8 border-l-2 border-purple-100 pl-4">
                <DataRow
                  label={`Zone ${index + 1}`}
                  value={
                    <div className="space-y-1">
                      <div className="font-medium">{zone.name}</div>
                      <div className="text-gray-500">
                        Coordinates: {zone.latitude}, {zone.longitude}
                      </div>
                      <div className="text-gray-500">
                        Radius: {zone.radius}m
                      </div>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Market Rules Section */}
        <SectionHeader
          title="Market Rules"
          icon={Store}
          color="bg-emerald-500"
          section="market"
        />
        {expandedSections.includes('market') && (
          <div className="border-t border-gray-100">
            <DataRow
              label="Soulbound"
              value={data.market?.soulbound ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Disabled
                </span>
              )}
              icon={Lock}
              color="bg-amber-500"
            />
            {!data.market?.soulbound && (
              <>
                <DataRow
                  label="Resale Enabled"
                  value={data.market?.enableResale ? (
                    <span className="flex items-center gap-2 text-green-600">
                      <Check className="w-4 h-4" /> Enabled
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-500">
                      <X className="w-4 h-4" /> Disabled
                    </span>
                  )}
                  icon={Store}
                  color="bg-emerald-500"
                />
                {data.market?.enableResale && (
                  <DataRow
                    label="Royalty Percentage"
                    value={`${data.market?.royaltyPercentage}%`}
                    icon={Percent}
                    color="bg-purple-500"
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </span>
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <div className={clsx(
              "w-11 h-6 rounded-full transition-colors duration-200",
              "after:content-[''] after:absolute after:top-0.5 after:left-0.5",
              "after:bg-white after:rounded-full after:h-5 after:w-5",
              "after:transition-transform after:duration-200",
              "peer-checked:after:translate-x-5",
              "bg-gray-200 peer-checked:bg-emerald-500",
              "peer-focus:ring-4 peer-focus:ring-emerald-500/25"
            )} />
            <span className="ml-3 text-sm font-medium text-gray-900">
              I confirm all details are correct
            </span>
          </label>
          {isConfirmed && (
            <button
              type="button"
              onClick={onSubmit}
              className="w-full sm:w-auto group px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};