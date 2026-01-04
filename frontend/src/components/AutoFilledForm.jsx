export default function AutoFilledForm({ data }) {
  return (
    <div className="card fade-in">
      <h3>Auto-filled Form (Editable)</h3>

      <label>Name</label>
      <input defaultValue={data.name || ""} />

      <label>Date of Birth</label>
      <input defaultValue={data.dob || ""} />

      <label>PAN / Aadhaar</label>
      <input defaultValue={data.id || ""} />

      <button className="btn btn-primary">Submit Application</button>
    </div>
  );
}
