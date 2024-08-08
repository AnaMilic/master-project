import { useEffect, useState } from "react";
import { faClock, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function DateTime() {
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <DateTimeDiv>
      <SpanFormat>
        <FontAwesomeIcon icon={faCalendarDays} />{" "}
        {date.getDate() + "/" + month + "/" + date.getFullYear()}
      </SpanFormat>
      <br />
      <SpanFormat>
        <FontAwesomeIcon icon={faClock} /> {date.toTimeString().substring(0, 8)}
      </SpanFormat>
    </DateTimeDiv>
  );
}

export default DateTime;

const DateTimeDiv = styled.div`
  margin-left: 3vw;
`;
const SpanFormat = styled.span`
  font-size: large;
`;
