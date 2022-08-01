export const createAlertObj = (
  title: string | undefined,
  msg: string,
  type: string
) => ({
  alertTitle: title,
  alertMessage: msg,
  alertType: type,
})
