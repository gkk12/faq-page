import React from "react";
import { FAQ } from "../types/FAQ.tsx";
import FAQItem from "./FAQItem.tsx";

interface FAQListProps {
  currentFAQs: FAQ[];
}

const FAQList: React.FC<FAQListProps> = ({ currentFAQs }) => {
  return (
    <ol style={{ listStyleType: "none" }} data-testid="faqList" aria-label="Frequently Asked Questions">
      {currentFAQs.map((faq) =>
        <li key={faq.id}><FAQItem key={faq.id} faq={faq} /></li>)}
    </ol>
  );
}
export default FAQList;