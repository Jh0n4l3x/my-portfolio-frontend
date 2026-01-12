export interface ForgotPasswordRequest {
  email?: string;
  phoneNumber?: string;
  method: 'email' | 'whatsapp';
}

export interface ForgotPasswordResponse {
  message: string;
  method: string;
  expiresIn: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface VerifyResetCodeResponse {
  valid: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
