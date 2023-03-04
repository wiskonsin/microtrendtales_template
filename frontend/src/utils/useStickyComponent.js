import { useState, useEffect }  from "react"

export default function useStickyComponent(scrollUp) {
  const [previousScroll, setPreviousScroll] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScroll(window.pageYOffset);
      const difference = Math.abs(currentScroll - previousScroll);

      if (difference > 220) {
        if (currentScroll > previousScroll) {
          setIsSticky(scrollUp);
        } else {
          setIsSticky(!scrollUp);
        }
        setPreviousScroll(currentScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentScroll, previousScroll]);

  return isSticky;
  }