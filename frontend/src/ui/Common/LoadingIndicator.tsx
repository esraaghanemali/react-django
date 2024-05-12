import React, { useContext } from "react";
import { Store } from "../Store";

const LoadingIndicator: React.FC = () => {
  const { loading } = useContext(Store);
  if (loading) {
    return <div className="progress-bar" />;
  }
};

export default LoadingIndicator;
