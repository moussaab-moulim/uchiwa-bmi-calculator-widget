/* eslint-disable no-self-compare */
import React from "react";
import "antd/dist/antd.css";
import BmiCalculator from "./pages/BmiCalculator";
import translations from "./lang/translation";
import { IntlProvider } from "react-intl";
import { useLocation } from "react-router-dom";
//const { Option } = Select;


function App() {
  const search = useLocation().search;
  
  const lang: string | null = new URLSearchParams(search).get("lang");
  const locale = lang === "en"?"en": "fr";
  return (
    <IntlProvider
      locale={locale}
      messages={translations[locale]}
    >
      <BmiCalculator />
    </IntlProvider>
  );
}

export default App;
