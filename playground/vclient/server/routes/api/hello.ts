export default defineEventHandler(() => {
  return createError({
    statusCode: 500,
    statusMessage: "Internal Server Error",
    message: "😢 I'm sad"
  })
})