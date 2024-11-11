import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className="flex items-center">
              {index !== 0 && (
                <div
                  className={clsx(
                    'h-1 w-12 mx-2',
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  )}
                />
              )}
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  index < currentStep
                    ? 'bg-blue-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-500'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={clsx(
                    'h-1 w-12 mx-2',
                    index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
            <span
              className={clsx(
                'text-xs mt-2',
                index <= currentStep ? 'text-blue-500 font-medium' : 'text-gray-500'
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};