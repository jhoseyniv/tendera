import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class VariableValidator {

  validateVariables(
    schema: any,
    variables: Record<string, any>,
  ): void {

    if (!schema) return;

    const fields =
      Array.isArray(schema)
        ? schema
        : Object.entries(schema).map(
            ([name, config]: any) => ({ name, ...config }),
          );

    for (const field of fields) {

      const value = variables?.[field.name];
      const required = field.required === true;

      if (required && (value === undefined || value === null || value === '')) {
        throw new BadRequestException(`Variable '${field.name}' is required`);
      }

      if (value === undefined || value === null) continue;

      switch (field.type) {
        case 'string':
          if (typeof value !== 'string') throw new BadRequestException(`Variable '${field.name}' must be string`);
          break;
        case 'number':
          if (typeof value !== 'number') throw new BadRequestException(`Variable '${field.name}' must be number`);
          break;
        case 'boolean':
          if (typeof value !== 'boolean') throw new BadRequestException(`Variable '${field.name}' must be boolean`);
          break;
        case 'array':
          if (!Array.isArray(value)) throw new BadRequestException(`Variable '${field.name}' must be array`);
          break;
        case 'object':
          if (typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException(`Variable '${field.name}' must be object`);
          break;
      }

      if (field.enum && Array.isArray(field.enum) && !field.enum.includes(value)) {
        throw new BadRequestException(`Variable '${field.name}' must be one of: ${field.enum.join(', ')}`);
      }

      if (field.minLength && typeof value === 'string' && value.length < field.minLength) {
        throw new BadRequestException(`Variable '${field.name}' must be at least ${field.minLength} characters`);
      }

      if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
        throw new BadRequestException(`Variable '${field.name}' must be at most ${field.maxLength} characters`);
      }
    }
  }
}