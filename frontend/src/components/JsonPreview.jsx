function JsonPreview({ title, payload }) {
  return (
    <div>
      <h3>{title}</h3>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  )
}

export default JsonPreview
