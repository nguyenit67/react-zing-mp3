export default function NoContentBox({ message }) {
  return (
    <div className="no-content-box">
      <i className="ic-bg-music" />
      <span className="no-content-text">{message}</span>
    </div>
  );
}
