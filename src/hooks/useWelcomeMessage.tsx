import { useState, useEffect } from "react";

export function useWelcomeMessage(): string {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  useEffect(() => {
    const getCurrentTimeMessage = (): string => {
      const currentHour = new Date().getHours();
      
      if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    setWelcomeMessage(getCurrentTimeMessage());
    
    // Update message if user keeps the site open across time boundaries
    const intervalId = setInterval(() => {
      setWelcomeMessage(getCurrentTimeMessage());
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return welcomeMessage;
}
