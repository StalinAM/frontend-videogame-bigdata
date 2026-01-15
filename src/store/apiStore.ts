import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EndpointState<T = unknown> {
  data: T | null
  loading: boolean
  error: string | null
}

interface ProductDetail {
  title: string
  asin: string
  image?: string
  rating?: number
  price?: string
}

interface Product {
  asin: string
  name?: string
  product_name?: string
  review_count?: number
  avg_rating?: number
  rating?: number
  url?: string
  status?: string
  [key: string]: any
}

interface ApiStore {
  info: EndpointState
  statisticsGlobal: EndpointState
  statisticsRatingDistribution: EndpointState
  statisticsVerified: EndpointState
  temporalYearly: EndpointState
  temporalMonthly: EndpointState
  temporalDayOfWeek: EndpointState
  gamesTopReviewed: EndpointState
  gamesTopRated: EndpointState
  gamesWorstRated: EndpointState
  platformsStatistics: EndpointState
  textLengthVsRating: EndpointState
  textPositiveWords: EndpointState
  textNegativeWords: EndpointState
  textHelpfulVotes: EndpointState
  usersTopReviewers: EndpointState
  outliersRatings: EndpointState
  statsLegacy: EndpointState
  productDetails: Record<string, EndpointState<ProductDetail>>
  productsTopReviewedNames: EndpointState<Product[]>
  productsTopRatedNames: EndpointState<Product[]>
  fetchInfo: () => Promise<void>
  fetchStatisticsGlobal: () => Promise<void>
  fetchStatisticsRatingDistribution: () => Promise<void>
  fetchStatisticsVerified: () => Promise<void>
  fetchTemporalYearly: () => Promise<void>
  fetchTemporalMonthly: () => Promise<void>
  fetchTemporalDayOfWeek: () => Promise<void>
  fetchGamesTopReviewed: () => Promise<void>
  fetchGamesTopRated: () => Promise<void>
  fetchGamesWorstRated: () => Promise<void>
  fetchPlatformsStatistics: () => Promise<void>
  fetchTextLengthVsRating: () => Promise<void>
  fetchTextPositiveWords: () => Promise<void>
  fetchTextNegativeWords: () => Promise<void>
  fetchTextHelpfulVotes: () => Promise<void>
  fetchUsersTopReviewers: () => Promise<void>
  fetchOutliersRatings: () => Promise<void>
  fetchStatsLegacy: () => Promise<void>
  fetchProductsTopReviewedNames: (limit?: number) => Promise<void>
  fetchProductsTopRatedNames: (limit?: number) => Promise<void>
}

const createEndpointState = (): EndpointState => ({
  data: null,
  loading: false,
  error: null
})

const API_BASE = 'http://localhost:8000'

