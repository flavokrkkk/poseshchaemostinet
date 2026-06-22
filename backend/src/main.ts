import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: config.getOrThrow<string>("ALLOWED_ORIGIN"),
  });

  const configSwagger = new DocumentBuilder()
    .setTitle("посещаемости.net API")
    .setDescription("REST API образовательной платформы посещаемости.net")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("docs", app, document);

  const port = Number(config.getOrThrow<string>("APPLICATION_PORT"));
  await app.listen(port, "0.0.0.0");
}
bootstrap();
