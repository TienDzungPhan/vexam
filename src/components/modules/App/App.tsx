import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const App: React.FC = () => {
  return (
    <div className="App">
      <Typography variant="h3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nulla
        ullam eveniet! At a quidem enim amet ipsa doloribus deleniti repellendus
        itaque, aliquam esse reprehenderit quae blanditiis? Sequi, consequatur
        ratione.
      </Typography>
      <Button variant="contained" color="primary">
        Post
      </Button>
    </div>
  );
};

export default App;
