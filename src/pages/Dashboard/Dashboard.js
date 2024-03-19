import { Card, Col, Row } from "reactstrap";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("inside dashboard", user);
  return (
    <Row>
      <Col>
        <Card className="container-sm border border-white mt-3">
          <p>Hello..! {user.username}</p>
          <p>refresh again...</p>
        </Card>
      </Col>
    </Row>
  );
};
export default Dashboard;
