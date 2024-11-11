import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Store, ArrowLeft, ArrowRight, Percent, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import type { MarketSettings } from '../types/contract';

const schema = z.object({
  enableResale: z.boolean(),
  royaltyPercentage: z.number()
    .min(0, 'Royalty must be at least 0%')
    .max(15, 'Royalty cannot exceed 15%'),
  soulbound: z.boolean(),
});

interface MarketRulesFormProps {
  onSubmit: (data: MarketSettings) => void;
  defaultValues?: Partial<MarketSettings>;
}

export const MarketRulesForm: React.FC<MarketRulesFormProps> = ({
  onSubmit,
  defaultValues = {
    enableResale: true,
    royaltyPercentage: 5,
    soulbound: false,
  },
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MarketSettings>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const soulbound = watch('soulbound');
  const enableResale = watch('enableResale');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-emerald-500 rounded-xl text-white">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Rules</h2>
            <p className="text-sm text-gray-500 mt-1">Configure secondary market behavior</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Soulbound Toggle */}
          <div className="relative block">
            <Controller
              control={control}
              name="soulbound"
              render={({ field: { value, onChange, ...field } }) => (
                <label>
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={value}
                    onChange={(e) => {
                      onChange(e.target.checked);
                    }}
                    {...field}
                  />
                  <div className={clsx(
                    "glass-card p-6 cursor-pointer transition-all duration-300",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "peer-checked:ring-2 peer-checked:ring-offset-2",
                    "peer-checked:ring-amber-500 peer-checked:bg-amber-50/50"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Soulbound Mode</h3>
                          <div className={clsx(
                            "w-11 h-6 rounded-full transition-colors duration-200",
                            "peer-checked:bg-green-500 bg-gray-200",
                            "flex items-center",
                            value ? "justify-end" : "justify-start",
                            "p-1"
                          )}>
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Make tickets non-transferable after purchase
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              )}
            />
          </div>

          {!soulbound && (
            <>
              {/* Resale Toggle */}
              <div className="relative block animate-fadeIn">
                <Controller
                  control={control}
                  name="enableResale"
                  render={({ field: { value, onChange, ...field } }) => (
                    <label>
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        {...field}
                      />
                      <div className={clsx(
                        "glass-card p-6 cursor-pointer transition-all duration-300",
                        "hover:shadow-xl hover:scale-[1.02]",
                        "peer-checked:ring-2 peer-checked:ring-offset-2",
                        "peer-checked:ring-emerald-500 peer-checked:bg-emerald-50/50"
                      )}>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                            <Store className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900">Enable Resale</h3>
                              <div className={clsx(
                                "w-11 h-6 rounded-full transition-colors duration-200",
                                "peer-checked:bg-green-500 bg-gray-200",
                                "flex items-center",
                                value ? "justify-end" : "justify-start",
                                "p-1"
                              )}>
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Allow ticket holders to resell their tickets
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  )}
                />
              </div>

              {/* Royalty Settings */}
              {enableResale && (
                <div className="glass-card p-6 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                      <Percent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-4">Royalty Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Royalty Percentage
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              {...register('royaltyPercentage', { valueAsNumber: true })}
                              className="form-input pr-12"
                              placeholder="5"
                              min="0"
                              max="15"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                              %
                            </div>
                          </div>
                          {errors.royaltyPercentage && (
                            <p className="mt-1.5 text-sm text-red-500">
                              {errors.royaltyPercentage.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </span>
        </button>
        <button
          type="submit"
          className="group px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
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