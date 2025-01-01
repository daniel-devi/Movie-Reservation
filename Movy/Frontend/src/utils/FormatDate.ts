const formatShowtime = (showtime: string) => {
    const date = new Date(showtime); // Convert to Date object
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

export default formatShowtime