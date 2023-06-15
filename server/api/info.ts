const startAt = Date.now()
let count = 0

export default defineEventHandler(() => ({
  visitCount: count++,
  startAt,
}))
