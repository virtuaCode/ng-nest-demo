import { Test } from '@nestjs/testing';
import { AngularController } from './angular.controller';
import { expect } from 'chai';
import { TestingModule } from "@nestjs/testing/testing-module";

describe('AngularController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        AngularController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: AngularController;
  beforeEach(() => {
    controller = module.get(AngularController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
