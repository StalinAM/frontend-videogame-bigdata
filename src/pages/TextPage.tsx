import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { StatCard } from '@/components/shared/StatCard'
import { BarChart, LineChart } from '@/components/ui/chart'
import { FileText, MessageSquare, ThumbsUp, Hash } from 'lucide-react'

const sliceData = <T,>(data: T[], max = 15) => data.slice(0, max)

export default function TextPage() {
  const {
    textLengthVsRating,
    fetchTextLengthVsRating,
    textPositiveWords,
    fetchTextPositiveWords,
    textNegativeWords,
    fetchTextNegativeWords,
    textHelpfulVotes,
    fetchTextHelpfulVotes
  } = useApiStore()

  useEffect(() => {
    fetchTextLengthVsRating()
    fetchTextPositiveWords()
    fetchTextNegativeWords()
    fetchTextHelpfulVotes()
  }, [
    fetchTextLengthVsRating,
    fetchTextPositiveWords,
    fetchTextNegativeWords,
    fetchTextHelpfulVotes
  ])

  const lengthVsRatingData = Array.isArray(textLengthVsRating.data)
    ? textLengthVsRating.data.map((d: any) => ({
        length: d.text_length_bin ?? d.bucket ?? '',
        rating: d.avg_rating ?? d.rating ?? 0,
        avg_length: d.avg_length ?? d.length ?? 0
      }))
    : []

  const positiveWordsData = Array.isArray(textPositiveWords.data)
    ? sliceData(
        textPositiveWords.data.map((d: any) => ({
          word: d.word ?? d.token ?? '',
          count: d.frequency ?? d.count ?? 0
        })),
        15
      )
    : []

  const negativeWordsData = Array.isArray(textNegativeWords.data)
    ? sliceData(
        textNegativeWords.data.map((d: any) => ({
          word: d.word ?? d.token ?? '',
          count: d.frequency ?? d.count ?? 0
        })),
        15
      )
    : []

  const helpfulVotesData = Array.isArray(textHelpfulVotes.data)
    ? sliceData(
        textHelpfulVotes.data.map((d: any) => ({
          review: d.asin ?? d.review_id ?? 'N/D',
          votes: d.vote_count ?? d.count ?? 0
        })),
        15
      )
    : []

  // Estadísticas
  const totalPositiveWords = positiveWordsData.length
  const totalNegativeWords = negativeWordsData.length
  const topWord = positiveWordsData[0] || { word: '—', count: 0 }
  const totalHelpfulReviews = helpfulVotesData.length

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
          Análisis de Texto
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Análisis de contenido, longitud, palabras frecuentes y votos útiles
        </p>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        <StatCard
          title='Palabras Positivas'
          value={totalPositiveWords}
          subtitle='Términos frecuentes'
          icon={MessageSquare}
          iconColor='text-green-500'
        />
        <StatCard
          title='Palabras Negativas'
          value={totalNegativeWords}
          subtitle='Términos frecuentes'
          icon={FileText}
          iconColor='text-red-500'
        />
        <StatCard
          title='Palabra Más Común'
          value={topWord.word}
          subtitle={`${topWord.count} menciones`}
          icon={Hash}
          iconColor='text-purple-500'
        />
        <StatCard
          title='Reseñas Útiles'
          value={totalHelpfulReviews}
          subtitle='Con votos positivos'
          icon={ThumbsUp}
          iconColor='text-cyan-500'
        />
      </div>

      <header className='space-y-2 mt-4'>
        <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>
          Análisis Textual
        </h2>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Patrones de contenido y engagement de las reseñas
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <EndpointCard
          id='textLengthVsRating'
          title='GET /text/length-vs-rating'
          description='Buckets de longitud vs rating promedio.'
          state={textLengthVsRating}
        >
          <div className='w-full overflow-x-auto'>
            <LineChart
              data={lengthVsRatingData}
              keys={['rating']}
              indexBy='length'
              colors={['var(--chart-2)']}
              height={240}
            />
          </div>
        </EndpointCard>
        <EndpointCard
          id='textHelpfulVotes'
          title='GET /text/helpful-votes'
          description='Reseñas con más votos útiles.'
          state={textHelpfulVotes}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={helpfulVotesData}
              keys={['votes']}
              indexBy='review'
              colors={['var(--chart-1)']}
              height={240}
            />
          </div>
        </EndpointCard>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <EndpointCard
          id='textPositiveWords'
          title='GET /text/positive-words'
          description='Frecuencia de palabras positivas.'
          state={textPositiveWords}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={positiveWordsData}
              keys={['count']}
              indexBy='word'
              colors={['var(--chart-4)']}
              height={240}
            />
          </div>
        </EndpointCard>
        <EndpointCard
          id='textNegativeWords'
          title='GET /text/negative-words'
          description='Frecuencia de palabras negativas.'
          state={textNegativeWords}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={negativeWordsData}
              keys={['count']}
              indexBy='word'
              colors={['var(--chart-5)']}
              height={240}
            />
          </div>
        </EndpointCard>
      </div>
    </div>
  )
}
