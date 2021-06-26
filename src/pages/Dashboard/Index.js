import { withRouter } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
  return (
    <Wrapper>
      <Typography variant="h3">Dashboard</Typography>
    </Wrapper>
  );
};

export default withRouter(Dashboard);
