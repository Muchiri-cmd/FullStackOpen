const Notify = ({ message, error }: { message: string; error: string }) => (
  <>
    {message && <p style={{ color: 'green' }}>{message}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </>
);

export default Notify;