export function NumericStat({
  label,
  value
}: {
  label: string
  value: number | string | null | undefined
}) {
  const display =
    typeof value === 'number' ? value.toLocaleString(undefined) : value ?? '—'
  return (
    <div className='flex flex-col gap-1 rounded-lg border border-border/70 bg-card px-2 sm:px-3 py-2'>
      <span className='text-xs text-muted-foreground truncate'>{label}</span>
      <span className='text-base sm:text-lg font-semibold truncate'>
        {display}
      </span>
    </div>
  )
}
