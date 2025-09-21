// FILE: scripts/generate-openapi.ts
import 'reflect-metadata';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';

// YAML opcional
let toYAML: ((doc: unknown) => string) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const yaml = require('yaml') as typeof import('yaml');
  toYAML = (doc) => yaml.stringify(doc as any);
} catch {}

async function main(format: 'json' | 'yaml' = 'json') {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Microservice API')
    .setDescription('External Customers proxy')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  // Usa deepScanRoutes para asegurar que tome controllers decorados/indirectos
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    // include: [/* opcional: Módulos específicos */],
  });

  const outDir = join(process.cwd(), 'openapi');
  mkdirSync(outDir, { recursive: true });

  if (format === 'yaml') {
    if (!toYAML) throw new Error('Falta devDep "yaml". Instala: npm i -D yaml');
    writeFileSync(join(outDir, 'openapi.yaml'), toYAML!(document), 'utf-8');
    // eslint-disable-next-line no-console
    console.log('✓ openapi/openapi.yaml generado');
  } else {
    writeFileSync(join(outDir, 'openapi.json'), JSON.stringify(document, null, 2), 'utf-8');
    // eslint-disable-next-line no-console
    console.log('✓ openapi/openapi.json generado');
  }

  await app.close();
}

const format: 'json' | 'yaml' = process.argv.includes('--yaml') ? 'yaml' : 'json';
main(format).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});