import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Gift } from 'lucide-react';
import { clsx } from 'clsx';

interface TierBenefitsProps {
  tierIndex: number;
  control: any;
  register: any;
  errors: any;
}

export const TierBenefits: React.FC<TierBenefitsProps> = ({
  tierIndex,
  control,
  register,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `ticketTiers.${tierIndex}.benefits`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-blue-500" />
            Benefits ({fields.length}/5)
          </div>
        </label>
        <button
          type="button"
          onClick={() => append({ name: '', details: '' })}
          disabled={fields.length >= 5}
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
            fields.length >= 5
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
          )}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Benefit
        </button>
      </div>
      
      <div className="space-y-3">
        {fields.map((benefit, benefitIndex) => (
          <div key={benefit.id} className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Benefit {benefitIndex + 1}</span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(benefitIndex)}
                  className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <input
                  {...register(`ticketTiers.${tierIndex}.benefits.${benefitIndex}.name`)}
                  placeholder="Benefit Name"
                  className="form-input"
                />
                {errors?.ticketTiers?.[tierIndex]?.benefits?.[benefitIndex]?.name && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.ticketTiers[tierIndex]?.benefits?.[benefitIndex]?.name?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register(`ticketTiers.${tierIndex}.benefits.${benefitIndex}.details`)}
                  placeholder="Benefit Details"
                  className="form-input"
                />
                {errors?.ticketTiers?.[tierIndex]?.benefits?.[benefitIndex]?.details && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.ticketTiers[tierIndex]?.benefits?.[benefitIndex]?.details?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};