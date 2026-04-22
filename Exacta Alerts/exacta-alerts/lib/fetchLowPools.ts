import { fetchAWS } from './fetchAWS'

export interface PoolRow {
  site: string
  manufacturerid: string
  mathname: string
  denomination: string
  poolbalance: string
  poolpercentage: string
  last_updated?: string
  first_seen?: string
  is_new_today?: boolean
}

export interface AcknowledgedPool {
  site: string
  mathname: string
  denomination: string
  acknowledged_at?: string
  acknowledged_by?: string
}

export interface LowPoolsData {
  criticals: PoolRow[]
  warnings: PoolRow[]
  new_entries: PoolRow[]
  all_pools: PoolRow[]
  critical_count: number
  warning_count: number
  new_entry_count: number
  total_pool_count: number
  acknowledged: AcknowledgedPool[]
}

export async function fetchLowPools(): Promise<LowPoolsData> {
  const [poolsData, acknowledgedRes] = await Promise.all([
    fetchAWS('/low-pools'), // cached as normal
    fetch(
      `${process.env.AWS_API_GATEWAY_BASE_URL}/low-pools/acknowledged`,
      {
        headers: { 'x-api-key': process.env.AWS_API_KEY! },
        cache: 'no-store', // always fresh — acknowledged state must never be stale
      }
    ),
  ])

  if (!acknowledgedRes.ok) {
    throw new Error(`Failed to fetch acknowledged pools: ${acknowledgedRes.status}`)
  }

  const body = typeof poolsData.body === 'string' ? JSON.parse(poolsData.body) : poolsData
  const acknowledgedData = await acknowledgedRes.json()
  const acknowledgedBody = typeof acknowledgedData.body === 'string'
    ? JSON.parse(acknowledgedData.body)
    : acknowledgedData

  return {
    ...body,
    acknowledged: acknowledgedBody.acknowledged ?? [],
  }
}