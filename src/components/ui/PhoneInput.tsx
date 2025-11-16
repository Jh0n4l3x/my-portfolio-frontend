import { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Search, X } from 'lucide-react';
import { COUNTRIES, Country, getRegions } from '@constants/countries';
import { CountryFlag } from './CountryFlag';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  required?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  error = false,
  errorMessage,
  placeholder = '3001234567',
  required = false,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.code === '+57') || COUNTRIES[0]
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parsear el valor inicial
  useEffect(() => {
    if (value) {
      const country = COUNTRIES.find((c) => value.startsWith(c.code));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.substring(country.code.length));
      }
    }
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ''); // Solo números
    setPhoneNumber(newValue);
    onChange(selectedCountry.code + newValue);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onChange(country.code + phoneNumber);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Filtrar países por búsqueda
  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  // Agrupar por región
  const regions = getRegions();
  const groupedCountries: Record<string, Country[]> = {};
  regions.forEach((region) => {
    groupedCountries[region] = filteredCountries.filter((c) => c.region === region);
  });

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Número de teléfono {!required && '(opcional)'}
      </label>

      <div className="relative flex">
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } border-r-0 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors`}
          >
            <CountryFlag countryCode={selectedCountry.code} className="w-6 h-4" />
            <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar país o código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Countries List */}
              <div className="overflow-y-auto max-h-80">
                {Object.entries(groupedCountries).map(([region, countries]) => {
                  if (countries.length === 0) return null;

                  return (
                    <div key={region}>
                      <div className="px-3 py-2 bg-gray-50 sticky top-0">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {region}
                        </h3>
                      </div>
                      {countries.map((country) => (
                        <button
                          key={`${country.code}-${country.country}`}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-primary-50 transition-colors ${
                            selectedCountry.code === country.code &&
                            selectedCountry.country === country.country
                              ? 'bg-primary-100'
                              : ''
                          }`}
                        >
                          <CountryFlag countryCode={country.code} className="w-6 h-4" />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-gray-900">
                              {country.country}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  );
                })}

                {filteredCountries.length === 0 && (
                  <div className="py-8 text-center text-gray-500 text-sm">
                    No se encontraron países
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            required={required}
            className={`appearance-none rounded-r-lg relative block w-full px-3 py-2 pl-10 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
          />
        </div>
      </div>

      {/* Full Phone Number Display */}
      {phoneNumber && (
        <p className="mt-1 text-xs text-gray-600">
          Número completo: <span className="font-medium">{selectedCountry.code + phoneNumber}</span>
        </p>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