const fetcher = async (url: string) => {
  const res = await fetch(`${API_BASE}${url}`)
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export const useApiStore = create<ApiStore>()(
  persist(
    (set) => ({
      info: createEndpointState(),
      statisticsGlobal: createEndpointState(),
      statisticsRatingDistribution: createEndpointState(),
      statisticsVerified: createEndpointState(),
      temporalYearly: createEndpointState(),
      temporalMonthly: createEndpointState(),
      temporalDayOfWeek: createEndpointState(),
      gamesTopReviewed: createEndpointState(),
      gamesTopRated: createEndpointState(),
      gamesWorstRated: createEndpointState(),
      platformsStatistics: createEndpointState(),
      textLengthVsRating: createEndpointState(),
      textPositiveWords: createEndpointState(),
      textNegativeWords: createEndpointState(),
      textHelpfulVotes: createEndpointState(),
      usersTopReviewers: createEndpointState(),
      outliersRatings: createEndpointState(),
      statsLegacy: createEndpointState(),
      productDetails: {},
      productsTopReviewedNames: createEndpointState() as EndpointState<
        Product[]
      >,
      productsTopRatedNames: createEndpointState() as EndpointState<Product[]>,

      fetchInfo: async () => {
        set((s) => ({ info: { ...s.info, loading: true, error: null } }))
        try {
          const data = await fetcher('/')
          set((s) => ({ info: { ...s.info, data, loading: false } }))
        } catch (e) {
          set((s) => ({
            info: { ...s.info, error: getErrorMessage(e), loading: false }
          }))
        }
      },
      fetchStatisticsGlobal: async () => {
        set((s) => ({
          statisticsGlobal: {
            ...s.statisticsGlobal,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/statistics/global')
          set((s) => ({
            statisticsGlobal: { ...s.statisticsGlobal, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            statisticsGlobal: {
              ...s.statisticsGlobal,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchStatisticsRatingDistribution: async () => {
        set((s) => ({
          statisticsRatingDistribution: {
            ...s.statisticsRatingDistribution,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/statistics/rating-distribution')
          set((s) => ({
            statisticsRatingDistribution: {
              ...s.statisticsRatingDistribution,
              data,
              loading: false
            }
          }))
        } catch (e) {
          set((s) => ({
            statisticsRatingDistribution: {
              ...s.statisticsRatingDistribution,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchStatisticsVerified: async () => {
        set((s) => ({
          statisticsVerified: {
            ...s.statisticsVerified,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/statistics/verified')
          set((s) => ({
            statisticsVerified: {
              ...s.statisticsVerified,
              data,
              loading: false
            }
          }))
        } catch (e) {
          set((s) => ({
            statisticsVerified: {
              ...s.statisticsVerified,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTemporalYearly: async () => {
        set((s) => ({
          temporalYearly: { ...s.temporalYearly, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/temporal/yearly')
          set((s) => ({
            temporalYearly: { ...s.temporalYearly, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            temporalYearly: {
              ...s.temporalYearly,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTemporalMonthly: async () => {
        set((s) => ({
          temporalMonthly: { ...s.temporalMonthly, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/temporal/monthly')
          set((s) => ({
            temporalMonthly: { ...s.temporalMonthly, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            temporalMonthly: {
              ...s.temporalMonthly,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTemporalDayOfWeek: async () => {
        set((s) => ({
          temporalDayOfWeek: {
            ...s.temporalDayOfWeek,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/temporal/day-of-week')
          set((s) => ({
            temporalDayOfWeek: { ...s.temporalDayOfWeek, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            temporalDayOfWeek: {
              ...s.temporalDayOfWeek,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchGamesTopReviewed: async () => {
        set((s) => ({
          gamesTopReviewed: {
            ...s.gamesTopReviewed,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/games/top-reviewed')
          set((s) => ({
            gamesTopReviewed: { ...s.gamesTopReviewed, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            gamesTopReviewed: {
              ...s.gamesTopReviewed,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchGamesTopRated: async () => {
        set((s) => ({
          gamesTopRated: { ...s.gamesTopRated, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/games/top-rated')
          set((s) => ({
            gamesTopRated: { ...s.gamesTopRated, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            gamesTopRated: {
              ...s.gamesTopRated,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchGamesWorstRated: async () => {
        set((s) => ({
          gamesWorstRated: { ...s.gamesWorstRated, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/games/worst-rated')
          set((s) => ({
            gamesWorstRated: { ...s.gamesWorstRated, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            gamesWorstRated: {
              ...s.gamesWorstRated,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchPlatformsStatistics: async () => {
        set((s) => ({
          platformsStatistics: {
            ...s.platformsStatistics,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/platforms/statistics')
          set((s) => ({
            platformsStatistics: {
              ...s.platformsStatistics,
              data,
              loading: false
            }
          }))
        } catch (e) {
          set((s) => ({
            platformsStatistics: {
              ...s.platformsStatistics,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTextLengthVsRating: async () => {
        set((s) => ({
          textLengthVsRating: {
            ...s.textLengthVsRating,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/text/length-vs-rating')
          set((s) => ({
            textLengthVsRating: {
              ...s.textLengthVsRating,
              data,
              loading: false
            }
          }))
        } catch (e) {
          set((s) => ({
            textLengthVsRating: {
              ...s.textLengthVsRating,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTextPositiveWords: async () => {
        set((s) => ({
          textPositiveWords: {
            ...s.textPositiveWords,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/text/positive-words')
          set((s) => ({
            textPositiveWords: { ...s.textPositiveWords, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            textPositiveWords: {
              ...s.textPositiveWords,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTextNegativeWords: async () => {
        set((s) => ({
          textNegativeWords: {
            ...s.textNegativeWords,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/text/negative-words')
          set((s) => ({
            textNegativeWords: { ...s.textNegativeWords, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            textNegativeWords: {
              ...s.textNegativeWords,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchTextHelpfulVotes: async () => {
        set((s) => ({
          textHelpfulVotes: {
            ...s.textHelpfulVotes,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/text/helpful-votes')
          set((s) => ({
            textHelpfulVotes: { ...s.textHelpfulVotes, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            textHelpfulVotes: {
              ...s.textHelpfulVotes,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchUsersTopReviewers: async () => {
        set((s) => ({
          usersTopReviewers: {
            ...s.usersTopReviewers,
            loading: true,
            error: null
          }
        }))
        try {
          const data = await fetcher('/users/top-reviewers')
          set((s) => ({
            usersTopReviewers: { ...s.usersTopReviewers, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            usersTopReviewers: {
              ...s.usersTopReviewers,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchOutliersRatings: async () => {
        set((s) => ({
          outliersRatings: { ...s.outliersRatings, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/outliers/ratings')
          set((s) => ({
            outliersRatings: { ...s.outliersRatings, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            outliersRatings: {
              ...s.outliersRatings,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },
      fetchStatsLegacy: async () => {
        set((s) => ({
          statsLegacy: { ...s.statsLegacy, loading: true, error: null }
        }))
        try {
          const data = await fetcher('/stats')
          set((s) => ({
            statsLegacy: { ...s.statsLegacy, data, loading: false }
          }))
        } catch (e) {
          set((s) => ({
            statsLegacy: {
              ...s.statsLegacy,
              error: getErrorMessage(e),
              loading: false
            }
          }))
        }
      },

      fetchProductsTopReviewedNames: async (limit = 5) => {
        set({
          productsTopReviewedNames: { data: null, loading: true, error: null }
        })
        try {
          const res = await fetch(
            `${API_BASE}/products/top-reviewed-names?limit=${limit}`
          )
          if (!res.ok) throw new Error(`Error ${res.status}`)
          const response = await res.json()
          // Extraer el array de productos de la respuesta
          const data = response.products || []
          set({
            productsTopReviewedNames: { data, loading: false, error: null }
          })
        } catch (e) {
          set({
            productsTopReviewedNames: {
              data: null,
              loading: false,
              error: getErrorMessage(e)
            }
          })
        }
      },
      fetchProductsTopRatedNames: async (limit = 5) => {
        set({
          productsTopRatedNames: { data: null, loading: true, error: null }
        })
        try {
          const res = await fetch(
            `${API_BASE}/products/top-rated-names?limit=${limit}`
          )
          if (!res.ok) throw new Error(`Error ${res.status}`)
          const response = await res.json()
          // Extraer el array de productos de la respuesta
          const data = response.products || []
          set({
            productsTopRatedNames: { data, loading: false, error: null }
          })
        } catch (e) {
          set({
            productsTopRatedNames: {
              data: null,
              loading: false,
              error: getErrorMessage(e)
            }
          })
        }
      }
    }),
    {
      name: 'api-product-details-storage',
      partialize: (state) => ({
        productDetails: state.productDetails
      })
    }
  )
)
