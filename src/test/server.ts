import { setupServer } from 'msw/node'
import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  rest,
} from 'msw'

interface IHandlerConfig<T extends DefaultBodyType> {
  method?: 'get' | 'post' | 'put' | 'delete'
  path: string
  res: (
    req:
      | RestRequest<never, PathParams<string>>
      | RestRequest<DefaultBodyType, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext,
  ) => T
}
export function createServer<T extends DefaultBodyType>(
  handlerConfig: IHandlerConfig<T>[],
) {
  const handlers = handlerConfig.map(config => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)))
    })
  })
  const server = setupServer(...handlers)

  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
}
