import { useEffect, useState } from "react";
import axios from "axios";
import "./Refund.css";

function RefundReqsSM() {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/getRefunds")
      .then((response) => {
        setRefunds(response.data);
      });
  }, [refunds]);

  const handleRefund = async (refund) => {
    const b = { refundId: refund };
    axios.post("http://localhost:8080/api/orders/refundProds", b);
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <th>Refund ID </th>
            <th>Order ID</th>
            <th>Status </th>
            <th>Refund </th>
          </thead>
          <tbody>
            {refunds.map((refund) => {
              return (
                <tr key={refund._id}>
                  <td>{refund["_id"]}</td>
                  <td>{refund["order"]}</td>
                  <td>{refund.prod["status"]}</td>
                  {refund.prod.status === "pending" ? (
                    <td>
                      {" "}
                      <button
                        onClick={() => handleRefund(refund._id)}
                        className="button-refund"
                        style={{
                          backgroundColor: "#4CAF50",
                          border: "none",
                          color: "white",
                          padding: "10px 24px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          margin: "10px 0 0 10px",
                          verticalAlign: "middle",
                        }}
                      >
                        Refund
                      </button>
                    </td>
                  ) : (
                    <td className="already-refunded">Already Refunded</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default RefundReqsSM;
