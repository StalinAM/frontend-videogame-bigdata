export function ErrorMsg({ error }: { error: string }) {
  return <div className='text-sm text-destructive'>Error: {error}</div>
}
