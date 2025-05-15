import posthog from 'posthog-js'

export const initPosthog = () => {
posthog.init('phc_LbM4MCO7Zcipe7eWA4FFxtwuSPF6Tmo3GSAKybK5AWe', {
  api_host: 'https://us.i.posthog.com',
})
}