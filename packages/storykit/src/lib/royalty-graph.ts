import { Address } from "viem"
import { API_BASE_URL, STORYKIT_SUPPORTED_CHAIN } from "./constants"

const mockBearerToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjAyMmZhMzE4LTU4OGItNGVjMi05ZjEzLWNlMDA1OTU0ZmMxMiJ9.eyJraWQiOiIwMjJmYTMxOC01ODhiLTRlYzItOWYxMy1jZTAwNTk1NGZjMTIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJhcHAuZHluYW1pY2F1dGguY29tLzE3YTJlMjk2LTI3NzYtNGQwZi1iYzhkLWRhYWY1ZDRlMGZkZSIsInN1YiI6ImYzNDkwYTNjLTc4M2MtNGQ4ZS1hZDY3LTMzZDU0ZjI5ZGQzNiIsInNpZCI6ImZkNGJjOTk1LWUwMTgtNDU5ZS05OWY2LWRmZGIxYTgxYjllOSIsImVtYWlsIjoicmV4QHN0b3J5cHJvdG9jb2wueHl6IiwiZW52aXJvbm1lbnRfaWQiOiIxN2EyZTI5Ni0yNzc2LTRkMGYtYmM4ZC1kYWFmNWQ0ZTBmZGUiLCJsaXN0cyI6W10sIm1pc3NpbmdfZmllbGRzIjpbXSwidmVyaWZpZWRfY3JlZGVudGlhbHMiOlt7ImFkZHJlc3MiOiIweDUyMjc5NzVDZTVlNDg2MEE2QjZjODA1YkQ3NjNCMjM0OEMwQ0IyRGQiLCJjaGFpbiI6ImVpcDE1NSIsImlkIjoiNDc4MDExOWQtNWJmMC00ODRhLWE5MTItMGVkMTliZTJmZjc3IiwibmFtZV9zZXJ2aWNlIjp7fSwicHVibGljX2lkZW50aWZpZXIiOiIweDUyMjc5NzVDZTVlNDg2MEE2QjZjODA1YkQ3NjNCMjM0OEMwQ0IyRGQiLCJ3YWxsZXRfbmFtZSI6Im1ldGFtYXNrIiwid2FsbGV0X3Byb3ZpZGVyIjoiYnJvd3NlckV4dGVuc2lvbiIsImZvcm1hdCI6ImJsb2NrY2hhaW4iLCJsYXN0U2VsZWN0ZWRBdCI6IjIwMjQtMDktMDRUMDA6MzY6MTUuMDc5WiJ9LHsiZW1haWwiOiJyZXhAc3Rvcnlwcm90b2NvbC54eXoiLCJpZCI6ImMzY2VhMGNhLTFiNjgtNDllNy04YmZkLTljMTZmZGQ3ZDdmOSIsInB1YmxpY19pZGVudGlmaWVyIjoicmV4QHN0b3J5cHJvdG9jb2wueHl6IiwiZm9ybWF0IjoiZW1haWwifV0sImxhc3RfdmVyaWZpZWRfY3JlZGVudGlhbF9pZCI6IjQ3ODAxMTlkLTViZjAtNDg0YS1hOTEyLTBlZDE5YmUyZmY3NyIsImZpcnN0X3Zpc2l0IjoiMjAyNC0wOC0xNlQyMTowNzoyMy4zNjRaIiwibGFzdF92aXNpdCI6IjIwMjQtMDktMDRUMDA6MzY6MTUuMDY5WiIsIm5ld191c2VyIjpmYWxzZSwibWV0YWRhdGEiOnt9LCJpYXQiOjE3MjU0MTAxNzUsImV4cCI6MTcyODAwMjE3NX0.iFVc_TdsOVDhFt4kzkDFpymwiTaXRk-4Pit63WuZbMFh7wlAyub1AlzZKId36S7bAiJvXTFgfclUetet-x02yzInQyzQlTdMup_gG1TGXviyt5OeOIeF10YlBHxv_7FBIbpKrHvuY_HdUpJW7Y_n8kUgsbj9xA-1D15s6XRUUx4xmPoJnX5SSu3lgZ8yB9tcWNUpbTYAuLwrKin97ZSeZkEQTT2nnOs9mZwqZG4PnV-vH1-y2GFQ9Ii-cspOkCcu5tv8T7nM0k6mw8yiWb1X5ZHa1OZ3h7poboNQVyRUqp-09pEcffvlv_bjL0_3JrtnSoKO5txQq5mn2oHoIbzmo1Z5E33qa0qtQgPYiO6AfWqMqWVX6FkTw0V7nC7DrrOGhe95oo5QxzruIawrz0rz6xRHTfhtMbpUDFJGGD2kbceAF8mvsszzPT74WUOdHGTOXAlOAeyW6M8-SYc5ozdextyb7TcerSQmrpAk2pyEIFhbZArWKzh_HqUY7MetWte7tUQKHRSmjDD6n9chFLiX2QUpXRxHgiQ5xtkXgWcLZy2CTH6PTKunK6BUUlCgVeG1LQqqKIOCGPWMNo7ryOVlyud-Mp8rA0vFp7mOFon4ygZFY_mqK_fWLRQUZ3L-cX4zlKyqGw6icaf5AjiA6Sh40DprAwCOigjSNEuKXfk3KXU`

const API_URL =
  process.env.STORYBOOK_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || API_BASE_URL

const API_KEY =
  process.env.STORYBOOK_STORY_PROTOCOL_X_API_KEY ||
  process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY ||
  process.env.STORY_PROTOCOL_X_API_KEY ||
  ""

export type RoyaltyGraphQueryOptions = {
  chain?: STORYKIT_SUPPORTED_CHAIN
}

export async function getRoyaltiesByIPs(ipIds: Address[], options?: RoyaltyGraphQueryOptions) {
  console.log("ipIds", ipIds)
  try {
    const res = await fetch(`${API_URL}/story-graph/graph/v1/ipas/royalties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockBearerToken}`,
      },
      body: JSON.stringify({
        ipIds,
      }),
    })
    if (res.ok) {
      return res.json()
    }
  } catch (error) {
    console.error(error)
  }
}
