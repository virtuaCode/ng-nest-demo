import {Test} from '@nestjs/testing';
import {expect} from 'chai';
import { TestingModule } from '@nestjs/testing/testing-module';
import { TypeOrmDatabaseService } from "./typeorm-database.service"

describe('TypeormDatabaseService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        TypeOrmDatabaseService
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: TypeOrmDatabaseService;
  beforeEach(() => {
    service = module.get(TypeOrmDatabaseService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
