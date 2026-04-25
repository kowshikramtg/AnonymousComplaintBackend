import "./IssueCard.css";

export default function IssueCard({ issue }) {
  const getPriorityColor = () => {
    if (issue.priority === "high") return "red";
    if (issue.priority === "medium") return "orange";
    return "green";
  };

  return (
    <div className="issue-card">
      <div className="top">
        <h3>{issue.title}</h3>
        <span
          className="priority"
          style={{
            background:
              issue.priority === "high"
                ? "#ff4d4f"
                : issue.priority === "medium"
                  ? "#f0ad4e"
                  : "#4caf50",
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "11px",
          }}
        >
          {issue.priority}
        </span>
      </div>

      <p>{issue.description}</p>

      <div className="bottom">
        <span>{issue.status}</span>
        <span>{issue.pincode}</span>
      </div>
    </div>
  );
}
