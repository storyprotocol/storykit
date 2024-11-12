import * as Iliad from "./iliad"
import * as Odyssey from "./odyssey"

const STORY_ODYSSEY_IP_ASSETS_NAME = Odyssey.ODYSSEY_PREVIEW_IP_ASSETS.map((ip) => `Odyssey: ${ip}`)
const STORY_ODYSSEY_IP_ASSETS_MAP = Object.fromEntries(
  Odyssey.ODYSSEY_PREVIEW_IP_ASSETS.map((ip) => [`Odyssey: ${ip}`, ip])
)

const STORY_ILIAD_IP_ASSETS_NAME = Iliad.ILIAD_PREVIEW_IP_ASSETS.map((ip) => `Iliad: ${ip}`)
const STORY_ILIAD_IP_ASSETS_MAP = Object.fromEntries(Iliad.ILIAD_PREVIEW_IP_ASSETS.map((ip) => [`Iliad: ${ip}`, ip]))

const STORY_IP_ASSETS = [...STORY_ODYSSEY_IP_ASSETS_NAME, ...STORY_ILIAD_IP_ASSETS_NAME]
const STORY_IP_ASSETS_MAP = { ...STORY_ODYSSEY_IP_ASSETS_MAP, ...STORY_ILIAD_IP_ASSETS_MAP }

export * from "./iliad"
export * from "./odyssey"
export { STORY_IP_ASSETS, STORY_IP_ASSETS_MAP }
