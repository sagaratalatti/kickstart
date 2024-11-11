import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket, Plus, Trash2, Sparkles } from 'lucide-react';
import type { TicketTier } from '../types/contract';
import { clsx } from 'clsx';
import { TierBenefits } from './TierBenefits';

const benefitSchema = z.object({
  name: z.string().min(1, 'Benefit name is required'),
  details: z.string().min(1, 'Benefit details are required'),
});

const ticketTierSchema = z.object({
  name: z.string().min(1, 'Tier name is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  supply: z.number().min(1, 'Supply must be greater than 0'),
  benefits: z.array(benefitSchema).max(5, 'Maximum 5 benefits allowed'),
  maxPerWallet: z.number().min(1, 'Max per wallet must be greater than 0'),
});

const schema = z.object({
  ticketTiers: z.array(ticketTierSchema).min(1, 'At least one tier is required').max(3, 'Maximum 3 tiers allowed'),
});

interface TicketConfigFormProps {
  onSubmit: (data: { ticketTiers: TicketTier[] }) => void;
  defaultValues?: { ticketTiers: TicketTier[] };
}

export const TicketConfigForm: React.FC<TicketConfigFormProps> = ({
  onSubmit,
  defaultValues = {
    ticketTiers: [{
      name: '',
      price: 0,
      supply: 1,
      benefits: [{ name: '', details: '' }],
      maxPerWallet: 1
    }]
  },
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ticketTiers',
  });

  const addTier = () => {
    if (fields.length < 3) {
      append({
        name: '',
        price: 0,
        supply: 1,
        benefits: [{ name: '', details: '' }],
        maxPerWallet: 1
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500 rounded-xl text-white">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ticket Tiers</h2>
              <p className="text-sm text-gray-500 mt-1">Configure your event's ticket tiers</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addTier}
            disabled={fields.length >= 3}
            className={clsx(
              'group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              fields.length >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25'
            )}
          >
            <Plus className="w-4 h-4" />
            Add New Tier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {fields.map((field, index) => (
            <div key={field.id} className="tier-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">Tier {index + 1}</h3>
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tier Name
                    </label>
                    <input
                      {...register(`ticketTiers.${index}.name`)}
                      placeholder="e.g., VIP Access"
                      className="form-input"
                    />
                    {errors.ticketTiers?.[index]?.name && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.ticketTiers[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`ticketTiers.${index}.price`, { valueAsNumber: true })}
                        className="form-input"
                      />
                      {errors.ticketTiers?.[index]?.price && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.ticketTiers[index]?.price?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Supply
                      </label>
                      <input
                        type="number"
                        {...register(`ticketTiers.${index}.supply`, { valueAsNumber: true })}
                        className="form-input"
                      />
                      {errors.ticketTiers?.[index]?.supply && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.ticketTiers[index]?.supply?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Max Per Wallet
                    </label>
                    <input
                      type="number"
                      {...register(`ticketTiers.${index}.maxPerWallet`, { valueAsNumber: true })}
                      className="form-input"
                    />
                    {errors.ticketTiers?.[index]?.maxPerWallet && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.ticketTiers[index]?.maxPerWallet?.message}
                      </p>
                    )}
                  </div>

                  <TierBenefits
                    tierIndex={index}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </form>
  );
};