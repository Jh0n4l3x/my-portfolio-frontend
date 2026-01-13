import { Country } from "../types";

export const COUNTRIES: Country[] = [
  // América del Norte
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸', region: 'América del Norte' },
  { code: '+1', country: 'Canadá', flag: '🇨🇦', region: 'América del Norte' },
  { code: '+52', country: 'México', flag: '🇲🇽', region: 'América del Norte' },

  // América Central
  { code: '+501', country: 'Belice', flag: '🇧🇿', region: 'América Central' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹', region: 'América Central' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻', region: 'América Central' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳', region: 'América Central' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮', region: 'América Central' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷', region: 'América Central' },
  { code: '+507', country: 'Panamá', flag: '🇵🇦', region: 'América Central' },

  // Caribe
  { code: '+1-242', country: 'Bahamas', flag: '🇧🇸', region: 'Caribe' },
  { code: '+1-246', country: 'Barbados', flag: '🇧🇧', region: 'Caribe' },
  { code: '+1-264', country: 'Anguila', flag: '🇦🇮', region: 'Caribe' },
  { code: '+1-268', country: 'Antigua y Barbuda', flag: '🇦🇬', region: 'Caribe' },
  { code: '+1-284', country: 'Islas Vírgenes Británicas', flag: '🇻🇬', region: 'Caribe' },
  { code: '+1-340', country: 'Islas Vírgenes (EE.UU.)', flag: '🇻🇮', region: 'Caribe' },
  { code: '+1-345', country: 'Islas Caimán', flag: '🇰🇾', region: 'Caribe' },
  { code: '+1-441', country: 'Bermudas', flag: '🇧🇲', region: 'Caribe' },
  { code: '+1-473', country: 'Granada', flag: '🇬🇩', region: 'Caribe' },
  { code: '+1-649', country: 'Islas Turcas y Caicos', flag: '🇹🇨', region: 'Caribe' },
  { code: '+1-664', country: 'Montserrat', flag: '🇲🇸', region: 'Caribe' },
  { code: '+1-721', country: 'Sint Maarten', flag: '🇸🇽', region: 'Caribe' },
  { code: '+1-758', country: 'Santa Lucía', flag: '🇱🇨', region: 'Caribe' },
  { code: '+1-767', country: 'Dominica', flag: '🇩🇲', region: 'Caribe' },
  { code: '+1-784', country: 'San Vicente y las Granadinas', flag: '🇻🇨', region: 'Caribe' },
  { code: '+1-809', country: 'República Dominicana', flag: '🇩🇴', region: 'Caribe' },
  { code: '+1-868', country: 'Trinidad y Tobago', flag: '🇹🇹', region: 'Caribe' },
  { code: '+1-869', country: 'San Cristóbal y Nieves', flag: '🇰🇳', region: 'Caribe' },
  { code: '+1-876', country: 'Jamaica', flag: '🇯🇲', region: 'Caribe' },
  { code: '+53', country: 'Cuba', flag: '🇨🇺', region: 'Caribe' },
  { code: '+509', country: 'Haití', flag: '🇭🇹', region: 'Caribe' },

  // América del Sur
  { code: '+54', country: 'Argentina', flag: '🇦🇷', region: 'América del Sur' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷', region: 'América del Sur' },
  { code: '+56', country: 'Chile', flag: '🇨🇱', region: 'América del Sur' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴', region: 'América del Sur' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪', region: 'América del Sur' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴', region: 'América del Sur' },
  { code: '+592', country: 'Guyana', flag: '🇬🇾', region: 'América del Sur' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨', region: 'América del Sur' },
  { code: '+594', country: 'Guayana Francesa', flag: '🇬🇫', region: 'América del Sur' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾', region: 'América del Sur' },
  { code: '+597', country: 'Surinam', flag: '🇸🇷', region: 'América del Sur' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾', region: 'América del Sur' },
  { code: '+51', country: 'Perú', flag: '🇵🇪', region: 'América del Sur' },

  // Europa Occidental
  { code: '+33', country: 'Francia', flag: '🇫🇷', region: 'Europa Occidental' },
  { code: '+34', country: 'España', flag: '🇪🇸', region: 'Europa Occidental' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', region: 'Europa Occidental' },
  { code: '+39', country: 'Italia', flag: '🇮🇹', region: 'Europa Occidental' },
  { code: '+41', country: 'Suiza', flag: '🇨🇭', region: 'Europa Occidental' },
  { code: '+43', country: 'Austria', flag: '🇦🇹', region: 'Europa Occidental' },
  { code: '+49', country: 'Alemania', flag: '🇩🇪', region: 'Europa Occidental' },
  { code: '+32', country: 'Bélgica', flag: '🇧🇪', region: 'Europa Occidental' },
  { code: '+31', country: 'Países Bajos', flag: '🇳🇱', region: 'Europa Occidental' },
  { code: '+352', country: 'Luxemburgo', flag: '🇱🇺', region: 'Europa Occidental' },
  { code: '+377', country: 'Mónaco', flag: '🇲🇨', region: 'Europa Occidental' },
  { code: '+376', country: 'Andorra', flag: '🇦🇩', region: 'Europa Occidental' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧', region: 'Europa Occidental' },
  { code: '+353', country: 'Irlanda', flag: '🇮🇪', region: 'Europa Occidental' },

  // Europa Nórdica
  { code: '+45', country: 'Dinamarca', flag: '🇩🇰', region: 'Europa Nórdica' },
  { code: '+46', country: 'Suecia', flag: '🇸🇪', region: 'Europa Nórdica' },
  { code: '+47', country: 'Noruega', flag: '🇳🇴', region: 'Europa Nórdica' },
  { code: '+358', country: 'Finlandia', flag: '🇫🇮', region: 'Europa Nórdica' },
  { code: '+354', country: 'Islandia', flag: '🇮🇸', region: 'Europa Nórdica' },

  // Europa Oriental
  { code: '+48', country: 'Polonia', flag: '🇵🇱', region: 'Europa Oriental' },
  { code: '+420', country: 'República Checa', flag: '🇨🇿', region: 'Europa Oriental' },
  { code: '+421', country: 'Eslovaquia', flag: '🇸🇰', region: 'Europa Oriental' },
  { code: '+36', country: 'Hungría', flag: '🇭🇺', region: 'Europa Oriental' },
  { code: '+40', country: 'Rumania', flag: '🇷🇴', region: 'Europa Oriental' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬', region: 'Europa Oriental' },
  { code: '+7', country: 'Rusia', flag: '🇷🇺', region: 'Europa Oriental' },
  { code: '+380', country: 'Ucrania', flag: '🇺🇦', region: 'Europa Oriental' },
  { code: '+375', country: 'Bielorrusia', flag: '🇧🇾', region: 'Europa Oriental' },
  { code: '+373', country: 'Moldavia', flag: '🇲🇩', region: 'Europa Oriental' },

  // Europa del Sur
  { code: '+30', country: 'Grecia', flag: '🇬🇷', region: 'Europa del Sur' },
  { code: '+355', country: 'Albania', flag: '🇦🇱', region: 'Europa del Sur' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸', region: 'Europa del Sur' },
  { code: '+382', country: 'Montenegro', flag: '🇲🇪', region: 'Europa del Sur' },
  { code: '+383', country: 'Kosovo', flag: '🇽🇰', region: 'Europa del Sur' },
  { code: '+385', country: 'Croacia', flag: '🇭🇷', region: 'Europa del Sur' },
  { code: '+386', country: 'Eslovenia', flag: '🇸🇮', region: 'Europa del Sur' },
  { code: '+387', country: 'Bosnia y Herzegovina', flag: '🇧🇦', region: 'Europa del Sur' },
  { code: '+389', country: 'Macedonia del Norte', flag: '🇲🇰', region: 'Europa del Sur' },

  // Países Bálticos
  { code: '+370', country: 'Lituania', flag: '🇱🇹', region: 'Países Bálticos' },
  { code: '+371', country: 'Letonia', flag: '🇱🇻', region: 'Países Bálticos' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪', region: 'Países Bálticos' },

  // Oriente Medio
  { code: '+90', country: 'Turquía', flag: '🇹🇷', region: 'Oriente Medio' },
  { code: '+971', country: 'Emiratos Árabes Unidos', flag: '🇦🇪', region: 'Oriente Medio' },
  { code: '+966', country: 'Arabia Saudita', flag: '🇸🇦', region: 'Oriente Medio' },
  { code: '+972', country: 'Israel', flag: '🇮🇱', region: 'Oriente Medio' },
  { code: '+962', country: 'Jordania', flag: '🇯🇴', region: 'Oriente Medio' },
  { code: '+961', country: 'Líbano', flag: '🇱🇧', region: 'Oriente Medio' },
  { code: '+963', country: 'Siria', flag: '🇸🇾', region: 'Oriente Medio' },
  { code: '+964', country: 'Irak', flag: '🇮🇶', region: 'Oriente Medio' },
  { code: '+98', country: 'Irán', flag: '🇮🇷', region: 'Oriente Medio' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', region: 'Oriente Medio' },
  { code: '+968', country: 'Omán', flag: '🇴🇲', region: 'Oriente Medio' },
  { code: '+974', country: 'Catar', flag: '🇶🇦', region: 'Oriente Medio' },
  { code: '+973', country: 'Baréin', flag: '🇧🇭', region: 'Oriente Medio' },
  { code: '+967', country: 'Yemen', flag: '🇾🇪', region: 'Oriente Medio' },

  // Asia Oriental
  { code: '+86', country: 'China', flag: '🇨🇳', region: 'Asia Oriental' },
  { code: '+81', country: 'Japón', flag: '🇯🇵', region: 'Asia Oriental' },
  { code: '+82', country: 'Corea del Sur', flag: '🇰🇷', region: 'Asia Oriental' },
  { code: '+850', country: 'Corea del Norte', flag: '🇰🇵', region: 'Asia Oriental' },
  { code: '+886', country: 'Taiwán', flag: '🇹🇼', region: 'Asia Oriental' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰', region: 'Asia Oriental' },
  { code: '+853', country: 'Macao', flag: '🇲🇴', region: 'Asia Oriental' },
  { code: '+976', country: 'Mongolia', flag: '🇲🇳', region: 'Asia Oriental' },

  // Sudeste Asiático
  { code: '+65', country: 'Singapur', flag: '🇸🇬', region: 'Sudeste Asiático' },
  { code: '+60', country: 'Malasia', flag: '🇲🇾', region: 'Sudeste Asiático' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', region: 'Sudeste Asiático' },
  { code: '+63', country: 'Filipinas', flag: '🇵🇭', region: 'Sudeste Asiático' },
  { code: '+66', country: 'Tailandia', flag: '🇹🇭', region: 'Sudeste Asiático' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', region: 'Sudeste Asiático' },
  { code: '+95', country: 'Birmania', flag: '🇲🇲', region: 'Sudeste Asiático' },
  { code: '+856', country: 'Laos', flag: '🇱🇦', region: 'Sudeste Asiático' },
  { code: '+855', country: 'Camboya', flag: '🇰🇭', region: 'Sudeste Asiático' },
  { code: '+673', country: 'Brunéi', flag: '🇧🇳', region: 'Sudeste Asiático' },
  { code: '+670', country: 'Timor Oriental', flag: '🇹🇱', region: 'Sudeste Asiático' },

  // Asia del Sur
  { code: '+91', country: 'India', flag: '🇮🇳', region: 'Asia del Sur' },
  { code: '+92', country: 'Pakistán', flag: '🇵🇰', region: 'Asia del Sur' },
  { code: '+880', country: 'Bangladés', flag: '🇧🇩', region: 'Asia del Sur' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', region: 'Asia del Sur' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', region: 'Asia del Sur' },
  { code: '+975', country: 'Bután', flag: '🇧🇹', region: 'Asia del Sur' },
  { code: '+960', country: 'Maldivas', flag: '🇲🇻', region: 'Asia del Sur' },
  { code: '+93', country: 'Afganistán', flag: '🇦🇫', region: 'Asia del Sur' },

  // Asia Central
  { code: '+7', country: 'Kazajistán', flag: '🇰🇿', region: 'Asia Central' },
  { code: '+996', country: 'Kirguistán', flag: '🇰🇬', region: 'Asia Central' },
  { code: '+992', country: 'Tayikistán', flag: '🇹🇯', region: 'Asia Central' },
  { code: '+993', country: 'Turkmenistán', flag: '🇹🇲', region: 'Asia Central' },
  { code: '+998', country: 'Uzbekistán', flag: '🇺🇿', region: 'Asia Central' },

  // África del Norte
  { code: '+20', country: 'Egipto', flag: '🇪🇬', region: 'África del Norte' },
  { code: '+213', country: 'Argelia', flag: '🇩🇿', region: 'África del Norte' },
  { code: '+216', country: 'Túnez', flag: '🇹🇳', region: 'África del Norte' },
  { code: '+218', country: 'Libia', flag: '🇱🇾', region: 'África del Norte' },
  { code: '+212', country: 'Marruecos', flag: '🇲🇦', region: 'África del Norte' },
  { code: '+249', country: 'Sudán', flag: '🇸🇩', region: 'África del Norte' },
  { code: '+211', country: 'Sudán del Sur', flag: '🇸🇸', region: 'África del Norte' },

  // África Occidental
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', region: 'África Occidental' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭', region: 'África Occidental' },
  { code: '+225', country: 'Costa de Marfil', flag: '🇨🇮', region: 'África Occidental' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳', region: 'África Occidental' },
  { code: '+223', country: 'Malí', flag: '🇲🇱', region: 'África Occidental' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫', region: 'África Occidental' },
  { code: '+227', country: 'Níger', flag: '🇳🇪', region: 'África Occidental' },
  { code: '+228', country: 'Togo', flag: '🇹🇬', region: 'África Occidental' },
  { code: '+229', country: 'Benín', flag: '🇧🇯', region: 'África Occidental' },
  { code: '+231', country: 'Liberia', flag: '🇱🇷', region: 'África Occidental' },
  { code: '+232', country: 'Sierra Leona', flag: '🇸🇱', region: 'África Occidental' },
  { code: '+224', country: 'Guinea', flag: '🇬🇳', region: 'África Occidental' },
  { code: '+245', country: 'Guinea-Bisáu', flag: '🇬🇼', region: 'África Occidental' },
  { code: '+220', country: 'Gambia', flag: '🇬🇲', region: 'África Occidental' },
  { code: '+238', country: 'Cabo Verde', flag: '🇨🇻', region: 'África Occidental' },

  // África Oriental
  { code: '+254', country: 'Kenia', flag: '🇰🇪', region: 'África Oriental' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿', region: 'África Oriental' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬', region: 'África Oriental' },
  { code: '+250', country: 'Ruanda', flag: '🇷🇼', region: 'África Oriental' },
  { code: '+257', country: 'Burundi', flag: '🇧🇮', region: 'África Oriental' },
  { code: '+251', country: 'Etiopía', flag: '🇪🇹', region: 'África Oriental' },
  { code: '+252', country: 'Somalia', flag: '🇸🇴', region: 'África Oriental' },
  { code: '+253', country: 'Yibuti', flag: '🇩🇯', region: 'África Oriental' },
  { code: '+291', country: 'Eritrea', flag: '🇪🇷', region: 'África Oriental' },

  // África Central
  { code: '+237', country: 'Camerún', flag: '🇨🇲', region: 'África Central' },
  { code: '+236', country: 'República Centroafricana', flag: '🇨🇫', region: 'África Central' },
  { code: '+235', country: 'Chad', flag: '🇹🇩', region: 'África Central' },
  { code: '+242', country: 'República del Congo', flag: '🇨🇬', region: 'África Central' },
  { code: '+243', country: 'República Democrática del Congo', flag: '🇨🇩', region: 'África Central' },
  { code: '+240', country: 'Guinea Ecuatorial', flag: '🇬🇶', region: 'África Central' },
  { code: '+241', country: 'Gabón', flag: '🇬🇦', region: 'África Central' },

  // África Austral
  { code: '+27', country: 'Sudáfrica', flag: '🇿🇦', region: 'África Austral' },
  { code: '+264', country: 'Namibia', flag: '🇳🇦', region: 'África Austral' },
  { code: '+267', country: 'Botsuana', flag: '🇧🇼', region: 'África Austral' },
  { code: '+268', country: 'Esuatini', flag: '🇸🇿', region: 'África Austral' },
  { code: '+266', country: 'Lesoto', flag: '🇱🇸', region: 'África Austral' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿', region: 'África Austral' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲', region: 'África Austral' },
  { code: '+263', country: 'Zimbabue', flag: '🇿🇼', region: 'África Austral' },
  { code: '+265', country: 'Malaui', flag: '🇲🇼', region: 'África Austral' },
  { code: '+261', country: 'Madagascar', flag: '🇲🇬', region: 'África Austral' },
  { code: '+230', country: 'Mauricio', flag: '🇲🇺', region: 'África Austral' },
  { code: '+248', country: 'Seychelles', flag: '🇸🇨', region: 'África Austral' },
  { code: '+269', country: 'Comoras', flag: '🇰🇲', region: 'África Austral' },

  // Oceanía
  { code: '+61', country: 'Australia', flag: '🇦🇺', region: 'Oceanía' },
  { code: '+64', country: 'Nueva Zelanda', flag: '🇳🇿', region: 'Oceanía' },
  { code: '+675', country: 'Papúa Nueva Guinea', flag: '🇵🇬', region: 'Oceanía' },
  { code: '+679', country: 'Fiyi', flag: '🇫🇯', region: 'Oceanía' },
  { code: '+677', country: 'Islas Salomón', flag: '🇸🇧', region: 'Oceanía' },
  { code: '+678', country: 'Vanuatu', flag: '🇻🇺', region: 'Oceanía' },
  { code: '+685', country: 'Samoa', flag: '🇼🇸', region: 'Oceanía' },
  { code: '+676', country: 'Tonga', flag: '🇹🇴', region: 'Oceanía' },
  { code: '+686', country: 'Kiribati', flag: '🇰🇮', region: 'Oceanía' },
  { code: '+688', country: 'Tuvalu', flag: '🇹🇻', region: 'Oceanía' },
  { code: '+687', country: 'Nueva Caledonia', flag: '🇳🇨', region: 'Oceanía' },
  { code: '+689', country: 'Polinesia Francesa', flag: '🇵🇫', region: 'Oceanía' },
  { code: '+680', country: 'Palaos', flag: '🇵🇼', region: 'Oceanía' },
  { code: '+691', country: 'Micronesia', flag: '🇫🇲', region: 'Oceanía' },
  { code: '+692', country: 'Islas Marshall', flag: '🇲🇭', region: 'Oceanía' },
  { code: '+683', country: 'Niue', flag: '🇳🇺', region: 'Oceanía' },
  { code: '+690', country: 'Tokelau', flag: '🇹🇰', region: 'Oceanía' },
];

// Función para obtener países por región
export const getCountriesByRegion = (region: string): Country[] => {
  return COUNTRIES.filter((country) => country.region === region);
};

// Función para obtener todas las regiones únicas
export const getRegions = (): string[] => {
  return Array.from(new Set(COUNTRIES.map((country) => country.region)));
};

// Función para buscar países por nombre o código
export const searchCountries = (query: string): Country[] => {
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(
    (country) =>
      country.country.toLowerCase().includes(lowerQuery) ||
      country.code.includes(query)
  );
};

// Países más populares para WhatsApp (ordenados al inicio)
export const POPULAR_COUNTRIES = [
  '+1', // Estados Unidos/Canadá
  '+52', // México
  '+57', // Colombia
  '+54', // Argentina
  '+56', // Chile
  '+51', // Perú
  '+34', // España
  '+58', // Venezuela
  '+593', // Ecuador
  '+55', // Brasil
];

// Obtener países populares primero
export const getCountriesWithPopularFirst = (): Country[] => {
  const popular = COUNTRIES.filter((c) => POPULAR_COUNTRIES.includes(c.code));
  const others = COUNTRIES.filter((c) => !POPULAR_COUNTRIES.includes(c.code));
  return [...popular, ...others];
};
