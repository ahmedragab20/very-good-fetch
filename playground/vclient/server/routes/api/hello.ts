export default defineEventHandler(() => {
  return createError({
    status: 500,
    message: "Hello from vclient!",
  })
})