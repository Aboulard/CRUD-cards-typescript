import { http, HttpResponse } from 'msw'
import * as userJson from "../assets/JSONData/myUsers.json"

export const handlers = http.get(
  '/users',
  ({}) => {
    return HttpResponse.json([userJson])
  }
)

