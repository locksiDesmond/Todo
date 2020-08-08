export default function RequestError(name, message) {
  const error = { details: [{ context: { label: name }, message }] };
  return error;
}
