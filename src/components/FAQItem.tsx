import React, { useState } from "react";
import { FAQ } from "../types/FAQ";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from "@mui/material";

interface FAQItemProps {
    faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
    const [isExpanded, setIsExpanded] = useState(false as boolean);
    const [isHovered, setIsHovered] = useState(false);

    const toggleFAQExpansion = () => {
        setIsExpanded((prevState) => !prevState);
    }

    const styles = {
        container: {
            padding: '1rem',
            marginBottom: '10px',
        },
        question: {
            flex: 2,
            fontWeight: "bold",
            textAlign: "justify" as const,
            cursor: "pointer",
            display: "flex",
            color: isHovered ? "#e10816" : "black",
            transition: "color 0.2s ease-in-out",
        },
        answer: {
            flex: 2,
            textAlign: "justify" as const,
            whiteSpace: 'pre-line',
        },
        answerContent: {
            marginLeft: "25px",
        },
    };

    return (
        <div style={styles.container} data-testid={`faqItem${faq.id}`}>
            <Tooltip title={isExpanded ? "Click to collapse the answer" : "Click to reveal the answer"}>
                <div
                    style={styles.question}
                    onClick={toggleFAQExpansion}
                    data-testid={`faqQuestion${faq.id}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    aria-label="Frequently Asked Question"
                    role="question"
                >
                    {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    {faq.title}
                </div>
            </Tooltip>
            {isExpanded &&
                <div
                    style={styles.answer}
                    data-testid={`faqAnswer${faq.id}`}
                    aria-label="Answer to FAQ"
                    aria-live="polite"
                    role="answer"
                >
                    <div style={styles.answerContent}>
                        {faq.body}
                    </div>
                </div>
            }
        </div>
    );
}

export default FAQItem;
