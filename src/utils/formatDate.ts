export const formatDate = (
    date: string | number | Date | null | undefined,
    includeTime: boolean = false
  ): string => {
    if (!date) return 'Unknown';
  
    const dateObj = new Date(date);
    const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  
    // Determine if the date has a non-midnight time component
    const hasTime = dateObj.getHours() + dateObj.getMinutes() + dateObj.getSeconds() > 0;
  
    const formattedDate = dateObj.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = dateObj.toLocaleTimeString('en-GB', timeOptions);
  
    if (includeTime && hasTime) {
      return `${formattedDate} ${formattedTime}`;
    } else {
      return formattedDate;
    }
  };
  