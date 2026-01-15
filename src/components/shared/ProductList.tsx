import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useMemo } from 'react'

interface Product {
  asin: string
  name?: string
  product_name?: string
  review_count?: number
  reviews?: number
  avg_rating?: number
  rating?: number
}

interface ProductListProps {
  title: string
  description?: string
  data: Product[] | null
  loading?: boolean
  error?: string | null
  limit?: number
}

export function ProductList({
  title,
  description,
  data,
  loading = false,
  error = null,
  limit = 10
}: ProductListProps) {
  const products = useMemo(
    () => (data ? data.slice(0, limit) : []),
    [data, limit]
  )

  if (loading) {
    return (
      <Card className='p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50'>
        <div className='mb-4'>
          <h3 className='text-lg sm:text-xl font-bold'>{title}</h3>
          {description && (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          )}
        </div>
        <Skeleton className='h-64 w-full' />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className='p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50'>
        <div className='mb-4'>
          <h3 className='text-lg sm:text-xl font-bold'>{title}</h3>
          {description && (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          )}
        </div>
        <div className='text-sm text-red-500 py-8 text-center'>
          Error: {error}
        </div>
      </Card>
    )
  }

  if (!products || products.length === 0) {
    return (
      <Card className='p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50'>
        <div className='mb-4'>
          <h3 className='text-lg sm:text-xl font-bold'>{title}</h3>
          {description && (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          )}
        </div>
        <div className='text-sm text-muted-foreground py-8 text-center'>
          No hay datos disponibles
        </div>
      </Card>
    )
  }

  return (
    <Card className='p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50'>
      <div className='mb-4'>
        <h3 className='text-lg sm:text-xl font-bold'>{title}</h3>
        {description && (
          <p className='text-sm text-muted-foreground mt-1'>{description}</p>
        )}
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='border-b border-border'>
            <tr>
              <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                ASIN
              </th>
              <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                Producto
              </th>
              <th className='text-right py-3 px-2 font-medium text-muted-foreground'>
                Reseñas
              </th>
              <th className='text-right py-3 px-2 font-medium text-muted-foreground'>
                Rating
              </th>
              <th className='text-right py-3 px-2 font-medium text-muted-foreground'>
                Link producto
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              // Priorizar product_name del backend, luego name, y finalmente ASIN
              const productName =
                product.product_name || product.name || product.asin

              return (
                <tr
                  key={product.asin}
                  className='border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors'
                >
                  <td className='py-3 px-2 font-mono text-xs text-muted-foreground'>
                    {product.asin}
                  </td>
                  <td className='py-3 px-2 font-medium'>
                    <span className='line-clamp-2'>{productName}</span>
                  </td>
                  <td className='py-3 px-2 text-right'>
                    {product.review_count ?? product.reviews ?? '—'}
                  </td>
                  <td className='py-3 px-2 text-right font-medium'>
                    {product.avg_rating
                      ? Number(product.avg_rating).toFixed(1)
                      : product.rating
                      ? Number(product.rating).toFixed(1)
                      : '—'}
                  </td>
                  <td className='py-3 px-2 text-right'>
                    <a
                      href={`https://www.amazon.com/dp/${product.asin}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block p-2 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors'
                    >
                      <SquareArrowOutUpRight className='size-4.5' />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
