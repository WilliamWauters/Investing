import { useEffect } from "react";

type FormResultsProps = {
  children: any;
};

const FormResults = ({ children }: FormResultsProps) => {
  useEffect(() => {
    const element = document.getElementById("scrollToHere");
    if (element) {
      if (element.getBoundingClientRect().bottom > window.innerHeight) {
        element.scrollIntoView(false);
      }

      if (element.getBoundingClientRect().top < 0) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return <div id="scrollToHere">{children}</div>;
};

export default FormResults;
