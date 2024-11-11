import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Coins, Wallet, FileText, Layers, Info } from 'lucide-react';
import type { EventDetails } from '../types/contract';

const schema = z.object({
  name: z.string().min(1, 'Event name is required'),
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(6, 'Symbol must be 6 characters or less')
    .toUpperCase(),
  description: z.string().min(1, 'Description is required'),
  chain: z.enum(['ethereum', 'polygon', 'bsc', 'arbitrum']),
  totalSupply: z.number().min(1, 'Total supply must be greater than 0'),
  paymentToken: z.string().min(1, 'Payment token is required'),
});

interface EventDetailsFormProps {
  onSubmit: (data: EventDetails) => void;
  defaultValues?: Partial<EventDetails>;
}

export const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventDetails>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
              <p className="text-sm text-gray-500 mt-1">Configure your event's basic information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Event Name
                </label>
                <input
                  {...register('name')}
                  className="form-input"
                  placeholder="My Amazing Event"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Symbol
                </label>
                <input
                  {...register('symbol')}
                  className="form-input uppercase"
                  placeholder="EVENT"
                  maxLength={6}
                />
                {errors.symbol && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.symbol.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="form-input resize-none"
                  placeholder="Describe your event..."
                />
                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  Blockchain
                </div>
              </label>
              <select
                {...register('chain')}
                className="form-select"
              >
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="bsc">BSC</option>
                <option value="arbitrum">Arbitrum</option>
              </select>
              {errors.chain && (
                <p className="mt-1.5 text-sm text-red-500">{errors.chain.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-500" />
                  Total Supply
                </div>
              </label>
              <input
                type="number"
                {...register('totalSupply', { valueAsNumber: true })}
                className="form-input"
                min="1"
                placeholder="1000"
              />
              {errors.totalSupply && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.totalSupply.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-500" />
                  Payment Token
                </div>
              </label>
              <select
                {...register('paymentToken')}
                className="form-select"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="DAI">DAI</option>
              </select>
              {errors.paymentToken && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.paymentToken.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Info className="w-4 h-4" />
          <span>All fields are required</span>
        </div>
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