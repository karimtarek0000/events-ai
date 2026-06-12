export type Plans = 'starter' | 'pro' | 'max' | 'free'
export const PLANS = {
  free: 'free',
  starter: 'starter',
  pro: 'pro',
  max: 'max',
} as const

export const PLAN_LIMITS: Record<Plans, number> = {
  free: 1,
  starter: 3,
  pro: 10,
  max: Infinity,
}
