import { ThemeContext } from "../Context/ThemeContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomToggleButton from "./CustomToggleButton";
import Typography from "@mui/material/Typography";

const QAndAWidget = (props) => {
  const ourTheme = React.useContext(ThemeContext);
  const [widgetColor, setWidgetColor] = React.useState(
    ourTheme.ourTheme.loading
  );
  const [solutionMessage, setSolutionMessage] = React.useState("Loading...");
  const [lock, setLock] = React.useState(Boolean(false));

  const [userSolutions, setUserSolutions] = React.useState(
    props.questionsAndAnswers.solutions.map((option) => {
      if (option === "option1") {
        return "option2";
      } else {
        return "option1";
      }
    })
  );

  React.useEffect(() => {
    const correctSolutions = props.questionsAndAnswers.solutions.filter(
      (option, idx) => option === userSolutions[idx]
    ).length;

    if (correctSolutions === props.questionsAndAnswers.solutions.length) {
      setWidgetColor(ourTheme.ourTheme.green);
      setSolutionMessage("The answer is correct!");
      setLock(Boolean(true));
    } else if (
      correctSolutions >=
      props.questionsAndAnswers.solutions.length * 0.5
    ) {
      setWidgetColor(ourTheme.ourTheme.amber);
      setSolutionMessage("The answer is incorrect!");
    } else {
      setWidgetColor(ourTheme.ourTheme.red);
      setSolutionMessage("The answer is incorrect!");
    }
  }, [userSolutions]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: `${widgetColor.main}`,
      }}
    >
      <Box
        sx={{
          paddingBottom: "20px",
          flexGrow: 1,
          flexDirection: "column",
          display: { xs: "flex", md: "flex" },
        }}
      >
        <Typography
          paddingTop="20px"
          align="center"
          sx={{
            fontFamily: "Mulish",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            color: "#FFFFFF",
            textTransform: "none",
          }}
        >
          {props.questionsAndAnswers.question}
        </Typography>

        {props.questionsAndAnswers.answers.map((options, idx) => (
          <CustomToggleButton
            key={idx}
            options={options}
            idx={idx}
            userSolutions={userSolutions}
            setUserSolutions={setUserSolutions}
            widgetColor={widgetColor}
            lock={lock}
          />
        ))}
        <Typography
          paddingTop="20px"
          align="center"
          sx={{
            fontFamily: "Mulish",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            color: "#FFFFFF",
            textTransform: "none",
          }}
        >
          {solutionMessage}
        </Typography>
      </Box>
    </Container>
  );
};

export default QAndAWidget;
