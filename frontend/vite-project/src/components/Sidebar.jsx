import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">WB</div>

      <div className="nav">
        <span>🏠</span>
        <span>📊</span>
        <span>📁</span>
      </div>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        ⏻
      </button>
    </div>
  );
}