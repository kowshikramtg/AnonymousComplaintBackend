export default function FilterBar({ setPage }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setPage(1)}>Reset</button>
    </div>
  );
}