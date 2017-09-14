import {Test} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {expect} from 'chai';
import { TestingModule } from "@nestjs/testing/testing-module";

describe('AuthService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        AuthService
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: AuthService;
  beforeEach(() => {
    service = module.get(AuthService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
