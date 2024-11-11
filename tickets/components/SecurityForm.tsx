import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Users, Gauge, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import type { SecuritySettings } from '../types/contract';

const schema = z.object({
  requireKYC: z.boolean(),
  enableMultiSig: z.boolean(),
  enableRateLimiting: z.boolean(),
  enablePausable: z.boolean(),
});

interface SecurityFormProps {
  onSubmit: (data: SecuritySettings) => void;
  defaultValues?: Partial<SecuritySettings>;
}

export const SecurityForm: React.FC<SecurityFormProps> = ({
  onSubmit,
  defaultValues = {
    requireKYC: false,
    enableMultiSig: false,
    enableRateLimiting: false,
    enablePausable: false,
  },
}) => {
  const { register, handleSubmit } = useForm<SecuritySettings>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const SecurityToggle = ({ 
    name, 
    label, 
    description, 
    icon: Icon,
    color
  }: { 
    name: keyof SecuritySettings; 
    label: string;
    description: string;
    icon: React.ElementType;
    color: string;
  }) => {
    const { ref, ...rest } = register(name);
    
    return (
      <label className="relative block">
        <input
          type="checkbox"
          className="peer sr-only"
          {...rest}
          ref={ref}
        />
        <div className={clsx(
          "glass-card p-6 cursor-pointer transition-all duration-300",
          "hover:shadow-xl hover:scale-[1.02]",
          "peer-checked:ring-2 peer-checked:ring-offset-2",
          color === 'blue' && "peer-checked:ring-blue-500 peer-checked:bg-blue-50/50",
          color === 'purple' && "peer-checked:ring-purple-500 peer-checked:bg-purple-50/50",
          color === 'emerald' && "peer-checked:ring-emerald-500 peer-checked:bg-emerald-50/50",
          color === 'amber' && "peer-checked:ring-amber-500 peer-checked:bg-amber-50/50"
        )}>
          <div className="flex items-start gap-4">
            <div className={clsx(
              "p-3 rounded-xl",
              color === 'blue' && "bg-blue-500/10 text-blue-500",
              color === 'purple' && "bg-purple-500/10 text-purple-500",
              color === 'emerald' && "bg-emerald-500/10 text-emerald-500",
              color === 'amber' && "bg-amber-500/10 text-amber-500"
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{label}</h3>
                <div className={clsx(
                  "w-11 h-6 rounded-full transition-colors duration-200",
                  "peer-checked:bg-green-500 bg-gray-200",
                  "flex items-center",
                  "peer-checked:justify-end justify-start",
                  "p-1"
                )}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </label>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-blue-500 rounded-xl text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
            <p className="text-sm text-gray-500 mt-1">Configure your event's security features</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecurityToggle
            name="requireKYC"
            label="KYC Requirements"
            description="Require identity verification for ticket purchases"
            icon={Users}
            color="blue"
          />
          
          <SecurityToggle
            name="enableMultiSig"
            label="Multi-Signature"
            description="Enable multi-signature requirements for contract operations"
            icon={Shield}
            color="purple"
          />
          
          <SecurityToggle
            name="enableRateLimiting"
            label="Rate Limiting"
            description="Implement rate limiting for ticket minting operations"
            icon={Gauge}
            color="emerald"
          />
          
          <SecurityToggle
            name="enablePausable"
            label="Pausable Functionality"
            description="Allow pausing contract operations in case of emergencies"
            icon={Pause}
            color="amber"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </span>
        </button>
        <button
          type="submit"
          className="group px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            Continue
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </form>
  );
};