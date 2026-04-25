import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import IssueCard from "../components/IssueCard";
import { getDashboard } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const res = await getDashboard(token, { page, limit: 5 });

      console.log("API:", res);

      if (res.success && res.data) {
        setIssues(res.data);
      } else {
        setIssues([]);
      }
    } catch (err) {
      console.log("ERROR:", err);
      setIssues([]);
    }
  };

  const total = issues?.length || 0;
  const pending = issues?.filter((i) => i.status === "pending").length || 0;
  const resolved = issues?.filter((i) => i.status === "resolved").length || 0;

  if (!token) {
    return <h2>Please login first</h2>;
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h2>Dashboard</h2>

        <div className="stats">
          <StatsCard title="Total Issues" value={total} />
          <StatsCard title="Pending" value={pending} />
          <StatsCard title="Resolved" value={resolved} />
        </div>

        <div className="issues">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
