import { formatDate } from "./formatDate";

export const formatDateOrTimeAgo = (dateString: string): string => {
    if (!dateString) return 'Desconhecido';
  
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
  
    if (secondsAgo < 60) {
      return `Adicionado: ${secondsAgo} segundo${secondsAgo !== 1 ? 's' : ''} atrás`;
    } else if (minutesAgo < 60) {
      return `Adicionado: ${minutesAgo} minuto${minutesAgo !== 1 ? 's' : ''} atrás`;
    } else {
      // Here you return the formatted date using your existing formatDate function, with includeTime set to true
      return formatDate(dateString, true);
    }
  };