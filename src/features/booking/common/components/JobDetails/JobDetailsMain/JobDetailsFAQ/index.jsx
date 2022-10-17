import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

import "./globalStyles.scss";

const list = [
  {
    title: "Do you provide all services including keyword research?",
    content:
      "Yes, I will provide you with all work according to your demand. Just let me know your requirements.",
  },
  {
    title: "Do you write on any topic?",
    content: "Yes, for sure I can write on any topic.",
  },
  {
    title: "Are you sure that your content will be plagiarism free?",
    content:
      "Yes, it's guaranteed that my content will be unique and free of errors as well.",
  },
];

function JobDetailsFAQ() {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="JobDetailsFAQ" name="jobDetailsFAQ">
      <h1>FAQ</h1>
      <div className="JobDetailsFAQMain">
        {list.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default JobDetailsFAQ;
