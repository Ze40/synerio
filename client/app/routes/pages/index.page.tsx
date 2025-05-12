import { useEffect } from "react";

import { useNavigate } from "react-router";

interface IndexPageProps {
  className?: string;
}

const IndexPage = ({ className }: IndexPageProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return <div className={className}></div>;
};

export default IndexPage;
