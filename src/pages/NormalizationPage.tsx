import React from "react";
import NormalizationArticle from "../components/NormalizationArticle";

const NormalizationPage: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NormalizationArticle />
      </main>
    </div>
  );
};

export default NormalizationPage;
