/**
 * Validation utilities for form inputs
 */

export const validation = {
  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL format
   */
  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a value is not empty
   */
  validateRequired(value: string): boolean {
    return value.trim().length > 0;
  },

  /**
   * Validate minimum length
   */
  validateMinLength(value: string, min: number): boolean {
    return value.length >= min;
  },

  /**
   * Validate maximum length
   */
  validateMaxLength(value: string, max: number): boolean {
    return value.length <= max;
  },

  /**
   * Validate password strength
   * At least 8 characters, one uppercase, one lowercase, one number
   */
  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Validate phone number (basic)
   */
  validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  /**
   * Sanitize HTML to prevent XSS
   */
  sanitizeHtml(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  /**
   * Get error message for validation
   */
  getErrorMessage(type: string, value?: string | number): string {
    const messages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Ingresa un email válido',
      url: 'Ingresa una URL válida',
      password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
      phone: 'Ingresa un número de teléfono válido',
      minLength: `Debe tener al menos ${value} caracteres`,
      maxLength: `No puede tener más de ${value} caracteres`,
    };
    return messages[type] || 'Valor inválido';
  },
};
