import { useEffect } from "react";

type FormResultsProps = {
  children: any;
};

const FormResults = ({ children }: FormResultsProps) => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return <div id="scrollToHere">{children}</div>;
};

export default FormResults;
