import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { initSwagger } from './app.swagger'
import { JWT_SECRET, SERVER_PORT } from './config/constants'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')
  const config = app.get(ConfigService)
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000

  const secret = config.get<string>(JWT_SECRET)
  logger.log(secret)

  initSwagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(port)
  logger.log(`El servidor se está ejecutando en ${await app.getUrl()}`)
}
bootstrap()
