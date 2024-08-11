import { useEffect, useState } from "react";
import { faClock, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function DateTime() {
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;

  const now = new Date();
  const remainedTime = "10:00:00";
  const [hours, minutes, seconds] = remainedTime.split(":").map(Number);

  const today10AM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );
  let next10AM;
  if (now > today10AM) {
    next10AM = new Date(today10AM);
    next10AM.setDate(today10AM.getDate() + 1);
  } else {
    next10AM = today10AM;
  }
  const timeRemaining = Number(next10AM) - Number(now);
  const secondsRemaining =
    (Math.floor(timeRemaining / 1000) % 3600) % 60 >= 10
      ? (Math.floor(timeRemaining / 1000) % 3600) % 60
      : "0" + ((Math.floor(timeRemaining / 1000) % 3600) % 60);
  const minutesRemaining =
    Math.floor(timeRemaining / (1000 * 60)) % 60 >= 10
      ? Math.floor(timeRemaining / (1000 * 60)) % 60
      : "0" + (Math.floor(timeRemaining / (1000 * 60)) % 60);
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <>
      <DateTimeDiv>
        <SpanFormat>
          <FontAwesomeIcon icon={faCalendarDays} />{" "}
          {date.getDate() + "/" + month + "/" + date.getFullYear()}
        </SpanFormat>
        <br />
        <SpanFormat>
          <FontAwesomeIcon icon={faClock} />{" "}
          {date.toTimeString().substring(0, 8)}
        </SpanFormat>
      </DateTimeDiv>
      <DailyNotificationDiv>
        You have daily meeting at 10!
        <br />
        Time left: {hoursRemaining}:{minutesRemaining}:{secondsRemaining}
      </DailyNotificationDiv>
    </>
  );
}

export default DateTime;

const DateTimeDiv = styled.div`
  margin-left: 3vw;
`;
const SpanFormat = styled.span`
  font-size: large;
`;
const DailyNotificationDiv = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0.5vh;
  right: 50vw;
  font-size: larger;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 3px 5px #504e4e;
  &:hover {
    border: 2px solid #49ab81;
  }
`;
