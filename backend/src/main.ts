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
    .setTitle("My API")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("docs", app, document);

  await app.listen(config.getOrThrow<number>("APPLICATION_PORT"));
}
bootstrap();
