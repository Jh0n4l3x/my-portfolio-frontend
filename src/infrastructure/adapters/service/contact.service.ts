import { apiClient } from '../../api/client';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  userId?: string;
  user?: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  recipientId?: string;
  recipient?: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  read: boolean;
  createdAt: string;
}

export interface CreateContactMessageDto {
  name: string;
  email: string;
  subject: string;
  message: string;
  userId?: string;
  recipientUsername?: string;
}

export interface ContactStats {
  total: number;
  unread: number;
  read: number;
}

class ContactService {
  /**
   * Enviar mensaje de contacto (público)
   */
  async sendMessage(data: CreateContactMessageDto): Promise<ContactMessage> {
    const response = await apiClient.post<ContactMessage>('/contact', data);
    return response.data;
  }

  /**
   * Obtener todos los mensajes (admin)
   */
  async getAllMessages(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ContactMessage[]>('/contact');
    return response.data;
  }

  /**
   * Obtener mensajes no leídos (admin)
   */
  async getUnreadMessages(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ContactMessage[]>('/contact/unread');
    return response.data;
  }

  /**
   * Obtener estadísticas de mensajes (admin)
   */
  async getStats(): Promise<ContactStats> {
    const response = await apiClient.get<ContactStats>('/contact/stats');
    return response.data;
  }

  /**
   * Obtener un mensaje específico (admin)
   */
  async getMessage(id: string): Promise<ContactMessage> {
    const response = await apiClient.get<ContactMessage>(`/contact/${id}`);
    return response.data;
  }

  /**
   * Marcar mensaje como leído (admin)
   */
  async markAsRead(id: string): Promise<ContactMessage> {
    const response = await apiClient.patch<ContactMessage>(`/contact/${id}/read`);
    return response.data;
  }

  /**
   * Eliminar mensaje (admin)
   */
  async deleteMessage(id: string): Promise<void> {
    await apiClient.delete(`/contact/${id}`);
  }

  /**
   * Obtener mensajes del usuario actual (donde es el destinatario)
   */
  async getMyMessages(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ContactMessage[]>('/contact/my-messages');
    return response.data;
  }

  /**
   * Obtener mensajes no leídos del usuario actual
   */
  async getMyUnreadMessages(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ContactMessage[]>('/contact/my-messages/unread');
    return response.data;
  }

  /**
   * Obtener estadísticas de mensajes del usuario actual
   */
  async getMyStats(): Promise<ContactStats> {
    const response = await apiClient.get<ContactStats>('/contact/my-messages/stats');
    return response.data;
  }

  /**
   * Obtener un mensaje específico del usuario actual
   */
  async getMyMessage(id: string): Promise<ContactMessage> {
    const response = await apiClient.get<ContactMessage>(`/contact/my-messages/${id}`);
    return response.data;
  }

  /**
   * Marcar mensaje como leído (usuario actual)
   */
  async markMyMessageAsRead(id: string): Promise<ContactMessage> {
    const response = await apiClient.patch<ContactMessage>(`/contact/my-messages/${id}/read`);
    return response.data;
  }
}

export default new ContactService();
