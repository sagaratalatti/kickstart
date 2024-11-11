import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, ArrowLeft, ArrowRight, AlertCircle, Plus, Trash2, Target } from 'lucide-react';
import { clsx } from 'clsx';
import type { LocationSettings, GeoZone } from '../types/contract';

const geoZoneSchema = z.object({
  name: z.string().min(1, 'Zone name is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radius: z.number().min(200, 'Minimum radius is 200 meters'),
});

const schema = z.object({
  enabled: z.boolean(),
  zones: z.array(geoZoneSchema).min(1, 'At least one zone is required'),
});

interface LocationFormProps {
  onSubmit: (data: LocationSettings) => void;
  defaultValues?: Partial<LocationSettings>;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  onSubmit,
  defaultValues = {
    enabled: false,
    zones: [{
      name: 'Primary Zone',
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 200,
    }],
  },
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LocationSettings>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'zones',
  });

  const isEnabled = watch('enabled');

  const addZone = () => {
    if (fields.length < 5) {
      append({
        name: `Zone ${fields.length + 1}`,
        latitude: 40.7128,
        longitude: -74.0060,
        radius: 200,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500 rounded-xl text-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Location Settings</h2>
              <p className="text-sm text-gray-500 mt-1">Configure location-based minting restrictions</p>
            </div>
          </div>
          {isEnabled && (
            <button
              type="button"
              onClick={addZone}
              disabled={fields.length >= 5}
              className={clsx(
                'group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                fields.length >= 5
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
              )}
            >
              <Plus className="w-4 h-4" />
              Add Zone
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 glass-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location-based Minting</h3>
                <p className="text-sm text-gray-500">Restrict minting to specific geographic zones</p>
              </div>
            </div>
            <Controller
              control={control}
              name="enabled"
              render={({ field: { value, ...field } }) => (
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    {...field}
                  />
                  <div className={clsx(
                    "w-14 h-7 rounded-full transition-colors duration-200",
                    "after:content-[''] after:absolute after:top-0.5 after:left-0.5",
                    "after:bg-white after:rounded-full after:h-6 after:w-6",
                    "after:transition-transform after:duration-200",
                    "peer-checked:after:translate-x-7",
                    "bg-gray-200 peer-checked:bg-purple-500",
                    "peer-focus:ring-4 peer-focus:ring-purple-500/25"
                  )} />
                </label>
              )}
            />
          </div>

          {isEnabled && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-card p-6 border-l-4 border-amber-400">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Maps Integration Required</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      To enable location-based features, you'll need to:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-amber-700 mt-2 space-y-1">
                      <li>Get a Google Maps API key from the Google Cloud Console</li>
                      <li>Enable the Maps JavaScript API and Geocoding API</li>
                      <li>Add your API key to the environment variables</li>
                    </ol>
                  </div>
                </div>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="glass-card p-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-purple-500" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Geographic Zone {index + 1}</h3>
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
                        Zone Name
                      </label>
                      <input
                        {...register(`zones.${index}.name`)}
                        className="form-input"
                        placeholder="e.g., Event Venue"
                      />
                      {errors.zones?.[index]?.name && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.zones[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Latitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register(`zones.${index}.latitude`, { valueAsNumber: true })}
                          className="form-input"
                          placeholder="e.g., 40.7128"
                        />
                        {errors.zones?.[index]?.latitude && (
                          <p className="mt-1.5 text-sm text-red-500">
                            {errors.zones[index]?.latitude?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Longitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register(`zones.${index}.longitude`, { valueAsNumber: true })}
                          className="form-input"
                          placeholder="e.g., -74.0060"
                        />
                        {errors.zones?.[index]?.longitude && (
                          <p className="mt-1.5 text-sm text-red-500">
                            {errors.zones[index]?.longitude?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Radius (meters)
                      </label>
                      <input
                        type="number"
                        min={200}
                        step={50}
                        {...register(`zones.${index}.radius`, { valueAsNumber: true })}
                        className="form-input"
                        placeholder="Minimum 200 meters"
                      />
                      {errors.zones?.[index]?.radius && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.zones[index]?.radius?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </span>
        </button>
        <button
          type="submit"
          className="group px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
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