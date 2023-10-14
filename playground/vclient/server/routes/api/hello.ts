export default defineEventHandler(() => {
  return createError({
    statusCode: 500,
    message: 'Internal Server Error'
  })
})